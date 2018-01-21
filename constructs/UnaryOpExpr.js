/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class UnaryOpExpr extends LoConstruct {

    /**
     * A unary operator expression
     *
     * @param op
     * @param operand
     */
    constructor(op, operand) {

        super();

        this.op = op;
        this.operand = operand;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: this.op,
            operand: this.operand.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            this.op,
            this.operand.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        if (this.op == 'cardinality') {

            // offload to the runtime lib
            return JS.utilCall('cardinality', [this.operand.compile(sourceCtx, targetCtx)]);
        }


        if (this.op == 'complement') {

            return JS.not(this.operand.compile(sourceCtx, targetCtx));
        }
    }
}

module.exports = UnaryOpExpr;