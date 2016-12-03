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
 *
 * @param prefix
 * @param expr
 * @param suffix
 */
var __ = function (prefix, expr, suffix) {

    this.prefix = prefix;
    this.expr = expr;
    this.suffix = suffix;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'interpolation',
        left: this.prefix,
        middle: this.expr.getAst(),
        right: this.suffix
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.add(
        JS.add(JS.string(this.prefix), this.expr.compile(context)),
        JS.string(this.suffix));
};

module.exports = __;