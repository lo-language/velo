/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
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


/**
 * A literal string
 */
var __ = function (value) {

    this.value = value;
};

/**
 * Accessor
 *
 * @returns {*}
 */
__.prototype.getValue = function () {

    return this.value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'string',
        val: this.value
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return ['string', this.value];
};

/**
 *
 */
__.prototype.hasType = function (type) {

    return type == 'string';
};

/**
 * Compiles this node to JS in the given context.
 *
 * todo break these out into their own classes?
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    return JS.string(this.value);
};

module.exports = __;