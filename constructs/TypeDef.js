/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * C-style conditional expression
 *
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class TypeDef extends LoConstruct {

    /**
     *
     * @param id
     * @param spec
     */
    constructor(id, spec) {

        super();
        this.name = id;
        this.spec = spec;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type:   'typedef',
            name:   this.name,
            def:    this.spec
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['typedef'];
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


module.exports = TypeDef;