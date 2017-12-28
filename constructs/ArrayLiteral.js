/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
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


class ArrayLiteral extends LoConstruct {

    constructor (elements) {

        super();

        this.elements = elements;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'array',
            elements: this.elements.map(elem => elem.getAst())
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['array'].concat(this.elements.map(elem => elem.getTree()));
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.arrayLiteral(
            this.elements.map(item => {
                return item.compile(sourceCtx, targetCtx);
            }));
    }
}

module.exports = ArrayLiteral;