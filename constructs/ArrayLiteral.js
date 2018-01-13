/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
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
const ArrayType = require('../compiler/ArrayType');
const Type = require('../compiler/Type');


class ArrayLiteral extends LoConstruct {

    constructor (elements) {

        super();

        // let's do a quick scan of the types to see if they're homogeneous
        // todo what if the array is empty?? just assign it dyn?

        var type;

        elements.forEach(el => {

            if (type == null) {
                type = el.type;
            }
            else if (el.type.toString() != type.toString()) {
                console.log('inconsistent types in array literal');
            }
        });

        this.elements = elements;
        this.type = new ArrayType(type || Type.DYN);
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