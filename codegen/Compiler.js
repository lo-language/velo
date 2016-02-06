/**
 * The Exa-to-JS compiler
 *
 * This is a collection of stateless functions expecting to be called with a Scope as 'this'.
 *
 * How it works:
 *
 * In the compile phase, the AST is traversed and each node is compiled into either a bare JS string
 * or a JS construct which is a list of JS strings and sub-constructs produced by compiling sub-nodes.
 * Simple nodes, such as literals, compile into bare JS strings. More complex nodes compile into constructs,
 * e.g. an addition node compiles into the construct ['(', leftOperand, ' + ', rightOperand, ')']
 *
 * Note:
 * To compile an expression containing a sync request, we have to do a trick where we create a "resolver"
 * block to wrap the expression.
 */

'use strict';

var JsConstruct = require('./JsConstruct');
var SyncMessage = require('./SyncMessage');

// this is a stateless library, not a "class"
var __ = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles a module into an Exa service factory, that is a JS function that you call to *create* an Exa service.
 * This lets us bind a module registry into the module.
 *
 * @param node
 */
__['module'] = function (node) {

    return new JsConstruct([
        "'use strict';\n\nreturn ", this.compile(node.service), ';']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['nil'] = function (node) {

    return "null";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['modref'] = function (node) {

    // think of module literals as symbols on the schematic
    // when we compile, we just need to validate internally
    // when we RUN, we need to have the symbols' meanings to hand
    // compilation generates the complete and final code for a module
    // acquire used to be injected at the root, now it's ambient via this mechanism
    // what's the advantage of modrefs over acquire? static analysis & eager validation & compilation - anything else?

    // register the dependency with the current scope
    this.registerDep(node.val);

    // every module has MODS in scope which maps modrefs to service functions
    return new JsConstruct(['MODS["' + node.val + '"]']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A procedure is an expression.
 *
 * @param node
 */
__['procedure'] = function (node) {

    // push a new scope onto the scope stack
    var localScope = this.bud();

    // compile the statement(s) in the context of the local scope
    var body = localScope.compile(node.body).attach(new JsConstruct("task.pickupReplies();\n"));

    // after compilation we can get our declared vars
    var localVars = localScope.getJsVars();

    var receives = localScope.receives.map(function (name) {
        return '$' + name + ' = ' + 'task.args.shift()' + ';\n';
    }).join('') + '\n';

    // todo only include recur where it's referenced (or just remove this feature)
    // declare our local vars
    var fnBody = [
        'var $recur = task.service;\n',
        localVars.length > 0 ? 'var ' + localVars.join(', ') + ';\n\n' : '',
        receives, body];

    // implements an exa service as a JS function that takes a task
    return new JsConstruct([
        'function (task) ', {block: fnBody}], false);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['stmt_list'] = function (node) {

    // hooray for Lisp!

    //try {
        return node.tail ?
            this.compile(node.head).attach(this.compile(node.tail)) :
            this.compile(node.head);
    //}
    //catch (e) {
    //    console.error(e + " while compiling: ");
    //    console.error(node);
    //}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Statements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param node
 */
__['receive'] = function (node) {

    // todo do we always want the declaration? could use receive to clobber existing values...

    this.setReceives(node.names);

    // return an empty construct to allow attachment
    return new JsConstruct();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['response'] = function (node) {

    var _this = this;

    var args = node.args.map(function (arg) {
        return _this.compile(arg);
    });

    if (args.length > 1) {
        throw new Error("results with >1 value not yet supported, sorry");
    }

    // we assume the existence of a Task object named 'task'

    // todo throw a compiler warning if anything is attach()'d to this statement
    return JsConstruct.makeStatement(['task.respond("', node.channel, '", ', {csv: args}, ');\nreturn;']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current scope by defining a variable in it if the LHS of the assign
 * is an identifier.
 *
 * @param node
 */
__['assign'] = function (node) {

    // if the left node is a bare ID, then we compile it as an lvalue
    // otherwise all IDs are compiled as rvalues

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    // todo this implies block-level scoping
    if (node.left.type == 'id') {

        // validate we're not assigning to a constant
        if (this.isConstant(node.left.name)) {
            throw new Error("can't assign to a constant (" + node.left.name + ")");
        }

        // declare if a new var
        // can this not be idempotent?
        if (this.has(node.left.name) == false) {
            this.declare(node.left.name);
        }
    }

    return JsConstruct.makeStatement([left, ' ' + node.op + ' ', right, ';\n']);
    // this was genius
    // above comment inserted by my slightly tipsy wife regarding code later removed - SP
 };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['conditional'] = function (node) {

    // if the predicate is sync that's easy because we always want to resolve it
    // the trick is sync logic in the branches because we only want to resolve if
    // necessary

    // generate unique continuation names
    var contName;

    var predicate = this.compile(node.predicate);
    var consequent = this.compile(node.consequent);
    var negBlock = false;

    var async = consequent.async;

    if (node.otherwise) {
        negBlock = this.compile(node.otherwise);
        async = async || negBlock.async;
    }

    if (async) {

        // we need both branches
        if (negBlock == false) {
            negBlock = new JsConstruct([]);
        }

        // and need to call the continuation as the last statement in both branches

        // generate unique continuation names
        contName = "cont" + this.contNum++;

        consequent.attach(new JsConstruct(contName + "();"));
        negBlock.attach(new JsConstruct(contName + "();"));
    }

    var parts = ['if (', predicate, ') ', {block: consequent}, '\n\n'];

    if (negBlock) {
        parts.push('else ', {block: negBlock}, '\n\n');
    }

    if (async) {
        return JsConstruct.makeStatement(['var ' + contName + ' = function () {'], ['};'].concat(parts));
    }

    return JsConstruct.makeStatement(parts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loops while a condition is true.
 *
 * @param node
 */
__['iteration'] = function (node) {

    var condition = this.compile(node.condition);
    var body = this.compile(node.statements);
    var async = body.async;

    // can render as a while loop if body isn't async
    if (!async) {

        return JsConstruct.makeStatement([
            'while (', condition, ')',
                {block: body}]);
    }

    // join the body to the wrapper function via setImmediate to form the loop in a way that won't break the stack
    body.attach(new JsConstruct("setImmediate(loop);"));

    return JsConstruct.makeStatement([

        "let loop = function () {",
            "if (", condition, ") ",
                {block: body},
            "else {"], ["}};\n\n",
        "loop();\n" // enter the loop
    ]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Generates code to send messages via Task#sendMessage().
 *
 * @param node
 */
__['message'] = function (node) {

    // compile the parts

    var target = this.compile(node.address);

    var _this = this;

    var args = node.args.map(function (arg) {
        return _this.compile(arg);
    });

    var subsequent = node.subsequent ? this.compile(node.subsequent) : null;
    var contingency = node.contingency ? this.compile(node.contingency) : null;

    return JsConstruct.buildMessage(target, args, subsequent, contingency);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['handler'] = function (node) {

    // todo look at the channel

    // create a new scope for the handler
    var localScope = this.bud();
    var body = localScope.compile(node.body);

    // unpack the scope
    // after compilation we can get our declared vars
    var localVars = localScope.getJsVars();

    var receives = localScope.receives.map(function (name) {
            return '$' + name + ' = ' + 'args.shift()' + ';\n'; // differs from procedure (which is task.args.shift)
        }).join('') + '\n';

    // todo only include recur where it's referenced (or just remove this feature)
    // declare our local vars
    var fnBody = [
        localVars.length > 0 ? 'var ' + localVars.join(', ') + ';\n\n' : '',
        receives, body];

    // create a new JS function for the handler
    return new JsConstruct('function (args) ', {block: fnBody});
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['application_stmt'] = function (node) {

    // slap a semicolon on that bad boy
    return JsConstruct.makeStatement([this.compile(node.application), ';\n']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['application'] = function (node) {

    var target = this.compile(node.address);

    var _this = this;

    var args = node.args.map(function (arg) {
        return _this.compile(arg);
    });

    // return a wrapped placeholder
    return new SyncMessage(target, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['id'] = function (node) {

    // we know we're not rendering an lvalue because we're defended from that
    // in the assignment code generator

    // should we pass down in a context if we're in eval or assign mode?
    // context could also let us know we're in string interpolation
    // as well as conditionals

    if (this.isConstant(node.name)) {
        return this.resolve(node.name);
    }

    // todo if we're in an eval

    return '$' + node.name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * This just puts a mapping in the scope; it doesn't compile "to" anything.
 *
 * @param node
 * @return {String}
 */
__['constant'] = function (node) {

    this.define(node.name, this.compile(node.value));

    // return an empty construct to allow attachment
    return new JsConstruct();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['cardinality'] = function (node) {

    var right = this.compile(node.operand);

    // todo factor this out into a call to a utility function

    return new JsConstruct([
        'function (val) {' +
            "if (typeof val === 'string') return val.length;" +
            "else if (Array.isArray(val)) return val.length;" +
            "else if (typeof val === 'object') return Object.keys(val).length;" +
            "}(", right, ")"]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['complement'] = function (node) {

    return new JsConstruct(['!', this.compile(node.operand)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['subscript'] = function (node) {

    // this is guaranteed to be a statement

    var list = this.compile(node.list);
    var index = this.compile(node.index);

    // to do this properly we'd have to catch it at runtime - could probably do that with splice
    if (node.index.type == 'number' && parseInt(node.index.val) < 0) {
        index = list + '.length' + node.index.val;
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return new JsConstruct([list, '[', index, ']']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Handles both non-mutating slice of a list and mutating excision of a list.
 *
 * @param node
 */
var compileSlice = function (node) {

    var list = this.compile(node.list);
    var start; // optional, so compile only if present
    var end;   // optional, so compile only if present

    // Handles shorthand where start or end
    // is omitted as shorthand for the start or end
    // of the array
    // Also allows experimental syntax with negative indices referring to
    // positions from the end, but only for number literals.
    // To do this properly we'd have to catch it at runtime

    if (node.start === undefined) {
        start = '0';
    } else {
        start = this.compile(node.start);

        if (node.start.type == 'number' && parseInt(node.start.val) < 0) {
            start = list + '.length' + node.start.val;
        }
    }

    if (node.end === undefined) {
        end = list + '.length';
    } else {
        end = this.compile(node.end);

        if (node.end.type == 'number' && parseInt(node.end.val) < 0) {
            end = list + '.length' + node.end.val;
        }
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?
    if (node.type == 'excision') {
      return new JsConstruct([list, '.splice(', start, ',(', end, ')-(' , start, '))']);
    }

    // slice
    return new JsConstruct([list, '.slice(', start, ',', end, ')']);
};

__['slice'] = compileSlice;
__['excision'] = compileSlice;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An extraction is a mutating expression.
 *
 * @param node
 */
__['extraction'] = function (node) {

    var list = this.compile(node.list);
    var index = this.compile(node.index);

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return new JsConstruct([list, '.splice(', index, ' < 0 ? ', index, ' + ', list, '.length : ', index, ', 1)[0];']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['select'] = function (node) {

    var set = this.compile(node.set);

    return new JsConstruct([set, '.', node.member]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['in'] = function (node) {

    // should holds apply to strings? maybe as 'contains'? or some non-word operator?

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    return new JsConstruct(['function (item, collection) {' +
            "if (Array.isArray(collection)) return collection.indexOf(item) >= 0;" +
            "else if (typeof val === 'object') return collection.hasOwnProperty(item);" +
            "}(", left, ',', right, ")"]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['sequence'] = function (node) {

    var first = this.compile(node.first);
    var last = this.compile(node.last);

    // renders an expression that is a function that takes a single arg -
    // the action to be performed

    return new JsConstruct(['function (first, last, action) {\n' +
            'for (var num = first; num <= last; num++) { action(num); }' +
        "}.bind(null,", first, ',', last, ')']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['op'] = function (node) {

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    var op = node.op;

    if (op === 'and') {
        op = '&&';
    }
    else if (op === 'or') {
        op = '||';
    }
//    else if (op == '+') {
//
//        // todo drop this in favor of combination operator ><
//        return new JsConstruct(['function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {' +
//                'return left.concat(right);} else return left + right;}(',
//                left, ',', right, ')']);
//    }

    if (op == '==') {
        op = '===';
    }

//    make sure both sides are defined
//    could relax this if we want to allow declaration after usage
//    should also factor this out into a getValue() maybe

//    if (node.left.jsVal === undefined) {
//        throw new Error("left operand not defined");
//    }
//
//    if (node.right.jsVal === undefined) {
//        throw new Error("right operand not defined");
//    }

    // use parens to be safe
    return new JsConstruct(['(', left, ' ', op, ' ', right, ')']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Literals
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val ? 'true' : 'false';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return "'" + node.val.replace(/'/g, "\\'") + "'";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Handles lists and maps.
 *
 * @param node
 */
var compileList = function (node) {

    // list literals might have members that need to be realized

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item);
    });

    if (node.type == 'map') {
        return new JsConstruct(['{', {csv: items}, '}']);
    }

    return new JsConstruct(['[', {csv: items}, ']']);
};

__['array'] = compileList;
__['map'] = compileList;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['dyad'] = function (node) {

    var key = this.compile(node.key);
    var value = this.compile(node.value);

    return [key, ':', value];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Records are just implemented as JS objects of course.
 *
 * @param node
 */
__['record'] = function (node) {

    var self = this;

    var fields = node.fields.map(function (field) {
        return self.compile(field);
    });

    // could use a block annotation here
    return new JsConstruct(['{', {csv: fields}, '}']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__['field'] = function (node) {

    var value = this.compile(node.value);

    // we don't qualify field names
    return [node.name, ':', value];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['interpolation'] = function (node) {

    return new JsConstruct(["'", node.left, "' + ",
        this.compile(node.middle), " + '", node.right, "'"]);
};

__['dynastring'] = function (node) {

    return new JsConstruct([this.compile(node.left), " + '", node.middle, "' + ",
        this.compile(node.right)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['increment'] = function (node) {
    return JsConstruct.makeStatement([ this.compile(node.operand), "++;\n"]);
};

__['decrement'] = function (node) {
    return JsConstruct.makeStatement([ this.compile(node.operand), "--;\n"]);
};

__['splice'] = function (node) {
    return JsConstruct.makeStatement([ this.compile(node.list), ".push(", this.compile(node.item), ");\n"]);
};

module.exports = __;
