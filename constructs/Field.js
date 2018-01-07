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


class Field extends LoConstruct {

    /**
     * A record literal field definition
     *
     * @param label
     * @param value
     */
    constructor(label, value) {

        super();
        this.label = label;
        this.value = value;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'field',
            label: this.label,
            value: this.value.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'field',
            this.label,
            this.value.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        // we don't qualify field labels
        return [JS.string(this.label), this.value.compile(sourceCtx, targetCtx)];
    }
}

module.exports = Field;