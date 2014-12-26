/**
 * The Exa-to-Node compiler/VM
 *
 * the design of this language is predicated on automated testing -
 * errors that could conceivably be detected at compile-time ARE NOT
 */

'use strict';

var Q = require('q');
var Context = require('./ExaContext');
var JsExpr = require('./JsExpr');
var JsCall = require('./JsCall');
var JsOp = require('./JsOp');
var JsStmt = require('./JsStmt');
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
    return new JsExpr(node.val ? 'true' : 'false');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['number'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("" + node.val);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['string'] = function (node) {

    // a literal has no effects or preconditions - just a value
    return new JsExpr("'" + node.val + "'");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype['id'] = function (node) {

    // an ID has no effects but may have preconditions if it's not ready in the context

    // see if the ID has been defined as ready - literal or argument
    if (this.context.isValue(node.name)) {

        // ID is ready
        return new JsExpr('$_' + node.name);
    }
    else if (this.context.isPromise(node.name)) {

        // ID is not ready - subscribe to the pending value
        return new JsExpr('$val_' + node.name);
//        node.needs = [node.name];
    }

    return new JsExpr();
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
//__.prototype['program'] = function (node) {
//
//    // load the user arguments into args
//    node.code = 'var args = Array.prototype.slice.call(arguments, 2);\n';
//    node.code += 'var result = Q.defer();\n';
////    node.code += 'console.log(arguments);\n';
//
//    node.statements.forEach(function (stmt) {
//
//        var code = compileChildStatement(node, stmt, context);
//
//        if (code !== undefined) {
//            node.code += code + '\n';
//        }
//    });
//
//    node.code += 'return result.promise;\n'
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
//__.prototype['receive'] = function (node) {
//
//    var statements = node.names.map(function (id, index) {
//
//        // alter the context for following statements
//        context.defineValue(id);
//
//        return 'var $_' + id + ' = args[' + index + '];';
//    });
//
//    // receive has no value, just side effects
//    node.js = {statements: statements};
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
//__.prototype['conditional'] = function (node) {
//
//    // needs predicate to be ready
//
//    compileChild(node, node.predicate, context);
//
//    node.code = 'if (' + node.predicate.code + ') {\n';
//
//    node.positive.forEach(function (stmt) {
//        var code = compileChildStatement(node, stmt, context);
//        node.code += indent(code) + '\n';
//    });
//
//    node.code += '}\n';
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
//__.prototype['termination'] = function (node) {
//
//    // guaranteed to be statements
//
//    if (node.channel === 'reply') {
//        node.code = 'result.resolve('
//    }
//    else {
//        node.code = 'result.reject('
//    }
//
//    var args = node.args.map(function (arg) {
//        return compileChild(node, arg, context);
//    });
//
//    node.code += args.join(',') + ');\nreturn result.promise';
//    node.ready = true;
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 */
//__.prototype['assign'] = function (node) {
//
//    // this is guaranteed to be a statement
//    compileChild(node, node.left, context);
//    compileChild(node, node.right, context);
//
//    if (node.left.type == 'id') {
//        context['$_' + node.left.name] = node.right.ready || 'unknown';
//    }
//
//    node.code = node.left.code + ' ' + node.op + ' ' + node.right.code;
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An assignment may alter the current context by creating a variable in the context - if the LHS of the assign
 * is a simple identifier.
 *
 * @param node
 */
//__.prototype['subscript'] = function (node) {
//
//    // this is guaranteed to be a statement
//    compileChild(node, node.list, context);
//    compileChild(node, node.index, context);
//
//    node.code = node.list.code + '[' + node.index.code + ']';
//};

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