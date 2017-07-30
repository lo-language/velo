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
const Connector = require('../codegen/Connector');


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
 * @param context
 */
__.prototype.compile = function (context) {

    if (context.canRespond() == false) {
        throw new Error("can't respond from this context");
    }

    var args = JS.arrayLiteral(this.args.map(arg => arg.compile(context)));

    var response = this.type == 'reply' ?
        JS.exprStmt(JS.runtimeCall('succ', [args])) :
        JS.exprStmt(JS.runtimeCall('fail', [args]));

    // a response should compile to a non-appendable JS stmt list

    var following = context.getFollowing();

    // if the following is a connector, include it, otherwise we can drop it
    context.setFollowing(null);

    if (following == null) {
        return response;
    }

    // only if we're in a non-async branch context do we need the return
    // if the following is an async connector, we don't need the return

    return JS.stmtList(response, JS.stmtList(JS.return()));
};

module.exports = __;