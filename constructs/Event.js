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
const Identifier = require('./Identifier');
const CFNode = require('../compiler/CFNode');
const LoConstruct = require('./LoConstruct');


class Event extends LoConstruct {

    /**
     * An assignment statement.
     *
     * @param address   expr
     * @param args      expr
     */
    constructor(address, args) {

        super();
        this.address = address;
        this.args = args;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'event',
            address: this.address.getAst(),
            args: this.args.map(arg => arg.getAst())
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'set!',
            this.address.getTree(),
            this.args.map(arg => arg.getTree())
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param last
     */
    compile(sourceCtx, last) {

    }
}

module.exports = Event;