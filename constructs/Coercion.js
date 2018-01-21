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
const ArrayType = require('../compiler/ArrayType');


class Coercion extends LoConstruct {

    /**
     * Coerces the given expression to the given type.
     *
     * @param expr
     */
    constructor(expr) {

        super();
        this.expr = expr;
        this.type = ArrayType.STRING;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'coercion',
            expr: this.expr.getAst(),
            coerce: this.type.toString()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'coercion',
            this.expr.getTree(),
            this.type
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        if (this.type == ArrayType.STRING) {
            return JS.fnCall(JS.ID('String'), [this.expr.compile(sourceCtx, targetCtx)]);
        }

        throw new Error('we only coerce to strings at the moment, baby');
    }
}

module.exports = Coercion;