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
 *
 * @param left
 * @param infix
 * @param right
 */
var __ = function (left, infix, right) {

    this.left = left;
    this.infix = infix;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'dynastring',
        left: this.left.getAst(),
        middle: this.infix,
        right: this.right.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.add(
        JS.add(this.left.compile(context), JS.string(this.infix)),
        this.right.compile(context));
};

module.exports = __;