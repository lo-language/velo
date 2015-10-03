/*
 * Copyright (C) 2014-2015 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 */

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

    var localScope;

    // if there's no enclosing scope, we're at the root of the scope tree
    // todo not sure we should do this (supply a scope here)
    if (scope === undefined) {
        localScope = new Scope(null, "this.tryClose();\n");
    }
    else {
        // create a nested scope for the procedure's statements
        localScope = scope.bud("this.tryClose();\n");
    }

    // compile the statement(s) in the context of the local scope
    var body = __.compile(node.body, localScope);

    // declare our local vars
    // todo move to block-level scoping with 'let'

    var localVars = localScope.getJsVars();

    if (localVars.length > 0) {
        body = ['var ' + localVars.join(', ') + ';\n\n', body];
    }

    // nixing implicit "connect" for now...
    return new JsConstruct([
        'function ($recur, args) ', {block: body}], false);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['stmt_list'] = function (node, scope) {

    // hooray for Lisp!

    var head = __.compile(node.head, scope);

    if (node.tail) {

        var tail = __.compile(node.tail, scope);

        if (node.head.type == 'conditional' || node.head.type == 'iteration') {

            // todo see if the conditional contains any async code before making continuation

            // grab a continuation before diving into a conditional
            var contName = "cc";
            var cont = JsConstruct.makeContinuation(contName, tail);
            var call = contName + ".call(this);\n";

            if (node.head.type == 'iteration') {

                // we need to call setImmediate within a no-async-calls loop to avoid running out of stack
                // but can probably get away with it inside a conditional - could run out of stack if
                // there are enough nested conditionals, but that seems unlikely

                // todo - do we need to do this? isn't the continuation set in the iteration compile step?

//                call = "setImmediate(" + contName + ".bind(this));\n"
            }

            // recompile the head with the continuation
            head = __.compile(node.head, scope.bud(call));

            // define the continuation before we use it
            return new JsConstruct([cont, head]).resolve();
        }

        // we resolve *after* joining the tail on the head so that the tail
        // is captured within any wrappers required by the head
        return new JsConstruct([head, tail]).resolve();
    }
    else if (scope.hasContinuation()) {

        // call the continuation as the last thing we do in each block
        // scope.addContinuation? to create the construct?

        if (node.head.type !== "response") {
            return new JsConstruct([head, scope.getCallCont()]).resolve();
        }
    }

    return head.resolve();
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

    return new JsConstruct([node.names.map(function (name) {

        // declare if a new var
        if (scope.has(name) == false) {
            scope.declare(name);
        }

        return '$' + name + ' = ' + 'args.shift()';

    }).join(';\n') + ';\n\n']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['application_stmt'] = function (node, scope) {

    // slap a semicolon on that bad boy
    return new JsConstruct([__.compile(node.application, scope), ';\n']);
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
        return new JsConstruct(['this.fail(', {csv: args}, ');\nreturn;']);
    }

    return new JsConstruct(['this.reply(', {csv: args}, ');\nreturn;']);
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
        if (scope.has(node.left.name) == false) {
            scope.declare(node.left.name);
        }
    }

    return new JsConstruct([left, ' ' + node.op + ' ', right, ';\n']);
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

    if (node.otherwise) {
        negBlock = __.compile(node.otherwise, scope);
    }
    else if (scope.hasContinuation()) {
        negBlock = scope.getCallCont();
    }

    var parts = ['if (', predicate, ') ', {block: consequent}, '\n\n'];

    if (negBlock) {
        parts.push('else ', {block: negBlock}, '\n\n');
    }

    return new JsConstruct(parts);
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

    // set a continuation
    var cont = JsConstruct.makeContinuation(node.statements);

    // we want to compile this with the continuation we'll make next
    var statements = __.compile(node.statements, scope.bud("setImmediate(loop.bind(this));"));

    var cond = scope.hasContinuation()?
        new JsConstruct(["if (", condition, ") ", {block: statements}, "\nelse ", {block: scope.getCallCont()}]):
        new JsConstruct(["if (", condition, ") ", {block: statements}]);

    return new JsConstruct([

        "var loop = function () ",
        {block: cond}, ";\n\n",
        "loop.call(this);\n"
    ]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Generates code to send messages via Request.sendMessage().
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

    return JsConstruct.buildMessage(target, args,
        node.subsequent ? __.compile(node.subsequent) : null,
        node.contingency ? __.compile(node.contingency) : null);
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
    return new JsConstruct(new SyncMessage(target, args));
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
 *
 * @param node
 * @param scope
 * @return {String}
 */
__['constant'] = function (node, scope) {

    scope.define(node.name, __.compile(node.value, scope));

    return '';
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
    var index = undefined;

    if (node.index !== undefined) {
        index = __.compile(node.index, scope);
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return new JsConstruct([list, '[', (index === undefined ? list + '.length - 1' : index), ']']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['select'] = function (node, scope) {

    // this is guaranteed to be a statement

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
__['list'] = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var isMap = false;

    var items = node.elements.map(function (item) {

        if (item.type == 'dyad') {
            isMap = true;
        }

        return self.compile(item, scope);
    });

    if (isMap) {
        return new JsConstruct(['{', {csv: items}, '}']);
    }

    return new JsConstruct(['[', {csv: items}, ']']);
};

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
    return new JsConstruct([ __.compile(node.operand, scope), "++;"]);
};

__['decrement'] = function (node, scope) {
    return new JsConstruct([ __.compile(node.operand, scope), "--;"]);
};

module.exports = __;