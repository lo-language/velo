/**
 * Created by: spurcell
 * 2/11/14
 */

"use strict";

var Environment = require('../../Environment');

module.exports["create"] = {

    "success": function (test) {
        test.done();
    }
};

module.exports["sendMessage"] = {

    setUp: function (cb) {

        this.env = new Environment();

        this.m0 = this.env.createMachine();

        cb();
    },

    "success": function (test) {

        // should create a message

        this.env.sendRequest(0);

        test.done();
    },

    "fails on bad address": function (test) {

        try {
            this.env.sendRequest(47);

            test.fail();
        }
        catch (err) {

            test.equal(err.message, "unknown machine?!");
            test.done();
        }
    }
};