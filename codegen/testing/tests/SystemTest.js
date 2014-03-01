/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var System = require('../../System');

exports["constructor"] = {

    "inits": function (test) {

        var system = new System();

        test.done();
    },

    "createMachine": function (test) {

        var system = new System();

        var m = system.createMachine();

        test.equal(m, 0);

        test.done();
    },

    "run with invalid address": function (test) {

        var system = new System();

        system.sendMessage(0, 42);

        test.throws(function () {
            system.run();
        });

        test.done();
    },

    "sendMessage success": function (test) {

        var system = new System();

        var m = system.createMachine();

        system.sendMessage(0, 42);
        test.deepEqual(system.messages, [[0, 42]]);

        system.sendMessage(0, 57);
        test.deepEqual(system.messages, [[0, 42],[0, 57]]);

        test.done();
    },

    "run success": function (test) {

        var system = new System();

        var m = system.createMachine();

        system.sendMessage(0, 42);
        test.deepEqual(system.messages, [[0, 42]]);

        system.sendMessage(0, 57);
        test.deepEqual(system.messages, [[0, 42],[0, 57]]);

        system.run();

        test.done();
    }
}