/**
 * Created by: spurcell
 * 2/12/14
 *
 * an inbox takes messages and maps them onto tasks
 */

"use strict";

/**
 *
 * @param env
 * @private
 */
var __ = function (env) {

    this.messages = [];
};

__.prototype.receive = function (message) {

    this.messages.push(message);
};

/**
 * Returns the next message with its context.
 */
__.prototype.pull = function () {

    return;
};

