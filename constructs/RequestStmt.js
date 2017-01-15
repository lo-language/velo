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
const BranchContext = require('../codegen/BranchContext');


/**
 * A "function call" (request) expression
 *
 * @param address
 * @param args
 * @param replyHandler
 * @param failHandler
 * @param blocking
 */
var __ = function (address, args, replyHandler, failHandler, blocking) {

    this.address = address;
    this.args = args;
    this.replyHandler = replyHandler;
    this.failHandler = failHandler;
    this.blocking = blocking;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'request_stmt',
        address: this.address.getAst(),
        args: this.args.map(arg => arg.getAst()),
        subsequent: this.replyHandler ? this.replyHandler.getAst() : undefined,
        contingency: this.failHandler ? this.failHandler.getAst() : undefined,
        blocking: this.blocking
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var args = this.args.map(arg => {
        return arg.compile(context);
    });

    var nonBlocking = JS.exprStmt(
        JS.runtimeCall('sendMessage', [
            this.address.compile(context), JS.arrayLiteral(args),
            this.replyHandler ? this.replyHandler.compile(context) : JS.NULL,
            this.failHandler ? this.failHandler.compile(context) : JS.NULL
        ]));

    if (this.blocking == false) {
        return nonBlocking;
    }

    // add the continuation to each handler or if there's no
    // handler, just use the continuation as the branch

    var replyHandler, failHandler;

    var contRef = context.wrapFollowing();
    var contCall = contRef ? JS.stmtList(JS.exprStmt(JS.fnCall(contRef, []))) : null;

    // we just drop in the call as the connector since we know the branches are async
    var bc = new BranchContext(context, contCall);

    if (this.replyHandler) {
        replyHandler = this.replyHandler.compile(bc);
    }
    else {
        replyHandler = contRef || JS.NULL;
    }

    if (this.failHandler) {
        failHandler = this.failHandler.compile(bc);
    }
    else {
        failHandler = contRef || JS.NULL;
    }

    return JS.exprStmt(
            JS.runtimeCall('sendMessage', [
                this.address.compile(context), JS.arrayLiteral(args), replyHandler, failHandler]));
};

module.exports = __;