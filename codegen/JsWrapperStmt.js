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
 * A node in the JS control flow.
 * Models control flow in the target language as a digraph.
 * Basic flow is supported as a doubly-linked list.
 * Branching statements are captured as child nodes.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');

/**
 *
 * @param address
 * @param args
 * @param name
 */
var __ = function (address, args, name) {

    this.prev = null;   // previous statement node
    this.next = null;   // next stmt node
    this.asyncFlow = true;

    this.address = address;
    this.args = args;
    this.name = name;
};


/**
 * Sets the next statement node to the given node.
 *
 * @param next  ControlFlowNode to follow this one
 */
__.prototype.setNext = function (next) {

    this.next = next;
    next.prev = this;
};


/**
 */
__.prototype._getStmt = function () {

    return JS.stmtList(JS.exprStmt(JS.runtimeCall('sendAndBlock', [
            this.address, JS.arrayLiteral(this.args),
            JS.fnDef([this.name], this.next),
            JS.NULL
        ])));
};


/**
 */
__.prototype.renderTree = function () {

    return this._getStmt().renderTree();
};


/**
 */
__.prototype.renderJs = function () {

    return this._getStmt().renderJs();
};


// without inheritance, we can't call pushrequest in here? how's it working, then?
// we're always calling pushreq on the wrapped stmt, dummy!


module.exports = __;
