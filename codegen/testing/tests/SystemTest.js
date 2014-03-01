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
        var fn = function () {};

        var m = system.createMachine(fn);

        test.equal(m, 0);
        test.equal(system.machines[0].process, fn);

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

        system.sendMessage(0, 42, 1, 2, 3);
        test.deepEqual(system.messages, [[0, 42, 1, 2, 3]]);

        system.sendMessage(0, 57, 4, 5, 6);
        test.deepEqual(system.messages, [[0, 42, 1, 2, 3],[0, 57, 4, 5, 6]]);

        test.done();
    },

    "run success": function (test) {

//        test.expect(4);

        var system = new System();

        var expected = [42, 57];

        var fn = function (message) {
            test.equal(message, expected.shift());
        };

        var m = system.createMachine(fn);

        system.sendMessage(0, 42, 1, 2, 3);
        test.deepEqual(system.messages, [[0, 42, 1, 2, 3]]);

        system.sendMessage(0, 57, 4, 5, 6);
        test.deepEqual(system.messages, [[0, 42, 1, 2, 3],[0, 57, 4, 5, 6]]);

        system.run();

        test.done();
    }
};