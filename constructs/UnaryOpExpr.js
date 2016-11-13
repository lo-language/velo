/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A unary operator expression
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

    if (this.op == 'cardinality') {

        // offload to the runtime lib
        return JS.runtimeCall('cardinality', [this.operand.compile(context)]);
    }


    if (this.op == 'complement') {

        return JS.not(this.operand.compile(context));
    }
};

module.exports = __;