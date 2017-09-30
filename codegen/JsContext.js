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



module.exports = __;
