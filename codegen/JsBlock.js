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
 * The root of a list of statements.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');

/**
 */
var __ = function () {

    this.next = null;   // next stmt node
    this.asyncFlow = false;
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
__.prototype.renderTree = function () {

    if (this.next) {
        return this.next.renderTree();
    }

    return [ 'stmtList' ];
};


/**
 */
__.prototype.renderJs = function () {

    if (this.next) {
        return this.next.renderJs();
    }

    return '';
};


module.exports = __;
