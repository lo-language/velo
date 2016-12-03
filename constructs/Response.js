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
const JsStmt = require('../codegen/JsStmt');


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
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    if (context.canRespond() == false) {
        throw new Error("can't respond from this context");
    }

    var args = JS.arrayLiteral(this.args.map(arg => arg.compile(context)));

    // todo - only render the return if there are following statements? but then shouldn't we throw a compiler warning?

    return new JsStmt(JS.exprStmt(JS.runtimeCall('respond', [JS.string(this.type), args]))).attach(JsStmt.return());
};

module.exports = __;