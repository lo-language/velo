/**
 * Created by: spurcell
 * 7/5/14
 *
 * todo factor this file better
 */

"use strict";

var Operator = require('../../ast/Operator');
var Literal = require('../../ast/Literal');
var Identifier = require('../../ast/Identifier');
var Scope = require('../../codegen/Scope');
var TargetScope = require('../../codegen/TargetScope');
var Constant = require('../../codegen/Constant');
var Promise = require('../../codegen/Promise');

module.exports["json"] = {

    "add": function (test) {

        var op = new Operator("add", new Literal(3), new Literal(4));

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

            this.scope = new Scope();
            this.target = new TargetScope();
            this.op = op;
            this.symbol = operators[op][0];
            this.result = operators[op][1];

            cb();
        },

        "constants": function (test) {

            var op = new Operator(this.op, new Literal(3), new Literal(4));

            var c = op.renderJs(this.scope, this.target);

            test.ok(c instanceof Constant);
            test.equal(c.getValue(), this.result);

            test.done();
        },

        "const and promise": function (test) {

            var op = new Operator(this.op, new Literal(4), new Identifier('foo'));

            var p = op.renderJs(this.scope, this.target);

            test.ok(p instanceof Promise);
            test.equal(p.getName(), '$1');
            test.equal(this.target.statements[0], '$1 = Q.when($foo, function (val) {return 4 ' + this.symbol + ' val;});');

            test.done();
        },

        "promise and const": function (test) {

            var op = new Operator(this.op, new Identifier('foo'), new Literal(4));

            var p = op.renderJs(this.scope, this.target);

            test.ok(p instanceof Promise);
            test.equal(p.getName(), '$1');
            test.equal(this.target.statements[0], '$1 = Q.when($foo, function (val) {return 4 ' + this.symbol + ' val;});');

            test.done();
        },

        "promises": function (test) {

            var op = new Operator(this.op, new Identifier('foo'), new Identifier('bar'));

            var p = op.renderJs(this.scope, this.target);

            test.ok(p instanceof Promise);
//        test.equal(p.getName(), '$1');
            test.equal(this.target.statements[0], '$2 = Q.all([$foo, $bar]).then(function (left, right) {return left ' + this.symbol + ' right;});');

            test.done();
        },

        "promises twice": function (test) {

            var op = new Operator(this.op, new Operator(this.op, new Identifier('foo'), new Identifier('bar')), new Identifier('qux'));

            var p = op.renderJs(this.scope, this.target);

            console.log(this.target.renderJs());

            test.ok(p instanceof Promise);
//        test.equal(p.getName(), '$1');
            test.equal(this.target.statements[0], '$2 = Q.all([$foo, $bar]).then(function (left, right) {return left ' + this.symbol + ' right;});');

            test.done();
        }
    }
});