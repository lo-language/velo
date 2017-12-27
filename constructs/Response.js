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
const CFNode = require('../compiler/CFNode');
const TerminalNode = require('../compiler/TerminalNode');


/**
 * A response statement
 *
 * @param type
 * @param args
 */
var __ = function (type, args) {

    this.type = type;
    this.args = args || [];
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'response',
        channel: this.type,
        args: this.args.map(arg => arg.getAst())
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'response',
        this.type,
        this.args.map(arg => arg.getTree())
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    if (sourceCtx.canRespond() == false) {
        throw new Error("can't respond from this context");
    }

    var args = JS.arrayLiteral(this.args.map(arg => arg.compile(sourceCtx, targetCtx)));

    var response = this.type == 'reply' ?
        JS.exprStmt(JS.runtimeCall('succ', [args])) :
        JS.exprStmt(JS.runtimeCall('fail', [args]));

    // a response should compile to a non-appendable JS stmt list

    // var following = sourceCtx.getFollowing();
    //
    // // if the following is a connector, include it, otherwise we can drop it
    // sourceCtx.setFollowing(null);
    //
    // if (following == null) {
    //     return response;
    // }

    // only if we're in a non-async branch context do we need the return
    // if the following is an async connector, we don't need the return
    // we could optimize to only include the return if necessary

    return new CFNode(response).append(new TerminalNode(JS.return()));
};

module.exports = __;