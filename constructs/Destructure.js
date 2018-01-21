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

const LoConstruct = require('./LoConstruct');


class Destructure extends LoConstruct {

    /**
     * A destructuring assignment.
     */
    constructor(names) {

        super();
        this.names = names;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'destructure',
            fields: this.names
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['destructure'].concat(this.names);
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

    }
}

module.exports = Destructure;