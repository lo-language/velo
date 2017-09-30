/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

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
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        this.op,
        this.operand.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    if (this.op == 'cardinality') {

        // offload to the runtime lib
        return JS.utilCall('cardinality', [this.operand.compile(context)]);
    }


    if (this.op == 'complement') {

        return JS.not(this.operand.compile(context));
    }
};





/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    if (this.op == 'cardinality') {

        // offload to the runtime lib
        return JS.utilCall('cardinality', [this.operand.compile2(sourceCtx, targetCtx)]);
    }


    if (this.op == 'complement') {

        return JS.not(this.operand.compile2(sourceCtx, targetCtx));
    }
};

module.exports = __;