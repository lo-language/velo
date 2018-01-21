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
const ProductType = require('../compiler/ProductType');


class Compound extends LoConstruct {

    /**
     * A compound literal
     *
     * @param fields
     */
    constructor(fields) {

        super();
        this.fields = fields;
        this.type = new ProductType(fields.map(field => field.value.type));
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'compound',
            fields: this.fields.map(field => {
                return {
                    label: field.label,
                    value: field.value.getAst()
                };
            })
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['compound'].concat(
            this.fields.map(field => {
                return [
                    field.label,
                    field.value.getTree()
                ];
            }));
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        // we don't qualify field labels

        return JS.objLiteral(this.fields.map(field => {
            return [JS.string(field.label), field.value.compile(sourceCtx)];
        }));
    }
}

module.exports = Compound;