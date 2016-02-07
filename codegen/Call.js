/**
 * Models a function call so we can recognize and handle them in compilation.
 */

"use strict";

var JsConstruct = require('./JsConstruct');

/**
 * @param address
 * @param args
 * @param async  true if this call is asynchronous
 */
var __ = function (address, args, async) {

    this.address = address;
    this.args = args || [];
    this.async = async;
};

module.exports = __;