/**
 * Created by: spurcell
 * 3/1/15
 */

"use strict";

var JsConstruct = require('./JsConstruct');
var util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @param parts     an array of strings or constructs
 * @param isResult  flag to indicate this is a result
 */
var __ = function (parts, isResult) {

    JsConstruct.call(this, parts);

    this.isResult = isResult || false;
};

// subclass extends superclass
__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;

module.exports = __;