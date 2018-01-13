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
const Type = require('../compiler/Type');


class Number extends LoConstruct {

    /**
     * A literal number
     *
     * @param value     a string representation of the number
     */
    constructor(value) {

        super();
        this.value = value;
        this.type = Type.NUM;
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
            type: 'number',
            val: this.value
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return this.value;
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.num(this.value);
    }
}

module.exports = Number;