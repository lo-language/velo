/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');

/**
 * An increment/decrement statement.
 *
 * @param op
 * @param operand
 */
var __ = function (op, operand) {

    this.op = op;
    this.operand = operand;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: this.op,
        operand: this.operand.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    if (this.op == 'increment') {
        return new JsStmt(JS.exprStmt(JS.inc(this.operand.compile(context))));
    }

    return new JsStmt(JS.exprStmt(JS.dec(this.operand.compile(context))));
};

module.exports = __;