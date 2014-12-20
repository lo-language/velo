/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Receive = require('../../ast/Receive');

module.exports["json"] = {

    "number": function (test) {

        var stmt = new Receive(["args","io"]);

        test.deepEqual(stmt.toJSON(), ["receive", ["args", "io"]]);
        test.done();
    }
};

module.exports["analyze"] = {

    "single param": function (test) {

        var result = new Receive(["num"]).compile();

        test.deepEqual(result, {defines: {
            "num": 'param'
        }});

        test.done();
    },

    "two params": function (test) {

        var result = new Receive(["args", "io"]).compile();

        test.deepEqual(result, {defines: {
            "args": 'param',
            "io": 'param'
        }});

        test.done();
    }
};