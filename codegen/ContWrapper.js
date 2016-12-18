/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Your task is not to foresee the future, but to enable it.
 =============================================================================*/

/**
 * A dynamic statement list that if it has a tail, wraps its tail in a
 * continuation that can be called from callbacks, otherwise renders a simple form.
 *
 * Created by seth on 12/17/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


/**
 *
 * @param name
 * @param headA     head to use with no tail
 * @param headB     head to use with a tail
 * @private
 */
var __ = function (name, headA, headB) {

    this.name = name;
    this.headA = headA;
    this.headB = headB;
    this.tail = null;
};


__.prototype._render = function () {

    // renders to a stmtlist of the head followed by a tail
    // of a continuation wrapping the tail

    if (this.tail) {

        return JS.stmtList(this.headB,
            JS.stmtList(JS.fnDef([], this.tail, this.name)));
    }

    return JS.stmtList(this.headA, null);
};


/**
 *
 */
__.prototype.renderTree = function () {

    return this._render().renderTree();
};


/**
 *
 */
__.prototype.renderJs = function () {

    return this._render().renderJs();
};


/**
 * Appends the given statement list to the end of this statement list
 * (if it's not terminated). This is a mutating call.
 *
 * @param stmtList
 */
__.prototype.append = function (stmtList) {

    if (this.tail) {
        this.tail.append(stmtList);
        return;
    }

    this.tail = stmtList;
};

module.exports = __;