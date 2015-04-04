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
 * @param resolve
 */
var __ = function (parts, resolve) {

    JsConstruct.call(this, parts, false);

    if (resolve || resolve === undefined) {
        this.resolve(false);
    }
};

// subclass extends superclass
__.prototype = Object.create(JsConstruct.prototype);
__.prototype.constructor = __;


module.exports = __;