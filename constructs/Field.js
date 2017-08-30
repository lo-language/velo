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
 * A record literal field definition
 *
 * @param label
 * @param value
 */
var __ = function (label, value) {

    this.label = label;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'field',
        label: this.label,
        value: this.value.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'field',
        this.label,
        this.value.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // we don't qualify field labels
    return [JS.string(this.label), this.value.compile(context)];
};

module.exports = __;