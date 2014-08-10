/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var ast = require('../../ast');
var TargetFn = require('../../codegen/TargetFn');

//module.exports["json"] = {
//
//    "number": function (test) {
//
//        var val = new Literal(3);
//
//        test.equal(val.toJSON(), "3");
//        test.done();
//    },
//
//    "boolean": function (test) {
//
//        var val = new Literal(true);
//
//        test.equal(val.toJSON(), true);
//        test.done();
//    },
//
//    "string": function (test) {
//
//        var val = new Literal("Leela");
//
//        test.equal(val.toJSON(), "Leela");
//        test.done();
//    }
//};

module.exports["compile"] = {

    setUp: function (cb) {

        this.target = new TargetFn(new ast.Action());

        cb();
    },

    "two immediates": function (test) {

        var val = new ast.Relational('gt', new ast.Literal(3), new ast.Literal(8)).compile(this.target);

        test.equal(val.getCode(), "3 > 8");
        test.done();
    },

    "one immediate": function (test) {

        var val = new ast.Relational('gt', new ast.Identifier('foo'), new ast.Literal(8)).compile(this.target);

        test.equal(val.getCode(), '$foo.then(function (val) {return val > 8;})');
        test.done();
    },

//    "two vars": function (test) {
//
//        var val = new Literal("Leela").compile(this.target);
//
//        test.equal(val.getCode(), '"Leela"');
//        test.done();
//    }
};