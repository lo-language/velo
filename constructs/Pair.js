/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const LoConstruct = require('./LoConstruct');


class Pair extends LoConstruct {

    /**
     * A set pair literal
     *
     * @param key
     * @param value
     */
    constructor(key, value) {

        super();
        this.key = key;
        this.value = value;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'pair',
            key: this.key.getAst(),
            value: this.value.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            this.key.getTree(),
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

        return [this.key.compile(sourceCtx, targetCtx), this.value.compile(sourceCtx, targetCtx)];
    }
}


module.exports = Pair;