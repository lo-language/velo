/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Obj = require('./Obj');
var WriteStream = require('./WriteStream');

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

    // pop off the args
    var argv = process.argv.slice(2);

    // create some basic objects

    var io = {
        $out: WriteStream.create(this, process.stdout),
        $err: WriteStream.create(this, process.stderr)
    };

    // todo - use this instead?
    var env = process.env;
//    var env = {
//        $get: function () {},
//        $set: function () {},
//        $on: function () {}
//    };

    var kit = {};

    this.sendMessage(this.root, argv, io, env, kit);
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
__.prototype.sendMessage = function () {

    var args = Array.prototype.slice.call(arguments); // from MDN

    this.messages.push(args);
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

        recipient = this.objects[envelope.shift()];

        // validate the recipient address

        if (recipient == null) {
            throw new Error("couldn't find object with address " + envelope[0]);
        }

        recipient.action(envelope);
    }
};

module.exports = __;