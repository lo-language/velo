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
 */
var __ = function (parts) {

    JsConstruct.call(this, parts);
};

// subclass extends superclass
__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;

module.exports = __;