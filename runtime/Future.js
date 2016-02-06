"use strict";

/**
 * A future is a way to separate production of a result from consumption of it.
 *
 * Either producer or consumer can be ready first, but when both are ready,
 * the process moves forward.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Models an Exa future.
 */
var __ = function () {

    this.target = null;
    this.reply = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param target
 */
__.prototype.onResolve = function (target) {

    if (this.reply) {
        target(this.reply);
    }
    else {
        this.target = target;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param reply
 */
__.prototype.resolve = function (reply) {

    if (this.target) {
        this.target(reply);
    }
    else {
        this.reply = reply;
    }
};

module.exports = __;