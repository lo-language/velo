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
const MapType = require('../compiler/MapType');
const Type = require('../compiler/Type');


class MapLiteral extends LoConstruct {

    /**
     * A map literal
     *
     * @param pairs
     */
    constructor(pairs) {

        super();
        this.elements = pairs;

        var keyType, valType;

        pairs.forEach(el => {

            if (keyType == null) {
                keyType = el.key.type;
                valType = el.value.type;
            }
        });

        this.type = new MapType(keyType || Type.DYN, valType || Type.DYN);
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'map',
            elements: this.elements.map(elem => {
                return { key: elem.key.getAst(), value: elem.value.getAst() };
            })
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'map-literal',
            this.elements.map(elem => {
                return [elem.key.getTree(), elem.value.getTree()]
            })
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        return JS.objLiteral(this.elements.map(elem => {
            return [elem.key.compile(sourceCtx), elem.value.compile(sourceCtx)];
        }));
    }
}

module.exports = MapLiteral;