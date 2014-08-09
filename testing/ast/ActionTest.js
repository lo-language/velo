/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var ast = require('../../ast');
var Scope = require('../../codegen/Scope');
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

module.exports["codegen"] = {

    setUp: function (cb) {

        this.scope = new Scope();

        cb();
    },

    "no params empty": function (test) {

        var action = new ast.Action([]);
        var target = new TargetFn(action);

        test.equal(this.target.statements[0], "$0 = function () {}");
        test.done();
    },

    "two params": function (test) {

        var action = new ast.Action(['foo', 'bar'],[
            new ast.Operator("add", new ast.Identifier('foo'), new ast.Literal(4)),
            new ast.Operator("add", new ast.Identifier('bar'), new ast.Literal(7))
        ]);

        action.renderJs(this.scope, this.target)

        test.equal(this.target.statements[0], "$0 = function () {\n\tvar $foo, $1;\n\n\t$1 = Q.when($foo, function (val) {return 4 + val;});\n}");
        test.done();
    }
};