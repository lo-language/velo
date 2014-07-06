/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Literal = require('../../ast/Literal');

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

module.exports["codegen"] = {

    "number": function (test) {

        var val = new Literal(3);

        test.equal(val.toJavaScript(), 3);
        test.done();
    },

    "boolean": function (test) {

        var val = new Literal(true);

        test.equal(val.toJavaScript(), true);
        test.done();
    },

    "string": function (test) {

        var val = new Literal("Leela");

        test.equal(val.toJavaScript(), '"Leela"');
        test.done();
    }
};