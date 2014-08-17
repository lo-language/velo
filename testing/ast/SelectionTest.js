/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var ast = require('../../ast');
var TargetFn = require('../../codegen/TargetFn');

module.exports["toJSON"] = {

    "number": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Literal(7), new ast.Literal(4)), [], []);

        test.deepEqual(val.toJSON(), [ 'if',
            { op: 'gt', left: { value: 7 }, right: { value: 4 } },
            []]);
        test.done();
    }
};

module.exports["codegen - no else"] = {

    setUp: function (cb) {

        this.target = new TargetFn(new ast.Action());

        cb();
    },

    "immediate expr": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Literal(3), new ast.Literal(8)), [
            new ast.Operator('add', new ast.Literal(3), new ast.Literal(4))
        ]).compile(this.target);

        test.equal(val.getCode(), "if (3 > 8) { 3 + 4 }");
        test.done();
    },

    "deferred expr": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Identifier('foo'), new ast.Literal(8)), [
            new ast.Operator('add', new ast.Literal(3), new ast.Literal(4))
        ]).compile(this.target);

        test.equal(val.getCode(), "$foo.then(function (val) {return val > 8;}).then(function (val) {if (val) { 3 + 4 }})");
        test.done();
    }
};

module.exports["codegen with else"] = {

    setUp: function (cb) {

        this.target = new TargetFn(new ast.Action());

        cb();
    },

    "immediate expr": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Literal(3), new ast.Literal(8)), [
            new ast.Operator('add', new ast.Literal(3), new ast.Literal(4))
        ], [
            new ast.Operator('sub', new ast.Literal(5), new ast.Literal(7))
        ]).compile(this.target);

        test.equal(val.getCode(), "if (3 > 8) { 3 + 4 } else { 5 - 7 }");
        test.done();
    },

    "deferred expr": function (test) {

        var val = new ast.Selection(new ast.Relational('gt', new ast.Identifier('foo'), new ast.Literal(8)), [
            new ast.Operator('add', new ast.Literal(3), new ast.Literal(4))
        ], [
            new ast.Operator('sub', new ast.Literal(5), new ast.Literal(7))
        ]).compile(this.target);

        test.equal(val.getCode(), "$foo.then(function (val) {return val > 8;}).then(function (val) {if (val) { 3 + 4 } else { 5 - 7 }})");
        test.done();
    }
};