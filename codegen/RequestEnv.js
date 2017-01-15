/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * An environment for an async request that wraps its statements in a callback.
 *
 * Created by seth on 12/17/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


var __ = function (target, args, blocking) {

    this.target = target;
    this.args = args;
    this.blocking = blocking;
};


__.prototype.setId = function (id) {

    this.placeholderName = 'res' + id;
};


/**
 * Returns a reference to the request result.
 */
__.prototype.getRef = function () {

    return JS.subscript(JS.ID(this.placeholderName), JS.num('0'));
};


__.prototype.wrap = function (stmtList) {

    // todo should this return a SL or a stmt?
    // todo we need access to the context here so we can grab the following stmts

    return JS.exprStmt(
            JS.runtimeCall('sendMessage', [
                this.target, JS.arrayLiteral(this.args),
                JS.fnDef([this.placeholderName], stmtList),
                JS.NULL
            ]));
};

module.exports = __;