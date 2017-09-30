/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * C-style conditional expression
 *
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 * A conditional expression
 *
 * @param predicate
 * @param consequent
 * @param alternate
 */
var __ = function (predicate, consequent, alternate) {

    this.predicate = predicate;
    this.consequent = consequent;
    this.alternate = alternate;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var result = {
        type: 'cond-expr',
        predicate: this.predicate.getAst(),
        trueVal: this.consequent.getAst()
    };

    if (this.alternate) {
        result.falseVal = this.alternate.getAst();
    }

    return result;
};


/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    var result = ['cond',
        this.predicate.getTree(),
        this.consequent.getTree(),
    ];

    if (this.alternate) {
        result.push(this.alternate.getTree());
    }

    return result;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.condExpr(
        this.predicate.compile(context),
        this.consequent.compile(context),
        this.alternate.compile(context));
};




/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    return JS.condExpr(
        this.predicate.compile2(sourceCtx, targetCtx),
        this.consequent.compile2(sourceCtx, targetCtx),
        this.alternate.compile2(sourceCtx, targetCtx));
};

module.exports = __;