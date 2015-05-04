/*
 * Copyright (C) 2014 by Seth Purcell
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
 * ${DATE}
 */

/**
 * The Exa-to-JS compiler
 *
 * How it works:
 *
 * Each AST node is compiled into either a bare JS string or an array of strings, arrays, and objects.
 *
 * In the compile phase, the AST is traversed and each node is compiled into either a bare JS string or a JS "construct" which is a list of JS strings and sub-constructs produced by compiling sub-nodes. Simple nodes, such as literals, compile into bare JS strings. More complex nodes compile into constructs, e.g. an addition node would compile into the construct ['(', leftOperand, ' + ', rightOperand, ')']
 *
 * Note:
 * To compile an expression containing a request, we have to do a trick where we create a "resolver" block to wrap the expression.
 */

'use strict';

var Q = require('q');
var Scope = require('./Scope');
var JsConstruct = require('./JsConstruct');
var JsStatement = require('./JsStatement');
var JsResolver = require('./JsResolver');
var JsRequest = require('./JsRequest');

var __ = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Dispatches to the appropriate node type handler.
 *
 * @param node
 * @param scope
 * @return {*}
 */
__.compile = function (node, scope) {

    if (this[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

    // dispatch to the appropriate handler
    return __[node.type](node, scope || new Scope());
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
    if (scope === undefined) {
        localScope = new Scope();
    }
    else {
        // create a nested scope for the procedure's statements
        localScope = scope.bud();
    }

    // define the envelope args - might not want to do this statically, btw
    // since we might not get them with each request

//    localScope.defineArg('recur');
//    localScope.defineArg('__out');
//    localScope.defineArg('__err');

    // compile the statement(s) in the context of the local scope
    var body = __.compile(node.body, localScope);

    // declare our local vars
    // todo move to block-level scoping with 'let'

    var vars = Object.keys(localScope.vars);
    var varNames = vars.map(function (key) {
        return localScope.vars[key];
    });

    if (vars.length > 0) {
        body = ['var ' + varNames.join(', ') + ';\n\n', body];
    }

    return new JsConstruct(['function ($recur, args, $connect) ', {block: body}], false);
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

        if (head.isAsync()) {
            return new JsConstruct(['return ', head, '.then(function () {', tail, '})'], false);
        }

        return new JsConstruct([head, tail]);
    }

    return head;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Statements
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param scope
 * @param node
 */
__['receive'] = function (node, scope) {

    // todo have a JsStatement class that adds the semicolon
    return new JsStatement(['var ' + node.names.map(function (name) {
        return '$' + name + ' = ' + 'args.shift()';
    }).join(',\n') + ';\n\n']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__['expr_stmt'] = function (node, scope) {

    var req = __.compile(node.expr, scope);

    if (req instanceof JsRequest) {

        // slap a semicolon on that bad boy and don't resolve it
        return new JsStatement([req, ';']);
    }

    throw new Error("only bare requests can be statements, dude!");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['response'] = function (node, scope) {

    // should this node type be renamed response?

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg, scope);
    });

    if (args.length > 1) {
        throw new Error("results with >1 value not yet supported, sorry");
    }

    if (node.channel === 'fail') {
        return new JsStatement(['return Q.reject(', {csv: args}, ');']);
    }

    return new JsStatement(['return Q(', {csv: args}, ');']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current scope by defining a variable in it if the LHS of the assign
 * is a simple identifier.
 *
 * @param scope
 * @param node
 */
__['assign'] = function (node, scope) {

    // this is guaranteed to be a statement

    var left = __.compile(node.left, scope);
    var right = __.compile(node.right, scope);

    // modify the local scope
    // todo this implies block-level scoping
    if (node.left.type == 'id' && scope.has(node.left.name) === false) {
        scope.define(node.left.name);
    }

    return new JsStatement(new JsResolver([left, ' ' + node.op + ' ', right, ';\n'], false));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['conditional'] = function (node, scope) {

    // needs predicate to be ready

    var predicate = __.compile(node.predicate);
    var consequent = __.compile(node.consequent, scope);
    var negBlock = false;

    if (node.otherwise) {
        negBlock = __.compile(node.otherwise, scope);
    }

    // todo we might want to rewrite this to only resolve the blocks after evaluating the predicate

    var parts = ['if (', predicate, ') ', {block: consequent}, '\n'];

    if (negBlock) {
        parts.push('else ', {block: negBlock}, '\n');
    }

    return new JsResolver(parts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loops while a condition is true.
 *
 * @param scope
 * @param node
 */
//__['iteration'] = function (node, scope) {
//
//    var condition = __.compile(node.condition, scope);
////    var statements = __.compile(node.statements, scope);
//
//    return new JsWrapper(function (resolver) {
////        return source.renderExpr(stmtContext) + '.call(null,' + sink.renderExpr(stmtContext) + ')'
//    });
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Selective synchronization barrier.
 *
 * @param scope
 * @param node
 */
//__['complete'] = function (node, scope) {
//
//    // complete always needs to wrap its followers (children)
//
//    // should we pass each node a parse tree for it to subsume when we compile it?
//    // or should it pass back something that can subsume a node?
//
//    var self = this;
//
//    var promises = node.promises.map(function (expr) {
//        return self.compile(expr, scope);
//    });
//
//    return new Complete(promises);
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Requests
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A request can be part of an expression or a standalone statement.
 *
 * Requests always compile to async calls:
 *
 * - if response ignored, we don't do anything
 * - if response directly asssigned, we can return a promise
 * - if part of any other expression, we need to invert the parse tree to do the call first
 * - if handed a callback, wire it up to the promise
 *
 * @param scope
 * @param node
 */
__['request'] = function (node, scope) {

    var target = __.compile(node.to);

    // todo add convenience method for compiling arrays?
    var args = node.args.map(function (arg) {
        return __.compile(arg);
    });

    return new JsRequest([target, '(', target, ', [', {csv: args}, '], $connect)']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Expressions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['id'] = function (node) {

    return '$' + node.name;
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

    return new JsResolver([
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

    return new JsResolver(['!', __.compile(node.operand, scope)]);
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

    return new JsResolver([list, '[', (index === undefined ? list + '.length - 1' : index), ']']);
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

    return new JsResolver([set, '.', node.member]);
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

    return new JsResolver(['function (item, collection) {' +
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

    return new JsResolver(['function (first, last, action) {\n' +
            'for (var num = first; num <= last; num++) { action(num); }' +
        "}.bind(null,", first, ',', last, ')']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['connection'] = function (node, scope) {

    // how to handle multiple connectors?

    // sources and sinks are like calls in that they generate both statements and expressions
    // they have expressions but inject statements into the context

    var source = __.compile(node.source, scope);
    var sink = __.compile(node.sink, scope);

    return new JsResolver([source, '.call(null,', sink, ')']);
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
    else if (op == '+') {

        // todo drop this in favor of combination operator ><
        return new JsConstruct(['function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {' +
                'return left.concat(right);} else return left + right;}(',
                left, ',', right, ')']);
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
    return new JsResolver(['(', left, ' ', op, ' ', right, ')']);
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
 *
 * @param scope
 * @param node
 */
__['list'] = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var items = node.elements.map(function (item) {
        return self.compile(item, scope);
    });

    return new JsResolver(['[', {csv: items}, ']']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @param node
 */
__['set'] = function (node, scope) {

    // list literals might have members that need to be realized

    var self = this;

    var members = node.members.map(function (member) {
        return self.compile(member, scope);
    });

    // could use a block annotation here
    return new JsResolver(['{', {csv: members}, '}']);
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
 * Compiles a symbol into a string literal for now.
 *
 * @param scope
 * @param node
 */
__['symbol'] = function (node) {

    return "'<" + node.name + ">'";
};

module.exports = __;