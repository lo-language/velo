/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Success is finding something you really like to do and caring enough about it
 * to do it well.
 =============================================================================*/

/**
 * Target-side compilation context.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');
const Connector = require('./Connector');


/**
 *
 * @param parent    the parent context, if any
 */
var __ = function (parent) {

    this.parent = parent;
    this.requestStack = [];
    this.reqCount = 0;

    this.symbols = {};
};


/**
 * Declares a variable in this context.
 *
 * @param name
 */
__.prototype.declareVar = function (name) {

    this.symbols['$' + name] = {type: 'var', name: name};
};


/**
 * Declares a variable in this context.
 *
 * @param address   the JS expr for the address
 * @param args
 */
__.prototype.pushRequest = function (address, args) {

    // we could push a new context into the target context stack
    // or push a statement or something onto a stack

    var id = this.reqCount++;
    var name = 'res' + id;

    this.requestStack.push({address: address, args: args, name: name});

    return JS.subscript(JS.ID(name), JS.num('0'));
};


__.prototype.popRequests = function (stmtList) {

    if (this.requestStack.length == 0) {
        return stmtList;
    }

    var req = this.requestStack.pop();

    return this.popRequests(JS.stmtList(JS.exprStmt(
        JS.runtimeCall('sendAndBlock', [
            req.address, JS.arrayLiteral(req.args),
            JS.fnDef([req.name], stmtList),
            JS.NULL
        ]))));
};


module.exports = __;
