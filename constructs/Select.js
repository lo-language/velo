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
 * A record select (dot operator) expression
 *
 * @param recordExpr
 * @param field
 */
var __ = function (recordExpr, field) {

    this.recordExpr = recordExpr;
    this.field = field;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'select',
        record: this.recordExpr.getAst(),
        field: this.field
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'select',
        this.recordExpr.getTree(),
        this.field
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    return JS.select(this.recordExpr.compile(sourceCtx, targetCtx), this.field);
};

module.exports = __;