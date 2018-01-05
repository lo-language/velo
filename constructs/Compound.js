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


class Compound extends LoConstruct {

    /**
     * A compound literal
     *
     * @param fields
     */
    constructor(fields) {

        super();
        this.fields = fields;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'compound',
            fields: this.fields.map(field => field.getAst())
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['compound'].concat(
            this.fields.map(field => field.getTree()));
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.objLiteral(this.fields.map(field => {
            return field.compile(sourceCtx, targetCtx);
        }));
    }
}

module.exports = Compound;