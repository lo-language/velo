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

    "immediate expr": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Literal(3), new ast.Literal(8))).compile(this.target);

        test.equal(val.getCode(), "if (3 > 8) {  }");
        test.done();
    },

    "deferred expr": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Identifier('foo'), new ast.Literal(8))).compile(this.target);

        test.equal(val.getCode(), "$foo.then(function (val) {if (val) {  }})");
        test.done();
    }
};