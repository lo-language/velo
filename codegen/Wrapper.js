/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by spurcell on 8/21/16.
 */

"use strict";

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');

/**
 * A statement that wraps following statements in a blocking call/resolve.
 *
 * @param target
 * @param args
 * @param placeholderName
 * @private
 */
var __ = function (target, args, placeholderName) {

    this.target = target;
    this.args = args;
    this.replyHandler = new JsFunction([placeholderName], new JsStmt());
};

/**
 * Attaches a JS statement to this wrapper by appending to its replyHandler body.
 *
 * @param stmt
 */
__.prototype.attach = function (stmt) {

    this.replyHandler.append(stmt);

    return this;
};

/**
 *
 */
__.prototype._getAst = function () {

    return new JsStmt(
        JS.exprStmt(
            JS.runtimeCall('sendMessage',
                [
                    this.target,
                    JS.arrayLiteral(this.args),
                    this.replyHandler._getAst(),
                    JS.NULL
                ]
            )));
};

__.prototype.renderTree = function () {

    return this._getAst().renderTree();
};

__.prototype.renderJs = function () {

    var ast = this._getAst();

    return ast ? ast.renderJs() : '';
};

module.exports = __;