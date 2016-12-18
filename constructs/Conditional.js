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
 * A conditional statement.
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
        type: 'conditional',
        predicate: this.predicate.getAst(),
        consequent: this.consequent.getAst()
    };

    if (this.alternate) {
        result.alternate = this.alternate.getAst();
    }

    return result;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // if the predicate is sync that's easy because we always want to resolve it
    // the trick is sync logic in the branches because we only want to resolve if
    // necessary

    // todo - is there a bug where we're compiling statements within statements?
    // todo same bug in iterations!?
    // since we're in a stmt here that might have async bits, and then our blocks might have bits?
    // we DO need to support more than one level of stmt nesting

    var predicate = this.predicate.compile(context);
    var consequent = this.consequent.compile(context);
    var alternate = this.alternate ? this.alternate.compile(context) : null;

    var async = consequent.async;

    if (alternate && alternate.async) {
        async = true;
    }

    // shortcut if none of the bits are async
    if (async || context.isWrapping()) {

        // add continuation to both branches

        var contName = context.wrapTail();

        consequent.appendStmt(JS.exprStmt(JS.fnCall(JS.ID(contName), [])));
        consequent.appendStmt(JS.exprStmt(JS.fnCall(JS.ID(contName), [])));

        var stmt = JS.cond(predicate, consequent, alternate);

        stmt.async = true;

        return stmt;
    }

    return JS.cond(predicate, consequent, alternate);
};

module.exports = __;