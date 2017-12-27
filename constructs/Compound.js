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
 * A compound literal
 *
 * @param fields
 */
var __ = function (fields) {

    this.fields = fields;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'compound',
        fields: this.fields.map(field => field.getAst())
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return ['compound'].concat(
        this.fields.map(field => field.getTree()));
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    return JS.objLiteral(this.fields.map(field => {
        return field.compile(sourceCtx, targetCtx);
    }));
};

module.exports = __;