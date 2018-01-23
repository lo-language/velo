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


class Defined extends LoConstruct {

    /**
     * A runtime binding check operator. Checks whether a symbol is bound or null.
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
            type: 'defined',
            expr: this.expr.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['exists', this.expr.getTree()];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        return JS.strictNotEqual(JS.typeof(this.expr.compile(sourceCtx)), JS.string('undefined'));
    }
}

module.exports = Defined;