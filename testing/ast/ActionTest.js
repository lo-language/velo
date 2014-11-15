/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var ast = require('../../ast');
var TargetFn = require('../../codegen/TargetFn');

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

module.exports["root action"] = {

    "no params empty body": function (test) {

        var result = new ast.Action([]).compile();

        test.done();
    },

    "using undefined var": function (test) {

        var action = new ast.Action([
            new ast.Operator("add", new ast.Identifier('foo'), new ast.Literal(4))
        ]);

        var result = action.compile();

        test.deepEqual(result, {code: '$foo + 4', requires: {$foo: true}});
        test.done();
    },

    "using received param succeeds": function (test) {

        var action = new ast.Action([
            new ast.Receive(["foo"]),
            new ast.Operator("add", new ast.Identifier('foo'), new ast.Literal(4))
        ]);

        var result = action.compile();

        test.deepEqual(result, {code: '$foo + 4', requires: {}});
        test.done();
    },

    "using assigned var and param": function (test) {

        var action = new ast.Action([
            new ast.Receive(["bar"]),
            new ast.Operator("assign", new ast.Identifier('foo'), new ast.Literal(12)),
            new ast.Operator("add", new ast.Identifier('foo'), new ast.Identifier('bar'))
        ]);

        var result = action.compile();

        test.deepEqual(result, {code: '$foo = 12\n$foo + $bar', requires: {}});
        test.done();
    },
//
//    "two params empty body": function (test) {
//
//        var result = new ast.Action([
//            new ast.Operator("add", new ast.Identifier('foo'), new ast.Literal(4)),
//            new ast.Operator("add", new ast.Identifier('bar'), new ast.Literal(7))
//        ]).compile();
//
//        console.log(result);
//
//        test.done();
//    }
};