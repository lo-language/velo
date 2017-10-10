/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Il semble que la perfection soit atteinte non quand il n'y a plus rien
 * à ajouter, mais quand il n'y a plus rien à retrancher.
 =============================================================================*/

"use strict";

const RequestEnv = require('../codegen/RequestEnv');

/**
 * A "function call" (request) expression
 *
 * @param address
 * @param args
 * @param block
 */
var __ = function (address, args, block) {

    this.address = address;
    this.args = args;
    this.block = block || false;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'request_expr',
        address: this.address.getAst(),
        args: this.args.map(arg => arg.getAst()),
        blocking: this.block
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'apply',
        this.address.getTree(),
        this.args.map(arg => arg.getTree()),
        this.block
    ];
};

/**
 * Compiles this node to JS in the given context, injecting a wrapper into the context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var target = this.address.compile(context);

    var args = this.args.map(arg => {
        return arg.compile(context);
    });

    // get a placeholder
    // we push a request into the context whether sync or async
    var reqEnv = new RequestEnv(target, args, this.block);

    context.pushEnv(reqEnv);

    return reqEnv.getRef();
};




/**
 * Compiles this node to JS in the given context, injecting a wrapper into the context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    var address = this.address.compile2(sourceCtx, targetCtx);

    var args = this.args.map(arg => {
        return arg.compile2(sourceCtx, targetCtx);
    });

    // gets a temp var and returns it
    return targetCtx.pushRequest(address, args, this.block);
};

module.exports = __;