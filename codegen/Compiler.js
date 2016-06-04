/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * JavaScript code generator
 *
 * This is a collection of stateless functions expecting to be called with a Context as 'this'.
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

const JsConstruct = require('./JsConstruct');
const Call = require('./Call');
const Future = require('./Future');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles a module, producing a symbol table.
 *
 * @param node
 */
module.exports['module'] = function (node) {

    var defs = node.definitions.map(def => {
        return this.compile(def).render();
    }).join("\n\n");

    var exports = this.getExports();

    var returnVal = '{' + Object.keys(exports).map(function (name) {

            return '"' + name + '": ' + exports[name];

        }).join(", ") + '}';

    // wrap our service constant definitions in a scope to prevent collisions with other modules
    // export our constants via a return statement

    return new JsConstruct([
        "function () {\n\n'use strict';\n\n",
        defs,
        "\n\nreturn ", returnVal, ";\n",
        "}"]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['nil'] = function (node) {

    return "null";
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A service definition is an expression.
 *
 * @param node
 */
module.exports['procedure'] = function (node) {

    // push a new scope onto the scope stack
    var local = this.createInner();

    // if we have a channel we're a handler with args instead of a task
    // todo could drop this if services took an 'args' arg rather than putting them in the task
    var argList = node.channel ? 'args' : 'task.args';

    // process params
    var params = node.params.map(function (name, index) {

            local.declare(name);
            return '$' + name + ' = ' + 'task.args[' + index + '];\n';

        }).join('') + '\n';

    // compile the statement(s) in the context of the local scope
    var body = local.compile(node.body);

    // after compilation we can get our declared vars
    var localVars = local.getJsVars();

    // declare our local vars
    var fnBody = [
        localVars.length > 0 ? 'var ' + localVars.join(', ') + ';\n\n' : '',
        params, body];

    // todo only include recur where it's referenced (or just remove this feature)
    if (node.channel == null) {
        fnBody.unshift('var $recur = task.service;\n');
    }

    // implements an exa service as a JS function that takes a task
    return new JsConstruct([
        'function (' + (node.channel ? 'args' : 'task') + ') ', {block: fnBody}], false);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['stmt_list'] = function (node) {

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
 *
 * @param node
 */
module.exports['response'] = function (node) {

    var _this = this;

    var args = node.args.map(function (arg) {
        return _this.compile(arg);
    });

    // we assume the existence of a Task object named 'task'
    // todo throw a compiler warning if anything is attach()'d to this statement
    return JsConstruct.makeStatement(['task.respond("', node.channel, '", [', {csv: args}, ']);\nreturn;']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current scope by defining a variable in it if the LHS of the assign
 * is an identifier.
 *
 * @param node
 */
module.exports['assign'] = function (node) {

    // if the left node is a bare ID, then we compile it as an lvalue
    // otherwise all IDs are compiled as rvalues

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    // todo this implies block-level scoping
    if (node.left.type == 'id') {

        var name = node.left.name;

        // validate we're not assigning to a constant
        if (this.isConstant(name)) {
            throw new Error("can't assign to a constant (" + name + ")");
        }

        // declare if a new var
        // can this not be idempotent?
        if (this.has(name) == false) {
            this.declare(name);
        }

        // see if the RHS is a dispatch
        if (node.right.type == 'message') {
            this.setFuture(name);
        }
    }

    return JsConstruct.makeStatement([left, ' ' + node.op + ' ', right, ';\n']);
    // this was genius
    // above comment inserted by my slightly tipsy wife regarding definitely non-genius code later removed - SP
 };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['conditional'] = function (node) {

    // if the predicate is sync that's easy because we always want to resolve it
    // the trick is sync logic in the branches because we only want to resolve if
    // necessary

    // generate unique continuation names
    var contName;

    var predicate = this.compile(node.predicate);
    var consequent = this.compile(node.consequent);
    var negBlock = false;

    var async = consequent.async;

    if (node.alternate) {
        negBlock = this.compile(node.alternate);
        async = async || negBlock.async;
    }

    if (async) {

        // we need both branches
        if (negBlock == false) {
            negBlock = new JsConstruct([]);
        }

        // and need to call the continuation as the last statement in both branches
        // var cont = new Continuation(this.contNum++);

        // generate unique continuation names
        contName = "cont" + this.contNum++;

        consequent.attach(new JsConstruct(contName + "();"));
        negBlock.attach(new JsConstruct(contName + "();"));

        // consequent.attach(cont.call());
        // negBlock.attach(cont.call());
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
module.exports['iteration'] = function (node) {

    var condition = this.compile(node.condition);
    var body = this.compile(node.statements);

    // can render as a while loop if body isn't async
    if (!(body.async)) {

        return JsConstruct.makeStatement([
            'while (', condition, ')',
                {block: body}]);
    }

    // join the body to the wrapper function via setImmediate to form the loop in a way that won't break the stack
    body.attach(new JsConstruct("setImmediate(task.doAsync(loop));"));

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
module.exports['message'] = function (node) {

    // compile the parts

    var target = this.compile(node.address);

    var args = node.args.map(arg => {
        return this.compile(arg);
    });

    var subsequent = node.subsequent ? this.compile(node.subsequent) : null;
    var contingency = node.contingency ? this.compile(node.contingency) : null;

    return JsConstruct.buildMessage(target, args, subsequent, contingency);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['application_stmt'] = function (node) {

    // slap a semicolon on that bad boy
    return JsConstruct.makeStatement([this.compile(node.application), ';\n']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * todo this is exactly the same as dispatch now except for the return expr
 * @param node
 */
module.exports['application'] = function (node) {

    var target = this.compile(node.address);

    var args = node.args.map(arg => {
        return this.compile(arg);
    });

    var subsequent = node.subsequent ? this.compile(node.subsequent) : null;
    var contingency = node.contingency ? this.compile(node.contingency) : null;

    // return a wrapped placeholder
    return new Call(target, args, subsequent, contingency);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['id'] = function (node) {

    // todo know we're not rendering an lvalue because we're defended from that
    // in the assignment code generator

    // should we pass down in a context if we're in eval or assign mode?
    // context could also let us know we're in string interpolation
    // as well as conditionals

    if (this.isConstant(node.name, node.scope)) {
        return this.resolve(node.name, node.scope);
    }

    if (node.scope) {

        // having a qualifier implies a constant
        return this.resolveExternal(node.name, node.scope);
    }

    // see if the name is a local constant
    try {
        return this.resolve(node.name);
    }
    catch (err) {
        // ignore
    }

    // todo just return whatever the ID resolves to in this scope?
    // make resolve able to return a Future or a $ name?

    if (this.isFuture(node.name)) {
        return new Future(node.name);
    }

    return '$' + node.name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @return {String}
 */
module.exports['constant'] = function (node) {

    // services are *run-time* constants -- we just can't know them at compile-time

    if (node.value.type == 'procedure') {

        var id = '$' + node.name;
        this.define(node.name, id, true);
        return new JsConstruct.makeStatement(["const ", id, " = ", this.compile(node.value), ';']);
    }

    this.define(node.name, this.compile(node.value));

    // return an empty construct to allow attachment
    return new JsConstruct();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['cardinality'] = function (node) {

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
module.exports['complement'] = function (node) {

    return new JsConstruct(['!', this.compile(node.operand)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['subscript'] = function (node) {

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

module.exports['slice'] = function (node) {

    // lean on JS slice since it has the same semantics

    var list = this.compile(node.list);
    var start = node.start ? this.compile(node.start) : '0';
    var end = node.end ? this.compile(node.end) : null;

    return new JsConstruct([list, '.slice(', start, end ? [',', end] : '', ')']);
};

module.exports['excision'] = function (node) {

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
    }
    else {
        start = this.compile(node.start);

        if (node.start.type == 'number' && parseInt(node.start.val) < 0) {
            start = list + '.length' + node.start.val;
        }
    }

    if (node.end === undefined) {
        end = list + '.length';
    }
    else {
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
    return new JsConstruct([list, '.slice(', start, ',', end, '+1)']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An extraction is a mutating expression.
 *
 * @param node
 */
module.exports['extraction'] = function (node) {

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
module.exports['select'] = function (node) {

    var set = this.compile(node.set);

    return new JsConstruct([set, '.', node.member]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['in'] = function (node) {

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
module.exports['sequence'] = function (node) {

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
module.exports['op'] = function (node) {

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    var op = node.op;

    if (op == 'concat') {
        return new JsConstruct(['task.concat(', left, ', ', right, ')']);
    }

    if (op === 'and') {
        op = '&&';
    }
    else if (op === 'or') {
        op = '||';
    }

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

module.exports['boolean'] = function (node) {

    return node.val ? 'true' : 'false';
};

module.exports['number'] = function (node) {

    return node.val;
};


module.exports['string'] = function (node) {

    return "'" + node.val.replace(/'/g, "\\'") + "'";
};

module.exports['array'] = function (node) {

    const items = node.elements.map((item) => {
        return this.compile(item);
    });

    return new JsConstruct(['[', {csv: items}, ']']);
};

module.exports['set'] = function (node) {

    const items = node.elements.map((item) => {
        return [this.compile(item), ': true'];
    });

    return new JsConstruct(['{', {csv: items}, '}']);
};

module.exports['map'] = function (node) {

    const items = node.elements.map((item) => {
        return this.compile(item);
    });

    return new JsConstruct(['{', {csv: items}, '}']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['pair'] = function (node) {

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
module.exports['record'] = function (node) {

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
module.exports['field'] = function (node) {

    var value = this.compile(node.value);

    // we don't qualify field labels
    return [node.label, ':', value];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['interpolation'] = function (node) {

    return new JsConstruct(["'", node.left, "' + ",
        this.compile(node.middle), " + '", node.right, "'"]);
};

module.exports['dynastring'] = function (node) {

    return new JsConstruct([this.compile(node.left), " + '", node.middle, "' + ",
        this.compile(node.right)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['increment'] = function (node) {
    return JsConstruct.makeStatement([ this.compile(node.operand), "++;\n"]);
};

module.exports['decrement'] = function (node) {
    return JsConstruct.makeStatement([ this.compile(node.operand), "--;\n"]);
};

module.exports['splice'] = function (node) {
    return JsConstruct.makeStatement([ this.compile(node.list), ".push(", this.compile(node.item), ");\n"]);
};
