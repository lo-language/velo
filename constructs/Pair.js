/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A set pair literal
 *
 * @param key
 * @param value
 */
var __ = function (key, value) {

    this.key = key;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'pair',
        key: this.key.getAst(),
        value: this.value.getAst()
    };
};


/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        this.key.getTree(),
        this.value.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    return [this.key.compile(sourceCtx, targetCtx), this.value.compile(sourceCtx, targetCtx)];
};

module.exports = __;