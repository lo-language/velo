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

class Nil extends LoConstruct {
    
    /**
     * A literal boolean
     */
    constructor() {

        super();
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        // ??? might not want to return an actual bool here - number literals are kept as strings

        return {
            type: 'nil'
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
     */
    compile(sourceCtx) {

        return JS.ID('undefined'); // hack
    }
}

module.exports = Nil;
