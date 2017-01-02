/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Combines a context and a construct.
 *
 * Created by seth on 12/25/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const Context = require('./Context');
const Connector = require('./Connector');


var __ = function (parent) {

    Context.call(this, parent);

    this.connector = new Connector();

    this.discontinuous = false;
};

__.prototype = Object.create(Context.prototype);
__.prototype.constructor = Context;


/**
 */
__.prototype.getConnector = function () {

    return this.connector;
};


__.prototype.flagDiscontinuity = function () {

    this.discontinuous = true;

    // grab the parent's tail and make a continuation out of it
    this.contRef = this.parent.wrapFollowing();

    if (this.contRef) {
        this.connector.setContinuation(this.contRef);
    }
    else {
        this.contRef = JS.NULL;
    }
};


__.prototype.isDiscontinuous = function () {

    return this.discontinuous;
};


__.prototype.getBranchContext = function () {

    return this;
};


module.exports = __;