/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Obj = require('./Obj');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new system with the given main action.
 *
 * @private
 */
var __ = function (main) {

    this.objects = [];
    this.nextId = 0;

    this.messages = [];

    this.root = this.createObject(main);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Initializes the system environment.
 */
__.prototype.init = function () {

    // create some basic objects: io.out, io.err

    var out = this.createObject(function () {

    });

    var err = this.createObject(function () {

    });

    var io = {

        $out: {
            $writeLine: function (line) {
                console.log(line);
            }
        },

        $err: {
            $writeLine: function (line) {
                console.error(line);
            }
        }
    };

    this.sendMessage(this.root, ["hi there"]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new object in the system.
 *
 * @param action    the function to run to process each message
 * @return {Number}
 */
__.prototype.createObject = function (action) {

    var id = this.nextId++;

    this.objects[id] = new Obj(this, action);

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

        recipient.action(envelope[1], envelope[2], envelope[3], envelope[4]);
    }
};

module.exports = __;