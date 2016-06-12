/**
 * Models a sync function call so we can recognize and handle them in compilation.
 */

"use strict";

/**
 * @param address
 * @param args
 * @param subsequent
 * @param contingency
 */
var __ = function (address, args, subsequent, contingency) {

    this.address = address;
    this.args = args || [];
    this.subsequent = subsequent;
    this.contingency = contingency;
};

module.exports = __;