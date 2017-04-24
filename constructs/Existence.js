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
 * A runtime existence check operator.
 *
 * @param expr      a nominal expression
 * @param undef     true if checking for non-existence
 */
var __ = function (expr, undef) {

    this.expr = expr;
    this.undef = undef;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: this.undef ? 'undefined' : 'defined',
        expr: this.expr.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return this.undef ?
        JS.strictEqual(JS.typeof(this.expr.compile(context)), JS.string('undefined')) :
        JS.strictNotEqual(JS.typeof(this.expr.compile(context)), JS.string('undefined'));
};

module.exports = __;