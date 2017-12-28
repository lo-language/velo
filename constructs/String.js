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


class String extends LoConstruct {

    /**
     * A literal string
     */
    constructor(value) {

        super();

        this.value = value;
    }

    /**
     * Accessor
     *
     * @returns {*}
     */
    getValue() {

        return this.value;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'string',
            val: this.value
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['string', this.value];
    }

    /**
     *
     */
    hasType(type) {

        return type == 'string';
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * todo break these out into their own classes?
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.string(this.value);
    }
}

module.exports = String;