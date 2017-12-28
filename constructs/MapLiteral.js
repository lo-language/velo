/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class MapLiteral extends LoConstruct {

    /**
     * An map literal
     *
     * @param elements
     */
    constructor(elements) {

        super();
        this.elements = elements;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'map',
            elements: this.elements.map(elem => elem.getAst())
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'map-literal',
            this.elements.map(elem => elem.getTree())
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.objLiteral(this.elements.map(item => {
            return item.compile(sourceCtx, targetCtx);
        }));
    }
}

module.exports = MapLiteral;