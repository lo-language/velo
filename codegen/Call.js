/**
 * Models a function call so we can recognize and handle them in compilation.
 */

"use strict";

/**
 * @param address
 * @param args
 */
var __ = function (address, args) {

    this.address = address;
    this.args = args || [];
};

module.exports = __;