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
 * Models a JS statement list.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');
const Request = require('./RequestContext');


/**
 *
 * @param parent        the parent context, if any
 * @param head
 * @param tail
 */
var __ = function (parent) {

    this.parent = parent;
    this.reqCount = 0;
};

__.prototype.populate = function (head, tail) {

    // todo - fold the JS primitive into this class
    this.js = JS.stmtList(head, tail);
};

__.prototype.renderTree = function () {

    return this.js.renderTree();
};

__.prototype.renderJs = function () {

    return this.js.renderJs();
};


/**
 * Pushes an enclosing request as the parent of this statement.
 * Can be called multiple times for a single statement.
 *
 * @param address   the JS expr for the address
 * @param args
 * @param block
 */
__.prototype.pushRequest = function (address, args, block) {

    // we need to inform our parent that this has happened, and propagate back to the trunk
    // or we can just say we're discontinuous...

    var id = this.reqCount++;
    var name = 'res' + id;

    // create a request and insert it into the tree as the current statement's parent
    this.parent = new Request(address, args, block, name, this.parent);

    return JS.subscript(JS.ID(name), JS.num('0'));
};


module.exports = __;
