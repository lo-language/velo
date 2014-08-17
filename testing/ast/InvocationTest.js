/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var ast = require('../../ast');
var TargetFn = require('../../codegen/TargetFn');

module.exports["json"] = {

    "add": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("foo"), []);

        test.equal(JSON.stringify(inv), '{"invoke":["id","foo"],"args":[]}');
        test.done();
    }
};

module.exports["renderJs"] = {

    setUp: function (cb) {

        this.target = new TargetFn(new ast.Action(['foo']));

        cb();
    },

    "immediate fn with no args": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("foo"), []);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$foo()');
        test.done();
    },

    "immediate fn immediate arg": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("foo"), [new ast.Literal(3)]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$foo(3)');
        test.done();
    },

    "immediate fn immediate args": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("foo"), [new ast.Literal("hello there!"), new ast.Literal(3)]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$foo("hello there!", 3)');
        test.done();
    },

    "pending fn with no args": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("bar"), []);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$bar.then(function (val) {return val();})');
        test.done();
    },

    "pending fn with immediate arg": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("bar"), [new ast.Literal(3)]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$bar.then(function (val) {return val(3);})');
        test.done();
    },

    "pending fn with immediate args": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("bar"), [new ast.Literal(3), new ast.Literal("hi there")]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$bar.then(function (val) {return val(3, \"hi there\");})');
        test.done();
    },

    "immediate fn with pending arg": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("foo"), [new ast.Identifier('snooks'), new ast.Literal("hi there")]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), '$snooks.then(function (val) {return $foo(val, "hi there");})');
        test.done();
    },

    "immediate fn with pending args": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("foo"), [new ast.Identifier('snooks'), new ast.Literal("hi there"), new ast.Identifier('baz')]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), 'Q.all([$snooks, $baz]).then(function (args) {return $foo(args[0], "hi there", args[1]);})');
        test.done();
    },

    "pending fn with pending arg": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("bar"), [new ast.Identifier('snooks'), new ast.Literal("hi there")]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), 'Q.all([$bar, $snooks]).then(function (args) {return args[0](args[1], "hi there");})');
        test.done();
    },

    "pending fn with pending args": function (test) {

        var inv = new ast.Invocation(new ast.Identifier("bar"), [new ast.Identifier('snooks'), new ast.Literal("hi there"), new ast.Identifier('baz')]);
        var expr = inv.compile(this.target);

        test.equal(expr.isImmediate(), false);
        test.equal(expr.getCode(), 'Q.all([$bar, $snooks, $baz]).then(function (args) {return args[0](args[1], "hi there", args[2]);})');
        test.done();
    }
};