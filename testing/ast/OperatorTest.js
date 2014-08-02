/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Operator = require('../../ast/Operator');
var Literal = require('../../ast/Literal');
var Identifier = require('../../ast/Identifier');
var Context = require('../../codegen/Context');


module.exports["json"] = {

    "add": function (test) {

        var op = new Operator("add", new Literal(3), new Literal(4));

        test.equal(JSON.stringify(op), '{"op":"add","left":3,"right":4}');
        test.done();
    }
}

module.exports["codegen"] = {

    setUp: function (cb) {

        this.context = new Context();

        cb();
    },

    "add": function (test) {

        var op = new Operator("add", new Literal(3), new Literal(4));

        test.equal(op.toJavaScript(this.context), "3 + 4");
        test.done();
    },

    "sub": function (test) {

        var op = new Operator("sub", new Literal(3), new Literal(4));

        test.equal(op.toJavaScript(this.context), "3 - 4");
        test.done();
    },

    "mult": function (test) {

        var op = new Operator("mult", new Literal(3), new Literal(4));

        test.equal(op.toJavaScript(this.context), "3 * 4");
        test.done();
    },

    "div": function (test) {

        var op = new Operator("div", new Literal(3), new Literal(4));

        test.equal(op.toJavaScript(this.context), "3 / 4");
        test.done();
    },

    "mod": function (test) {

        var op = new Operator("mod", new Literal(3), new Literal(4));

        test.equal(op.toJavaScript(this.context), "3 % 4");
        test.done();
    },

    "assign": function (test) {

        var op = new Operator("assign", new Identifier('foo'), new Literal(4));

        test.equal(op.toJavaScript(this.context), "$foo = 4");
        test.done();
    }
};