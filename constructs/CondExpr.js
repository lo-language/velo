/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * C-style conditional expression
 *
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class CondExpr extends LoConstruct {

    /**
     * A conditional expression
     *
     * @param predicate
     * @param consequent
     * @param alternate
     */
    constructor(predicate, consequent, alternate) {

        super();
        this.predicate = predicate;
        this.consequent = consequent;
        this.alternate = alternate;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        var result = {
            type: 'cond-expr',
            predicate: this.predicate.getAst(),
            trueVal: this.consequent.getAst()
        };

        if (this.alternate) {
            result.falseVal = this.alternate.getAst();
        }

        return result;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        var result = ['cond',
            this.predicate.getTree(),
            this.consequent.getTree(),
        ];

        if (this.alternate) {
            result.push(this.alternate.getTree());
        }

        return result;
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.condExpr(
            this.predicate.compile(sourceCtx, targetCtx),
            this.consequent.compile(sourceCtx, targetCtx),
            this.alternate.compile(sourceCtx, targetCtx));
    }
}


module.exports = CondExpr;