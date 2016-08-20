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

const JsFunction = require('./JsFunction');
const Future = require('./Future');
const JS = require('./JsPrimitives');
const JsStmt = require('./JsStmt');
const Request = require('./Request');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles a module, producing a symbol table.
 *
 * A module compiles to a function that returns a map of names to function defs.
 *
 * @param node
 */
module.exports['module'] = function (node) {

    var body = JsStmt.strictMode();

    // should module definitions be captured as a link list like statements?

    // how do we handle attaching empty stmts (what you get from a const def) here???

    node.definitions.forEach(def => {
        body.attach(this.compile(def));
    });

    var exports = this.getExports();

    // attach all the export statements

    var pairs = Object.keys(this.getExports()).map(
        name => [JS.string(name), exports[name]]);

    body.attach(JsStmt.return(JS.objLiteral(pairs)));

    // wrap our service constant definitions in a scope to prevent collisions with other modules
    // export our constants via a return statement

    return new JsFunction([], body);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['nil'] = function (node) {

    return JS.NULL;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles a procedure, which may be a service or a handler.
 *
 * @param node
 */
module.exports['procedure'] = function (node) {

    // push a new scope onto the scope stack
    var local = this.createInner();

    // -- we're already discriminating between handler and service below!
    // maybe split these up?
    // if we have a channel we're a handler with args instead of a task
    // todo could drop this if services took an 'args' arg rather than putting them in the task
    var argList = node.channel ? JS.ID('args') : JS.select(JS.ID('task'), 'args');

    // load params into symbol table
    node.params.forEach(name => local.declare(name));

    // compile the statement(s) in the context of the local scope
    var body = local.compile(node.body);

    // after compilation we can get our declared vars
    var localVars = local.getJsVars();

    // declare our local vars
    var preamble = null;

    localVars.forEach(varName => {

        var decl = new JsStmt.varDecl(varName);

        if (preamble) {
            preamble.attach(decl);
        }
        else {
            preamble = decl;
        }
    });

    // bind values to our params
    node.params.forEach((paramName, index) => {

        var assignment = new JsStmt(JS.assign(JS.ID('$' + paramName), JS.subscript(argList, JS.num(String(index)))));

        if (preamble) {
            preamble.attach(assignment);
        }
        else {
            preamble = assignment;
        }
    });

    // todo only include recur where it's referenced (or just remove this feature)
    if (node.channel == null) {
        // statements.unshift('var $recur = task.service;\n');
    }

    if (preamble) {
        body = preamble.attach(body);
    }

    // implements an exa service as a JS function that takes a task
    // if a service, squash the construct?
    return new JsFunction([(node.channel ? 'args' : 'task')], body);
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
            this.compileStmt(node.head).attach(this.compileStmt(node.tail)) :
            this.compileStmt(node.head);
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

    var args = JS.arrayLiteral(node.args.map(arg => this.compile(arg)));

    return new JsStmt(JS.runtimeCall('respond', [JS.string(node.channel), args])).attach(JsStmt.return());
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * There are no explicit declarations right now, so assignment may alter the current scope by
 * defining a variable in it if the LHS of the assign is an identifier.
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

    var expr = JS.assign;

    if (node.op == '*=') {
        expr = JS.mulAssign;
    }

    return new JsStmt(JS.exprStmt(expr(left, right, node.op)));

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

    var jsCond = JsStmt.cond(predicate, consequent, negBlock);

    if (async) {
        return new JsStmt(JS.varDecl(JS.ID(contName), JS.fnDef([])));

        // return JsConstruct.makeStatement(['var ' + contName + ' = function () {'], ['};'].concat(parts));
    }

    return jsCond;
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
        return JsStmt.while(condition, body);
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

    return new Request(target, args, subsequent, contingency);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Application
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * todo - this is exactly the same as dispatch now except for the return expr
 * @param node
 */
module.exports['application'] = function (node) {

    var target = this.compile(node.address);

    var args = node.args.map(arg => {
        return this.compile(arg);
    });

    // todo raise exception if we have a subsequent block on an application expr

    var subsequent = node.subsequent ? this.compile(node.subsequent) : null;
    var contingency = node.contingency ? this.compile(node.contingency) : null;

    // get a placeholder
    return this.pushBlockingCall(target, args, contingency);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @returns {__}
 */
module.exports['application_stmt'] = function (node) {

    return new JsStmt(this.compile(node.application));
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

    if (node.scope) {

        // having a qualifier implies a constant
        return this.resolveExternal(node.name, node.scope);
    }

    if (this.isConstant(node.name)) {
        return this.resolve(node.name);
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

    return JS.ID('$' + node.name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compile a constant definition statement.
 *
 * @param node
 * @return {String}
 */
module.exports['constant'] = function (node) {

    // services are *run-time* constants -- we just can't know them at compile-time

    if (node.value.type == 'procedure') {

        var id = '$' + node.name;
        this.define(node.name, JS.ID(id), true);
        return new JsStmt.constDecl(id, this.compile(node.value));
    }

    this.define(node.name, this.compile(node.value));

    // return an empty statement to allow attachment
    return new JsStmt();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['cardinality'] = function (node) {

    // offload to the runtime lib
    return JS.runtimeCall('cardinality', [this.compile(node.operand)]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['complement'] = function (node) {

    return JS.not(this.compile(node.operand));
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
        index = JS.add(JS.select(list, 'length'), index);
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return JS.subscript(list, index);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['slice'] = function (node) {

    // lean on JS slice since it has the same semantics

    var list = this.compile(node.list);
    var start = node.start ? this.compile(node.start) : JS.num('0');
    var end = node.end ? this.compile(node.end) : null;

    return JS.fnCall(
        JS.select(list, 'slice'),
        end ? [start, JS.add(end, JS.num('1'))] : [start]
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// module.exports['excision'] = function (node) {
//
//     var list = this.compile(node.list);
//     var start = this.compile(node.start);
//     var end;   // optional, so compile only if present
//
//     // Allows syntax with negative indices referring to
//     // positions from the end, but only for number literals.
//     // To do this properly we'd have to catch it at runtime
//
//     if (node.start.type == 'number' && parseInt(node.start.val) < 0) {
//         start = list + '.length' + node.start.val;
//     }
//
//     if (node.end) {
//
//         end = this.compile(node.end);
//
//         if (node.end.type == 'number' && parseInt(node.end.val) < 0) {
//             end = list + '.length' + node.end.val;
//         }
//     }
//
//     // todo - what if the list expression is a request or somesuch? can't resolve it twice
//     // wrap it in a helper function?
//
//     if (node.type == 'excision') {
//         return new JsConstruct([list, '.splice(', start, end ? [',(', end, ')-(' , start, ')+1'] : '', ')']);
//     }
//
//     // slice
//     return new JsConstruct([list, '.slice(', start, ',', end, '+1)']);
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An extraction is a mutating expression.
 *
 * @param node
 */
// module.exports['extraction'] = function (node) {
//
//     var list = this.compile(node.list);
//     var index = this.compile(node.index);
//
//     // todo - what if the list expression is a request or somesuch? can't resolve it twice
//     // wrap it in a helper function?
//
//     return new JsConstruct([list, '.splice(', index, ' < 0 ? ', index, ' + ', list, '.length : ', index, ', 1)[0];']);
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['select'] = function (node) {

    return JS.select(this.compile(node.set), node.member);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['in'] = function (node) {

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    return JS.runtimeCall('in', [left, right]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
// module.exports['sequence'] = function (node) {
//
//     var first = this.compile(node.first);
//     var last = this.compile(node.last);
//
//     // renders an expression that is a function that takes a single arg -
//     // the action to be performed
//
//     return new JsConstruct(['function (first, last, action) {\n' +
//             'for (var num = first; num <= last; num++) { action(num); }' +
//         "}.bind(null,", first, ',', last, ')']);
// };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['op'] = function (node) {

    var left = this.compile(node.left);
    var right = this.compile(node.right);

//    todo - make sure both sides are defined
//    could relax this if we want to allow declaration after usage
//    should also factor this out into a getValue() maybe

//    if (node.left.jsVal === undefined) {
//        throw new Error("left operand not defined");
//    }
//
//    if (node.right.jsVal === undefined) {
//        throw new Error("right operand not defined");
//    }

    var op = node.op;

    switch (op) {

        case 'concat':
            return JS.runtimeCall('concat', [left, right]);

        case 'and':
            return JS.logicalAnd(left, right);

        case 'or':
            return JS.logicalOr(left, right);

        case '==':
            return JS.strictEqual(left, right);

        case '!=':
            return JS.notEqual(left, right);

        case '<':
            return JS.lt(left, right);

        case '>':
            return JS.gt(left, right);

        case '<=':
            return JS.lte(left, right);

        case '>=':
            return JS.gte(left, right);

        case '+':
            return JS.add(left, right);

        case '-':
            return JS.sub(left, right);

        case '*':
            return JS.mul(left, right);

        case '/':
            return JS.div(left, right);

        case '%':
            return JS.mod(left, right);
    }

    throw new Error("unknown operator: " + op);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Literals
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['boolean'] = function (node) {

    return JS.bool(node.val ? 'true' : 'false');
};

module.exports['number'] = function (node) {

    return JS.num(node.val);
};

module.exports['string'] = function (node) {

    return JS.string(node.val);
};

module.exports['array'] = function (node) {

    const items = node.elements.map((item) => {
        return this.compile(item);
    });

    return JS.arrayLiteral(items);
};

module.exports['set'] = function (node) {

    const items = node.elements.map((item) => {
        return [this.compile(item), JS.bool(true)];
    });

    return JS.objLiteral(items);
};

module.exports['map'] = function (node) {

    const items = node.elements.map((item) => {
        return this.compile(item);
    });

    return JS.objLiteral(items);
};

module.exports['pair'] = function (node) {

    return [this.compile(node.key), this.compile(node.value)];
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

    return JS.objLiteral(fields);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
module.exports['field'] = function (node) {

    // we don't qualify field labels
    return [node.label, this.compile(node.value)];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['interpolation'] = function (node) {

    return JS.add(
        JS.add(JS.string(node.left), this.compile(node.middle)),
        JS.string(node.right));
};

module.exports['dynastring'] = function (node) {

    return JS.add(
        JS.add(this.compile(node.left), JS.string(node.middle)),
        this.compile(node.right));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports['increment'] = function (node) {

    return new JsStmt(JS.inc(this.compile(node.operand)));
};

module.exports['decrement'] = function (node) {

    return new JsStmt(JS.dec(this.compile(node.operand)));
};