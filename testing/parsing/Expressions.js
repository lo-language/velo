/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

const fs = require('fs');
const path = require('path');
const Parser = require('../../parser/Parser');
const util = require('util');

module.exports["basic"] = {

    "id": function (test) {

        var result = new Parser("expr").parse("foo");

        test.deepEqual(result.getAst(), {type: 'id', name: 'foo'});
        test.deepEqual(result.getSourceLoc(), [1,1]);

        test.done();
    },

    "external id": function (test) {

        var result = new Parser("expr").parse(" Lo::String::toInt");

        test.deepEqual(result.getAst(), {type: 'external-id', ns: [ 'Lo', 'String' ], name: 'toInt'});
        test.deepEqual(result.getSourceLoc(), [1,2]);

        test.done();
    },

    "concat": function (test) {

        test.deepEqual(new Parser("expr").parse("foo >< bar").getAst(),
            {
                type: 'concat',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.done();
    },

    "condExpr": function (test) {

        test.deepEqual(new Parser("expr").parse("foo ? bar : baz").getAst(),
            {
                type: 'cond-expr',
                predicate: {type: 'id', name: 'foo'},
                trueVal: {type: 'id', name: 'bar'},
                falseVal: {type: 'id', name: 'baz'}
            });

        test.done();
    },

    "literal": function (test) {

        var result = new Parser("expr").parse("42");

        test.deepEqual(result.getAst(), {type: 'number', val: '42'});
        test.deepEqual(result.getSourceLoc(), [1, 1]);

        test.done();
    },

    "stringify": function (test) {

        // bare backticks
        test.deepEqual(new Parser("expr").parse("`foo`").getAst(),
            {
                type: 'coercion',
                expr: {type: 'id', name: 'foo'},
                coerce: 'string'
            });

        // string with just backticks
        test.deepEqual(new Parser("expr").parse("\"`foo`\"").getAst(),
            { type: 'concat',
                left:
                { type: 'concat',
                    left: { type: 'string', val: '' },
                    right:
                    { type: 'coercion',
                        expr: { type: 'id', name: 'foo' },
                        coerce: 'string' } },
                right: { type: 'string', val: '' } });

        test.done();
    },

    "parens": function (test) {

        test.deepEqual(new Parser("expr").parse("(foo)").getAst(),
            {type: 'id', name: 'foo'});

        test.done();
    },

    "membership": function (test) {

        test.deepEqual(new Parser("expr").parse("foo has 18").getAst(),
            {
                type: 'testMembership',
                set: {type: 'id', name: 'foo'},
                member: {type: 'number', val: '18'}
            });

        test.deepEqual(new Parser("expr").parse("foo contains 18").getAst(),
            {
                type: 'testMembership',
                set: {type: 'id', name: 'foo'},
                member: {type: 'number', val: '18'}
            });

        test.done();
    },

    "logical": function (test) {

        test.deepEqual(new Parser("expr").parse("foo and bar").getAst(),
            {
                type: 'op',
                op: 'and',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo or bar").getAst(),
            {
                type: 'op',
                op: 'or',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.done();
    },

    "relational": function (test) {

        test.deepEqual(new Parser("expr").parse("foo > bar").getAst(),
            {
                type: 'op',
                op: '>',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo < bar").getAst(),
            {
                type: 'op',
                op: '<',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo >= bar").getAst(),
            {
                type: 'op',
                op: '>=',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo <= bar").getAst(),
            {
                type: 'op',
                op: '<=',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo == bar").getAst(),
            {
                type: 'op',
                op: '==',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.done();
    },

    "arithmetic": function (test) {

        test.deepEqual(new Parser("expr").parse("foo + bar").getAst(),
            {
                type: 'op',
                op: '+',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo - bar").getAst(),
            {
                type: 'op',
                op: '-',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo * bar").getAst(),
            {
                type: 'op',
                op: '*',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo / bar").getAst(),
            {
                type: 'op',
                op: '/',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.deepEqual(new Parser("expr").parse("foo % bar").getAst(),
            {
                type: 'op',
                op: '%',
                left: {type: 'id', name: 'foo'},
                right: {type: 'id', name: 'bar'}
            });

        test.done();
    },

    "negation": function (test) {

        test.deepEqual(new Parser("expr").parse("not foo").getAst(),
            {type: 'not', operand: {type: 'id', name: 'foo'}});

        test.done();
    },

    "binding": function (test) {

        test.deepEqual(new Parser("expr").parse("have foo").getAst(),
            {type: 'have', operand: {type: 'id', name: 'foo'}});

        test.deepEqual(new Parser("expr").parse("!have foo").getAst(),
            { type: 'not',
                operand: { type: 'have', operand: { type: 'id', name: 'foo' } } });

        test.done();
    },

    "select": function (test) {

        test.deepEqual(new Parser("expr").parse("foo.bar").getAst(),
            {
                type: 'select',
                record: {type: 'id', name: 'foo'},
                field: 'bar'
            });

        test.done();
    },

    "array slice": function (test) {

        test.deepEqual(new Parser("expr").parse("foo[bar..baz]").getAst(),
            {
                type: 'slice',
                list: {type: 'id', name: 'foo'},
                start: {type: 'id', name: 'bar'},
                end: {type: 'id', name: 'baz'}
            });

        test.done();
    },

    "array subscript": function (test) {

        test.deepEqual(new Parser("expr").parse("foo[bar]").getAst(),
            {
                type: 'subscript',
                list: {type: 'id', name: 'foo'},
                index: {type: 'id', name: 'bar'}
            });

        test.done();
    },

    "cardinality": function (test) {

        test.deepEqual(new Parser("expr").parse("#foo").getAst(), {
            type: 'cardinality',
            operand: {type: 'id', name: 'foo'}
        });

        test.done();
    }
};

module.exports["calls"] = {

    "expr list": function (test) {

        test.deepEqual(new Parser("exprList").parse("foo").map(function (expr) {return expr.getAst();}),
            [{ type: 'id', name: 'foo' }]);

        test.deepEqual(new Parser("exprList").parse("foo, bar").map(function (expr) {return expr.getAst();}),
            [{ type: 'id', name: 'foo' }, { type: 'id', name: 'bar' }]);

        test.deepEqual(new Parser("exprList").parse("foo, bar, baz + 17").map(function (expr) {return expr.getAst();}),
            [{ type: 'id', name: 'foo' }, { type: 'id', name: 'bar' },
                { type: 'op',
                    op: '+',
                    left: { type: 'id', name: 'baz' },
                    right: { type: 'number', val: '17' } }]);

        test.done();
    },

    "no args": function (test) {

        // sync
        test.deepEqual(new Parser("expr").parse("foo()").getAst(),
            {
                type: 'request_expr',
                address: {type: 'id', name: 'foo'},
                args: [],
                blocking: true
            });

        // async
        test.deepEqual(new Parser("expr").parse("@foo()").getAst(),
            {
                type: 'request_expr',
                address: {type: 'id', name: 'foo'},
                args: [],
                blocking: false
            });

        test.done();
    },

    "with args": function (test) {

        // sync
        test.deepEqual(new Parser("expr").parse("foo(bar)").getAst(),
            { type: 'request_expr',
                address: { type: 'id', name: 'foo' },
                args: [{ type: 'id', name: 'bar' }],
                blocking: true });

        // async
        test.deepEqual(new Parser("expr").parse("async foo(bar, baz)").getAst(),
            { type: 'request_expr',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' }, { type: 'id', name: 'baz' } ],
                blocking: false });

        test.deepEqual(new Parser("expr").parse("@foo(bar, baz, quux)").getAst(),
            { type: 'request_expr',
                address: { type: 'id', name: 'foo' },
                args:
                    [ { type: 'id', name: 'bar' },
                        { type: 'id', name: 'baz' },
                        { type: 'id', name: 'quux' } ],
                blocking: false });

        test.done();
    }
};
