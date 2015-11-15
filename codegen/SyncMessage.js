/**
 * Models a sync message so we can recognize and handle them in compilation.
 */

"use strict";

var JsConstruct = require('./JsConstruct');

/**
 * Models a synchronous message.
 *
 * @param address
 * @param args
 * @private
 */
var __ = function (address, args) {

    this.address = address;
    this.args = args || [];
};

module.exports = __;