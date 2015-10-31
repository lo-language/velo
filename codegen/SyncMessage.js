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
    this.placeholder = '??';
};

/**
 * Returns a message construct wrapped around the
 *
 * @param blocked   array of JsConstruct parts
 * @return {*}
 */
__.prototype.wrap = function (blocked) {

    return JsConstruct.buildMessage(
        this.address, this.args, blocked, null, this.placeholder, true);
};


module.exports = __;