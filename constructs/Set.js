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


class Set extends LoConstruct {

    /**
     * An set literal
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
            type: 'set',
            elements: this.elements.map(elem => elem.getAst())
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['set-literal'].concat(
            this.elements.map(elem => elem.getTree()));
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        var elements = this.elements.map(item => {
            return [item.compile(sourceCtx, targetCtx), JS.bool(true)];
        });

        // tag this object as a Lo set
        // we can get away with this because Object.defineProperty returns the object we give it :-)

        return JS.fnCall(
            JS.select(JS.ID('Object'), 'defineProperty'), [
                JS.objLiteral(elements),
                JS.string("__LO_SET"),
                JS.objLiteral([
                    [JS.ID('value'), JS.bool("true")]
                ])
            ]);
    }
}

module.exports = Set;