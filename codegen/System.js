/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Machine = require('./Machine');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @private
 */
var __ = function () {

    this.machines = [];
    this.nextId = 0;

    this.messages = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new machine in the system.
 *
 * @param fn    the function to run to process each message
 * @return {Number}
 */
__.prototype.createMachine = function (fn) {

    var id = this.nextId++;

    this.machines[id] = new Machine(this, fn);

    return id;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to
 * @param message
 */
__.prototype.sendMessage = function (to, message) {

    this.messages.push([to, message]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.run = function () {

    // process all messages

    var envelope, recipient;

    while (this.messages.length > 0) {

        envelope = this.messages.shift();

        recipient = this.machines[envelope[0]];

        // validate the recipient address

        if (recipient == null) {
            throw new Error("couldn't find machine with address " + envelope[0]);
        }

        recipient.process(envelope[1]);
    }
};

module.exports = __;