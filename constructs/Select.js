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


class Select extends LoConstruct {

    /**
     * A record select (dot operator) expression
     *
     * @param recordExpr
     * @param field
     */
    constructor(recordExpr, field) {

        super();

        this.recordExpr = recordExpr;
        this.field = field;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'select',
            record: this.recordExpr.getAst(),
            field: this.field
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'select',
            this.recordExpr.getTree(),
            this.field
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.select(this.recordExpr.compile(sourceCtx, targetCtx), this.field);
    }
}

module.exports = Select;