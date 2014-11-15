/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Literal = require('../../ast/Literal');
var Action = require('../../ast/Action');
var TargetFn = require('../../codegen/TargetFn');

module.exports["json"] = {

    "number": function (test) {

        var val = new Literal(3);

        test.equal(val.toJSON(), "3");
        test.done();
    },

    "boolean": function (test) {

        var val = new Literal(true);

        test.equal(val.toJSON(), true);
        test.done();
    },

    "string": function (test) {

        var val = new Literal("Leela");

        test.equal(val.toJSON(), "Leela");
        test.done();
    }
};

module.exports["compile"] = {

    "number": function (test) {

        var result = new Literal(3).compile();

        test.equal(result.code, "3");
        test.done();
    },

    "boolean": function (test) {

        var result = new Literal(true).compile();

        test.equal(result.code, true);
        test.done();
    },

    "string": function (test) {

        var result = new Literal("Leela").compile();

        test.equal(result.code, '"Leela"');
        test.done();
    }
};