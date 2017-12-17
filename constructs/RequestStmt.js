/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * He who knows does not speak; he who speaks does not know. ― Laozi
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const CFNode = require('../compiler/CFNode');
const BlockingReq = require('../compiler/BlockingReq');

/**
 * A "function call" (request) statement.
 * This is a special kind of node because appending a node to it may end up
 * creating a continuation or inside a callback to the call if it's blocking.
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
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    var address = this.address.compile2(sourceCtx, targetCtx);
    var args = this.args.map(arg => {
        return arg.compile2(sourceCtx, targetCtx);
    });

    var succHandler = this.replyHandler ? this.replyHandler.compile2(sourceCtx, targetCtx) : null;
    var failHandler = this.failHandler ? this.failHandler.compile2(sourceCtx, targetCtx) : null;

    return this.blocking ?
        new BlockingReq(address, args, succHandler, failHandler) :
        new CFNode(JS.exprStmt(JS.runtimeCall('sendAsync', [
            address, JS.arrayLiteral(args), succHandler, failHandler
        ])));
};

module.exports = __;