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
    this.name = id;
};


/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'modref',
        namespace: this.namespace,
        id: this.name
    };
};

/**
 * Compiles this module to JS.
 */
__.prototype.compile = function (context) {

    return context.getModuleRef(this.namespace, this.name);
};


module.exports = __;