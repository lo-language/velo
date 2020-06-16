/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A declaration is exactly like a typedef except we're not creating a new type,
 * we're specifying the type of an identifier to be defined elsewhere.
 *
 * Created by seth on 2/4/18.
 */

"use strict";

const LoConstruct = require('./LoConstruct');


class Declaration extends LoConstruct {

    /**
     * A declaration
     */
    constructor(id, typespec) {

        super();
        this.id = id;
        this.spec = typespec;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'declaration',
            id: this.id,
            spec: this.spec
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return ['declaration'];
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

module.exports = Declaration;