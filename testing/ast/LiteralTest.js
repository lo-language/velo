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

    setUp: function (cb) {

        this.target = new TargetFn(new Action());

        cb();
    },

    "number": function (test) {

        var val = new Literal(3).compile(this.target);

        test.equal(val, 3);
        test.done();
    },

    "boolean": function (test) {

        var val = new Literal(true).compile(this.target);

        test.equal(val, true);
        test.done();
    },

    "string": function (test) {

        var val = new Literal("Leela").compile(this.target);

        test.equal(val, '"Leela"');
        test.done();
    }
};