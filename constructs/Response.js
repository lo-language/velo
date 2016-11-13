/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');


/**
 * A response statement
 *
 * @param type
 * @param args
 */
var __ = function (type, args) {

    this.type = type;
    this.args = args || [];
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'response',
        channel: this.type,
        args: this.args.map(arg => arg.getAst())
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var args = JS.arrayLiteral(this.args.map(arg => arg.compile(context)));

    // todo - only render the return if there are following statements? but then shouldn't we throw a compiler warning?

    return new JsStmt(JS.exprStmt(JS.runtimeCall('respond', [JS.string(this.type), args]))).attach(JsStmt.return());
};

module.exports = __;