/**
 * The Exa-to-JS compiler
 *
 * How it works:
 *
 * Each AST node is compiled into either a bare JS string or an array of strings, arrays, and objects.
 *
 * In the compile phase, the AST is traversed and each node is compiled into either a bare JS string
 * or a JS "construct" which is a list of JS strings and sub-constructs produced by compiling sub-nodes.
 * Simple nodes, such as literals, compile into bare JS strings. More complex nodes compile into constructs,
 * e.g. an addition node would compile into the construct ['(', leftOperand, ' + ', rightOperand, ')']
 *
 * Note:
 * To compile an expression containing a request, we have to do a trick where we create a "resolver" block to wrap the expression.
 */

'use strict';

var Scope = require('./Scope');
var JsConstruct = require('./JsConstruct');
var SyncMessage = require('./SyncMessage');

var __ = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Dispatches to the appropriate node type handler. Returns a JSConstruct.
 *
 * @param node
 * @param scope
 * @return {*}
 */
__.compile = function (node, scope) {

    if (this[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

    // dispatch to the appropriate AST node handler
    return __[node.type](node, scope || new Scope());
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['nil'] = function (node, scope) {

    return "null";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A procedure is an expression.
 *
 * @param scope
 * @param node
 */
__['procedure'] = function (node, scope) {

    // create a new Exa scope for this procedure
    // if there's no enclosing scope, we're at the root of the scope tree
    var localScope = scope ? scope.bud() : new Scope(null);

    // compile the statement(s) in the context of the local scope
    var body = __.compile(node.body, localScope)
        .attach(new JsConstruct("task.tryClose();\n"));

    // todo remove this feature
    body = ['var $recur = task.service;\n', body];

    // declare our local vars
    // todo move to block-level scoping with 'let'

    var localVars = localScope.getJsVars();

    if (localVars.length > 0) {
        body = ['var ' + localVars.join(', ') + ';\n\n', body];
    }

    // implements an exa service as a JS function that takes a task
    return new JsConstruct([
        'function (task) ', {block: body}], false);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['stmt_list'] = function (node, scope) {

    // hooray for Lisp!

    try {
        return node.tail ?
            __.compile(node.head, scope).attach(__.compile(node.tail, scope)) :
            __.compile(node.head, scope);
    }
    catch (e) {
        console.error(e + " while compiling: ");
        console.error(node);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Statements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param scope
 * @param node
 */
__['receive'] = function (node, scope) {

    // todo do we always want the declaration? could use receive to clobber existing values...

    return JsConstruct.makeStatement([node.names.map(function (name) {

        // declare if a new var
        if (scope.has(name) == false) {
            scope.declare(name);
        }

        return '$' + name + ' = ' + 'task.args.shift()';

    }).join(';\n') + ';\n\n']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['response'] = function (node, scope) {

    var args = node.args.map(function (arg) {
        return __.compile(arg, scope);
    });

    if (args.length > 1) {
        throw new Error("results with >1 value not yet supported, sorry");
    }

    // we assume the existence of a Task object named 'task'

    if (node.channel === 'fail') {
        return JsConstruct.makeStatement(['task.fail(', {csv: args}, ');\nreturn;']);
    }

    // not rendered as a statement because we can't put anything after it
    return JsConstruct.makeStatement(['task.reply(', {csv: args}, ');\nreturn;']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current scope by defining a variable in it if the LHS of the assign
 * is an identifier.
 *
 * @param scope
 * @param node
 */
__['assign'] = function (node, scope) {

    // this is guaranteed to be a statement

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

    // todo this implies block-level scoping
    if (node.left.type == 'id') {

        // validate we're not assigning to a constant
        if (scope.isConstant(node.left.name)) {
            throw new Error("can't assign to a constant (" + node.left.name + ")");
        }

        // declare if a new var
        // can this not be idempotent?
        if (scope.has(node.left.name) == false) {
            scope.declare(node.left.name);
        }
    }

    return JsConstruct.makeStatement([left, ' ' + node.op + ' ', right, ';\n']);
    // this was genius
    // above comment inserted by my slightly tipsy wife regarding code later removed - SP
 };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['conditional'] = function (node, scope) {

    // if the predicate is sync that's easy because we always want to resolve it
    // the trick is sync logic in the branches because we only want to resolve if
    // necessary

    var predicate = __.compile(node.predicate, scope);
    var consequent = __.compile(node.consequent, scope);
    var negBlock = false;

    var async = consequent.async;

    if (node.otherwise) {
        negBlock = __.compile(node.otherwise, scope);
        async = async || negBlock.async;
    }

    if (async) {

        // we need both branches
        if (negBlock == false) {
            negBlock = new JsConstruct([]);
        }

        // and need to call the continuation as the last statement in both branches
        consequent.attach(new JsConstruct("cont();"));
        negBlock.attach(new JsConstruct("cont();"));
    }

    var parts = ['if (', predicate, ') ', {block: consequent}, '\n\n'];

    if (negBlock) {
        parts.push('else ', {block: negBlock}, '\n\n');
    }

    if (async) {
        return JsConstruct.makeStatement(['var cont = function () {'], ['};'].concat(parts));
    }

    return JsConstruct.makeStatement(parts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loops while a condition is true.
 *
 * @param scope
 * @param node
 */
__['iteration'] = function (node, scope) {

    var condition = __.compile(node.condition, scope);
    var body = __.compile(node.statements, scope);
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
 * @param scope
 * @param node
 */
__['message'] = function (node, scope) {

    // compile the parts

    var target = __.compile(node.address, scope);

    var args = node.args.map(function (arg) {
        return __.compile(arg, scope);
    });

    var subsequent = node.subsequent ? __.compile(node.subsequent) : null;
    var contingency = node.contingency ? __.compile(node.contingency) : null;

    // put the futures in scope, then the continuation callback will assign to them

    if (node.futures) {

        var captures = [];

        node.futures.forEach(function (future) {

            if (future.type == 'id' && scope.has(future.name) == false) {
                scope.declare(future.name);
            }

            captures.push([__.compile(future), ' = args.shift();\n']);
        });

        // if there's a subsequent, throw the capture assignments in there at the top, otherwise make one

        if (subsequent) {
            subsequent = [captures, subsequent];
        }
        else {
            subsequent = captures;
        }
    }

    return JsConstruct.buildMessage(target, args, subsequent, contingency);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['application_stmt'] = function (node, scope) {

    // slap a semicolon on that bad boy
    return JsConstruct.makeStatement([__.compile(node.application, scope), ';\n']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['application'] = function (node, scope) {

    var target = __.compile(node.address, scope);

    var args = node.args.map(function (arg) {
        return __.compile(arg, scope);
    });

    // return a wrapped placeholder
    return new SyncMessage(target, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['id'] = function (node, scope) {

    // we know we're not rendering an lvalue because we're defended from that
    // in the assignment code generator

    // should we pass down in a context if we're in eval or assign mode?
    // context could also let us know we're in string interpolation
    // as well as conditionals

    if (scope.isConstant(node.name)) {
        return scope.resolve(node.name);
    }

    // todo if we're in an eval

    return '$' + node.name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * This just puts a mapping in the scope; it doesn't compile "to" anything.
 *
 * @param node
 * @param scope
 * @return {String}
 */
__['constant'] = function (node, scope) {

    scope.define(node.name, __.compile(node.value, scope));

    return new JsConstruct();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['cardinality'] = function (node, scope) {

    var right = __.compile(node.operand, scope);

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
 * @param scope
 * @param node
 */
__['complement'] = function (node, scope) {

    return new JsConstruct(['!', __.compile(node.operand, scope)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['subscript'] = function (node, scope) {

    // this is guaranteed to be a statement

    var list = __.compile(node.list, scope);
    var index = __.compile(node.index, scope);

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
 * An extraction is a mutating expression.
 *
 * @param scope
 * @param node
 */
__['extraction'] = function (node, scope) {

    var list = __.compile(node.list, scope);
    var index = __.compile(node.index, scope);

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return new JsConstruct([list, '.splice(', index, ', 1)[0]']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['select'] = function (node, scope) {

    var set = __.compile(node.set, scope);

    return new JsConstruct([set, '.', node.member]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['in'] = function (node, scope) {

    // should holds apply to strings? maybe as 'contains'? or some non-word operator?

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

    return new JsConstruct(['function (item, collection) {' +
            "if (Array.isArray(collection)) return collection.indexOf(item) >= 0;" +
            "else if (typeof val === 'object') return collection.hasOwnProperty(item);" +
            "}(", left, ',', right, ")"]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['sequence'] = function (node, scope) {

    var first = __.compile(node.first, scope);
    var last = __.compile(node.last, scope);

    // renders an expression that is a function that takes a single arg -
    // the action to be performed

    return new JsConstruct(['function (first, last, action) {\n' +
            'for (var num = first; num <= last; num++) { action(num); }' +
        "}.bind(null,", first, ',', last, ')']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['op'] = function (node, scope) {

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

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
 * @param scope
 * @param node
 */
__['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val ? 'true' : 'false';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return node.val;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
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
 * @param scope
 * @param node
 */
var compileList = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item, scope);
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
 * @param scope
 * @param node
 */
__['dyad'] = function (node, scope) {

    var key = __.compile(node.key, scope);
    var value = __.compile(node.value, scope);

    return [key, ':', value];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Records are just implemented as JS objects of course.
 *
 * @param scope
 * @param node
 */
__['record'] = function (node, scope) {

    var self = this;

    var fields = node.fields.map(function (field) {
        return self.compile(field, scope);
    });

    // could use a block annotation here
    return new JsConstruct(['{', {csv: fields}, '}']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['field'] = function (node, scope) {

    var value = __.compile(node.value, scope);

    // we don't qualify field names
    return [node.name, ':', value];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['interpolation'] = function (node, scope) {

    return new JsConstruct(["'", node.left, "' + ",
        __.compile(node.middle, scope), " + '", node.right, "'"]);
};

__['dynastring'] = function (node, scope) {

    return new JsConstruct([__.compile(node.left, scope), " + '", node.middle, "' + ",
        __.compile(node.right, scope)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['increment'] = function (node, scope) {
    return JsConstruct.makeStatement([ __.compile(node.operand, scope), "++;\n"]);
};

__['decrement'] = function (node, scope) {
    return JsConstruct.makeStatement([ __.compile(node.operand, scope), "--;\n"]);
};

__['splice'] = function (node, scope) {
    return JsConstruct.makeStatement([ __.compile(node.list, scope), ".push(", __.compile(node.item, scope), ");\n"]);
};

module.exports = __;
