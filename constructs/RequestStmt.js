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
const ContWrapper = require('../codegen/ContWrapper');


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

    // return a variant stmt list

    var contName = context.wrapTail();

    // add the continuation to each handler or if there's no
    // handler, just use the continuation as the branch

    var replyHandler, failHandler;

    if (this.replyHandler) {
        replyHandler = this.replyHandler.compile(context);
        replyHandler.append(JS.stmtList(JS.exprStmt(JS.fnCall(JS.ID(contName), []))));
    }
    else {
        replyHandler = JS.ID(contName);
    }

    if (this.failHandler) {
        failHandler = this.failHandler.compile(context);
        failHandler.append(JS.stmtList(JS.exprStmt(JS.fnCall(JS.ID(contName), []))));
    }
    else {
        failHandler = JS.ID(contName);
    }

    var blocking = JS.exprStmt(
            JS.runtimeCall('sendMessage', [
                this.address.compile(context), JS.arrayLiteral(args), replyHandler, failHandler]));

    blocking.async = true;

    return new ContWrapper(contName, nonBlocking, blocking);
};

module.exports = __;