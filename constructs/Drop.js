/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class Drop extends LoConstruct {

    /**
     * Unbinds the given symbol, which must be a nullable lvalue.
     *
     * @param expr      a nominal expression
     */
    constructor(expr) {

        super();
        this.expr = expr;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'drop',
            expr: this.expr.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['drop', this.expr.getTree()];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

    }
}

module.exports = Drop;