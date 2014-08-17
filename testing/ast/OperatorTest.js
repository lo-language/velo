/**
 * Created by: spurcell
 * 7/5/14
 *
 * todo factor this file better
 */

"use strict";

var ast = require('../../ast');
var TargetFn = require('../../codegen/TargetFn');
var Expression = require('../../codegen/Expression');

module.exports["json"] = {

    "add": function (test) {

        var op = new ast.Operator("add", new ast.Literal(3), new ast.Literal(4));

        test.equal(JSON.stringify(op), '{"op":"add","left":3,"right":4}');
        test.done();
    }
};

var operators = {
    "add": ['+', 7],
    "sub": ['-', -1],
    "mult": ['*', 12],
    "div": ['/', 3/4],
    "mod": ['%', 3]
};

Object.keys(operators).forEach(function (op, index) {

    module.exports[op] = {

        setUp: function (cb) {

            this.target = new TargetFn(new ast.Action());
            this.op = op;
            this.symbol = operators[op][0];
            this.result = operators[op][1];

            cb();
        },

        "constants are simplified": function (test) {

            var op = new ast.Operator(this.op, new ast.Literal(3), new ast.Literal(4));
            var expr = op.compile(this.target);

            test.ok(expr.isImmediate());
//            test.equal(c.getValue(), this.result);

            test.done();
        },

        "const and var": function (test) {

            var op = new ast.Operator(this.op, new ast.Literal(4), new ast.Identifier('foo'));
            var expr = op.compile(this.target);

            test.equal(expr.isImmediate(), false);
            test.equal(expr.getCode(), "$foo.then(function (val) {return 4 " + this.symbol + " val;})");

            test.done();
        },

        "var and const": function (test) {

            var op = new ast.Operator(this.op, new ast.Identifier('foo'), new ast.Literal(4));
            var expr = op.compile(this.target);

            test.equal(expr.isImmediate(), false);
            test.equal(expr.getCode(), "$foo.then(function (val) {return val " + this.symbol + " 4;})");

            test.done();
        },

        "promises": function (test) {

            var op = new ast.Operator(this.op, new ast.Identifier('foo'), new ast.Identifier('bar'));
            var expr = op.compile(this.target);

            test.equal(expr.isImmediate(), false);
            test.equal(expr.getCode(), "Q.all([$foo, $bar]).then(function (args) {return args[0] " + this.symbol + " args[1];})");

            test.done();
        },

        "promises twice": function (test) {

            var op = new ast.Operator(this.op, new ast.Operator(this.op, new ast.Identifier('foo'), new ast.Identifier('bar')), new ast.Identifier('qux'));
            var expr = op.compile(this.target);

            test.equal(expr.isImmediate(), false);
            test.equal(expr.getCode(), "Q.all([$foo, $bar]).then(function (args) {return args[0] " + this.symbol + " args[1];})");

            test.done();
        }
    }
});