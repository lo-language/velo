/**
 * The Exa-to-Node compiler/VM
 *
 * the design of this language is predicated on automated testing -
 * errors that could conceivably be detected at compile-time ARE NOT
 *
 * ॐ मणिपद्मे हूं
 */

'use strict';

var Q = require('q');
var Context = require('./ExaContext');
var JsExpr = require('./JsExpr');
var JsCall = require('./JsCall');
var JsOp = require('./JsOpExpr');
var JsStmt = require('./JsStmt');
var JsAssignment = require('./JsAssignment');
var JsConditional = require('./JsConditional');
var JsFunction = require('./JsFunction');
var JsStmtList = require('./JsStmtList');
var util = require('util');

var __ = function () {

    // just merge context into this class?
    // should we call compile on a context or on an AST node? going with context for now
    this.context = new Context();
};

/*

approach
go through the AST and determine for each node:
- whether it's a publisher or a subscriber or both or neither
- how to capture the value of that node in JS
- how to capture any side effects of that node in JS
- what async preconditions must be met before the value is available

have each node record whether it's an expression or has one or more statements
in general, have each node record its *requirements*, and then gather the requirements to write the code
also, save codegen for last - construct a JS AST?

optimization idea: detect synchronous functions at their first invocation and short-circuit the promise check?
only works if we don't switch fn ptrs around


 */
// forget about JS initially, transform into an exa program description, with explicit sequencing
// semantic phase I guess
// then compile into js?
// first pass, go through the AST and tag with deps?
// chain statements as nesting, because each statement kind of defines the context for lower statements?
// then do we not need a separate context idea besides the enclosing node??

/**
 * Takes an Exa AST node and returns a JS AST node. Code isn't generated until renderStmt is called on
 * JS nodes.
 *
 * @param node
 * @return {*}
 */
__.prototype.compile = function (node) {

    if (this[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

    return this[node.type](node);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['boolean'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr(node.val ? 'true' : 'false', 'ready');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("" + node.val, 'ready');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("'" + node.val + "'", 'ready');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['id'] = function (node) {

    return new JsExpr('$_' + node.name, this.context.getStatus(node.name));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A request can be part of an expression or a standalone statement.
 *
 * @param node
 */
__.prototype['request'] = function (node) {

    // when rendering needs, can think of that as defining a context in JS-land, with new vars in it

    var fnId = this.compile(node.to);

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg);
    });

    return new JsCall(fnId, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['op'] = function (node) {

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    // make sure both sides are defined
    // could relax this if we want to allow declaration after usage
    // should also factor this out into a getValue() maybe

//    if (node.left.jsVal === undefined) {
//        throw new Error("left operand not defined");
//    }
//
//    if (node.right.jsVal === undefined) {
//        throw new Error("right operand not defined");
//    }

    return new JsOp(node.op, left, right);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['program'] = function (node) {

    var self = this;

    var stmts = node.statements.map(function (stmt) {
        return self.compile(stmt);
    });

    return new JsFunction(stmts);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['receive'] = function (node) {

    var self = this;

    var vars = [];

    node.names.forEach(function (name) {

        // alter the context for following statements
        var argNum = self.context.defineArg(name);

        vars.push('$_' + name + ' = ' + 'args[' + argNum + ']');
    });

    var stmt = 'var ' + vars.join(',\n') + ';';

    return new JsStmt(stmt);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['conditional'] = function (node) {

    var self = this;

    // needs predicate to be ready

    var predicate = this.compile(node.predicate);

    var posBlock = node.positive.map(function (stmt) {
        return self.compile(stmt);
    });

    if (node.negative !== undefined) {

        var negBlock = node.negative.map(function (stmt) {
            return self.compile(stmt);
        });
    }

    return new JsConditional(predicate, posBlock, negBlock);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['termination'] = function (node) {

    var name = 'result.resolve';

    if (node.channel === 'fail') {
        name = 'result.reject';
    }

    var self = this;

    var args = node.args.map(function (arg) {
        return self.compile(arg);
    });

    return new JsStmtList([new JsCall(new JsExpr(name), args), 'return result.promise;']);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 */
__.prototype['assign'] = function (node) {

    // this is guaranteed to be a statement

    var left = this.compile(node.left);
    var right = this.compile(node.right);

    // is being ready a property of an AST node + exa context?
    // is tracking ready state just an optimization? or do we need it to not have turtles all the way down?
    // can we 'ask' the ast node if it's ready?
    // the compilation result should know that already, right?

    // modify the exa context

    if (node.left.type == 'id') {
        this.context.define(node.left.name, right.getStatus());
    }

    return new JsAssignment(node.op, left, right);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 */
__.prototype['subscript'] = function (node) {

    // this is guaranteed to be a statement

    var left = this.compile(node.list);
    var right = this.compile(node.index);

    return new JsOp('subscript', left, right);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders a child node as a statement, including its needs, assuming it has been compiled.
 *
 * @param node
 * @return {String}
 */
__.prototype['exprStatement'] = function(node) {

    var expr = this.compile(node.expr);

    return new JsStmt(expr);
};

module.exports = __;