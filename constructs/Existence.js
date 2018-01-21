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


class Existence extends LoConstruct {

    /**
     * A runtime existence check operator.
     *
     * @param expr      a nominal expression
     * @param undef     true if checking for non-existence
     */
    constructor(expr, undef) {

        super();
        this.expr = expr;
        this.undef = undef;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: this.undef ? 'undefined' : 'defined',
            expr: this.expr.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'exists',
            this.undef ? 'undefined' : 'defined',
            this.expr.getTree()];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return this.undef ?
            JS.strictEqual(JS.typeof(this.expr.compile(sourceCtx, targetCtx)), JS.string('undefined')) :
            JS.strictNotEqual(JS.typeof(this.expr.compile(sourceCtx, targetCtx)), JS.string('undefined'));
    }
}

module.exports = Existence;