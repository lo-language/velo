/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * The machine does not isolate us from the great problems of nature but
 * plunges us more deeply into them.
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');

/**
 * A module reference
 */
var __ = function (namespace, id) {

    this.namespace = namespace;
    this.id = id;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'modref',
        namespace: this.namespace,
        id: this.id
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'modref',
        this.namespace,
        this.id
    ];
};

/**
 * Compiles this module reference to JS.
 */
__.prototype.compile = function (context) {

    // will throw if namespace is unknown
    context.registry.include(this.namespace || '__local', this.id);

    // module namespaces are injected as globals at load-time
    return JS.select(JS.ID(this.namespace || '__local'), this.id);
};




/**
 * Compiles this module reference to JS.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    // will throw if namespace is unknown
    sourceCtx.registry.include(this.namespace || '__local', this.id);

    // module namespaces are injected as globals at load-time
    // todo revisit in terms of target context manipulation
    return JS.select(JS.ID(this.namespace || '__local'), this.id);
};

module.exports = __;