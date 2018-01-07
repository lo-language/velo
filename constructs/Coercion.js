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


class Coercion extends LoConstruct {

    /**
     * Coerces the given expression to the given type.
     *
     * @param expr
     * @param type
     */
    constructor(expr, type) {

        super();
        this.expr = expr;
        this.type = type || 'string';
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'coercion',
            expr: this.expr.getAst(),
            coerce: this.type
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
     * Returns the Lo AST for this node.
     */
    hasType(type) {

        return type == this.type;
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        if (this.type == 'string') {
            return JS.fnCall(JS.ID('String'), [this.expr.compile(sourceCtx, targetCtx)]);
        }

        throw new Error('we only coerce to strings at the moment, baby');
    }
}

module.exports = Coercion;