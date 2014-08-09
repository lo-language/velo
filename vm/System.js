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
    this.main = main;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Initializes the system environment.
 */
__.prototype.run = function () {

    // pop off the args we don't care about
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

    var lib = {};
    this.main(argv, io, env, lib);
};

module.exports = __;