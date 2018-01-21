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

class Subscribe extends LoConstruct {

    /**
     */
    constructor(event, handler) {

        super();

        this.event = event;
        this.handler = handler;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'subscribe',
            event: this.event.getAst(),
            handler: this.handler.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'subscribe',
            this.event.getTree(),
            this.handler.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

    }
}

module.exports = Subscribe;