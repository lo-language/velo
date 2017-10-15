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
 * A "function call" (request) statement
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
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'request',
        this.address.getTree(),
        this.args.map(arg => arg.getTree()),
        this.replyHandler ? this.replyHandler.getTree() : null,
        this.failHandler ? this.failHandler.getTree() : null,
        this.blocking
    ];
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

    if (this.blocking == false) {

        return JS.exprStmt(
            JS.runtimeCall('sendAsync', [
                this.address.compile(context), JS.arrayLiteral(args),
                this.replyHandler ? this.replyHandler.compile(context) : JS.NULL,
                this.failHandler ? this.failHandler.compile(context) : JS.NULL
            ]));
    }

    if (context.getFollowing() == null) {

        return JS.exprStmt(
            JS.runtimeCall('sendAndBlock', [
                this.address.compile(context), JS.arrayLiteral(args),
                this.replyHandler ? this.replyHandler.compile(context) : JS.NULL,
                this.failHandler ? this.failHandler.compile(context) : JS.NULL
            ]));
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
            JS.runtimeCall('sendAndBlock', [
                this.address.compile(context), JS.arrayLiteral(args), replyHandler, failHandler]));
};



/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    return this.blocking ?
        this.compileSync(sourceCtx, targetCtx) :
        this.compileAsync(sourceCtx, targetCtx);
};


/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compileSync = function (sourceCtx, targetCtx) {

    var address = this.address.compile2(sourceCtx, targetCtx);
    var args = this.args.map(arg => {
        return arg.compile2(sourceCtx, targetCtx);
    });
    var succHandler = null;
    var failHandler = null;

    if (this.replyHandler) {

        // maybe call it controlFlow instead of targetCtx?
        // could pass in the replyhandler logic...

        // how do we indicate flow is broken here?

        var succBranch = targetCtx.branch();
        succHandler = this.replyHandler.compile2(sourceCtx, succBranch);
    }

    if (this.failHandler) {

        var failBranch = targetCtx.branch();
        failHandler = this.failHandler.compile2(sourceCtx, failBranch);
    }

    return JS.runtimeCall('sendAndBlock', [
        address, JS.arrayLiteral(args), succHandler, failHandler
    ]);
};


/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compileAsync = function (sourceCtx, targetCtx) {

    var address = this.address.compile2(sourceCtx, targetCtx);
    var args = this.args.map(arg => {
        return arg.compile2(sourceCtx, targetCtx);
    });
    var succHandler = null;
    var failHandler = null;

    if (this.replyHandler) {

        var succBranch = targetCtx.createChild();
        succHandler = this.replyHandler.compile2(sourceCtx, succBranch);
    }

    if (this.failHandler) {

        var failBranch = targetCtx.createChild();
        failHandler = this.failHandler.compile2(sourceCtx, failBranch);
    }

    return JS.runtimeCall('sendAsync', [
        address, JS.arrayLiteral(args), succHandler, failHandler
    ]);
};

module.exports = __;