/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Operator = require('../../ast/Operator');
var Literal = require('../../ast/Literal');
var Identifier = require('../../ast/Identifier');
var Invocation = require('../../ast/Invocation');
var Context = require('../../codegen/Context');

//module.exports["json"] = {
//
//    "add": function (test) {
//
//        var op = new Operator("add", new Literal(3), new Literal(4));
//
//        test.equal(JSON.stringify(op), '{"invoke":"add","left":3,"right":4}');
//        test.done();
//    }
//};

module.exports["codegen"] = {

    setUp: function (cb) {

        this.context = new Context();

        cb();
    },

    "no args": function (test) {

        var inv = new Invocation(new Identifier("foo"), []);

        test.equal(inv.toJavaScript(this.context), "$foo()");
        test.done();
    },

    "one arg": function (test) {

        var inv = new Invocation(new Identifier("foo"), [new Literal(3)]);

        test.equal(inv.toJavaScript(this.context), "$foo(3)");
        test.done();
    },

    "two args": function (test) {

        var inv = new Invocation(new Identifier("foo"), [new Literal(3), new Literal("hi there")]);

        test.equal(inv.toJavaScript(this.context), '$foo(3, "hi there")');
        test.done();
    }
};