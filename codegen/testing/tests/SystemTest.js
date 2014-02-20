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

    "sendMessage invalid address": function (test) {

        var system = new System();

        test.throws(function () {
            system.sendMessage(0, 42);
        });

        test.done();
    },

    "sendMessage success": function (test) {

        var system = new System();

        var m = system.createMachine();

        system.sendMessage(0, 42);

        test.done();
    }
}