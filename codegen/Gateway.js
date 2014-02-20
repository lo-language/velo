/**
 * A Gateway maintains a mapping between internal addresses and external addresses.
 *
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param env
 * @private
 */
var __ = function (env) {

    this.env = env;
    this.inbox = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Accepts a message.
 *
 * @param message   an array of values
 */
__.prototype.accept = function (message) {

    // enqueue the message
    this.inbox.push(message);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Pulls the next message off the queue.
 */
__.prototype.pull = function () {

    return this.inbox.shift();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to    the address of the recipient
 * @param message
 */
__.prototype.send = function (to, message) {

    // map the message to an address and send it out
    this.env.postMessage(to, message);
};

module.exports = __;