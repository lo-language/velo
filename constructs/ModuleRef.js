/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * The machine does not isolate us from the great problems of nature but
 * plunges us more deeply into them.
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class ModuleRef extends LoConstruct {

    /**
     * A module reference
     */
    constructor(namespace, id) {

        super();
        this.namespace = namespace;
        this.id = id;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'modref',
            namespace: this.namespace,
            id: this.id
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'modref',
            this.namespace,
            this.id
        ];
    }

    /**
     * Compiles this module reference to JS.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        // will throw if namespace is unknown
        sourceCtx.registry.include(this.namespace || '__local', this.id);

        // module namespaces are injected as globals at load-time
        // todo revisit in terms of target context manipulation
        return JS.select(JS.ID(this.namespace || '__local'), this.id);
    }

    /**
     * Returns canonicalized module reference.
     */
    getCanonical () {

        return {
            ns: (this.namespace || '__local'),
            name: this.id,
            ref: (this.namespace || '__local') + '::' + this.id
        };
    }
}

module.exports = ModuleRef;