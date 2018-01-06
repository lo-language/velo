/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * Coerces the given expression to the given type.
 *
 * @param expr
 * @param type
 */
var __ = function (expr, type) {

    this.expr = expr;
    this.type = type || 'string';
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'coercion',
        expr: this.expr.getAst(),
        coerce: this.type
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'coercion',
        this.expr.getTree(),
        this.type
    ];
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.hasType = function (type) {

    return type == this.type;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    if (this.type == 'string') {
        return JS.fnCall(JS.ID('String'), [this.expr.compile(sourceCtx, targetCtx)]);
    }

    throw new Error('we only coerce to strings at the moment, baby');
};

module.exports = __;