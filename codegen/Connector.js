/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A connector is a chunk of JS that carries control flow from one location to another either
 * actively as a function call or passively, as a no-op to just let statements flow naturally.
 *
 * A connector renders its call if and only if
 *
 * - its context is discontinous
 * - there's a logically following statement
 *
 * Created by seth on 1/2/17.
 */

"use strict";

const JS = require('./JsPrimitives');


var __ = function (context) {

    this.call = null;
    this.parent = null;
};


__.prototype.setCall = function (call) {
    this.call = call;
};


__.prototype.renderTree = function () {

    if (this.parent) {
        return this.parent.renderTree();
    }

    if (this.call) {
        return this.call.renderTree();
    }
};


__.prototype.renderJs = function () {

    if (this.parent) {
        return this.parent.renderJs();
    }

    if (this.call) {
        return this.call.renderJs();
    }

    return '';
};


/**
 * Makes this connector proxy to the given one.
 *
 * @param connector
 */
__.prototype.proxyTo = function (connector) {
    this.parent = connector;
};

module.exports = __;