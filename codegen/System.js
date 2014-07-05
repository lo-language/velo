/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Obj = require('./Obj');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @private
 */
var __ = function () {

    this.objects = [];
    this.nextId = 0;

    this.messages = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new object in the system.
 *
 * @param fn    the function to run to process each message
 * @return {Number}
 */
__.prototype.createObject = function (fn) {

    var id = this.nextId++;

    this.objects[id] = new Obj(this, fn);

    return id;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to
 * @param body
 * @param out
 * @param err
 * @param end
 */
__.prototype.sendMessage = function (to, body, out, err, end) {

    this.messages.push([to, body, out, err, end]);
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

        recipient = this.objects[envelope[0]];

        // validate the recipient address

        if (recipient == null) {
            throw new Error("couldn't find object with address " + envelope[0]);
        }

        recipient.process(envelope[1], envelope[2], envelope[3], envelope[4]);
    }
};

module.exports = __;