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

    "definition": function (test) {

        var parser = new Parser("statement");

        var result = parser.parse('foo is bar;');

        test.deepEqual(result.getAst(),
            { type: 'constant',
                name: 'foo',
                value: { type: 'id', name: 'bar' } });

        test.done();
    },

    "response": function (test) {

        test.deepEqual(new Parser("statement").parse('reply;').getAst(),
            { type: 'response', channel: 'reply', args: [] });

        test.deepEqual(new Parser("statement").parse('reply foo;').getAst(),
            { type: 'response', channel: 'reply', args: [{ type: 'id', name: 'foo' }] });

        test.deepEqual(new Parser("statement").parse('reply foo, bar;').getAst(),
            { type: 'response', channel: 'reply', args: [{ type: 'id', name: 'foo' }, { type: 'id', name: 'bar' }] });

        test.deepEqual(new Parser("statement").parse('fail;').getAst(),
            { type: 'response', channel: 'fail', args: [] });

        test.deepEqual(new Parser("statement").parse('fail "d\'oh!";').getAst(),
            { type: 'response',
                channel: 'fail',
                args: [ { type: 'string', val: 'd\'oh!' } ] });

        test.deepEqual(new Parser("statement").parse('fail foo;').getAst(),
            { type: 'response', channel: 'fail', args: [{ type: 'id', name: 'foo' }] });

        test.deepEqual(new Parser("statement").parse('fail foo, bar;').getAst(),
            { type: 'response', channel: 'fail', args: [{ type: 'id', name: 'foo' }, { type: 'id', name: 'bar' }] });

        test.done();
    },

    "array push": function (test) {

        test.deepEqual(new Parser("statement").parse('foo +> bar;').getAst(),
            { type: 'push-front',
                left: { type: 'id', name: 'foo' },
                right: { type: 'id', name: 'bar' } });

        test.deepEqual(new Parser("statement").parse('foo <+ bar;').getAst(),
            { type: 'push-back',
                left: { type: 'id', name: 'foo' },
                right: { type: 'id', name: 'bar' } });

        test.done();
    },

    "assignment": function (test) {

        var parser = new Parser("statement");

        var result = parser.parse('foo = bar;');

        test.deepEqual(result.getAst(),
            { type: 'assign',
                left: { type: 'id', name: 'foo' },
                right: { type: 'id', name: 'bar' } });

        test.done();
    },

    "destructuring assignment": function (test) {

        test.deepEqual(new Parser("statement").parse("(foo, bar, baz) = quux;").getAst(),
            { type: 'assign',
                left: { type: 'destructure', fields: [ 'foo', 'bar', 'baz' ] },
                right: { type: 'id', name: 'quux' } });

        test.done();
    },

    "increment": function (test) {

        var parser = new Parser("statement");

        var result = parser.parse('foo++;');

        test.deepEqual(result.getAst(),
            { type: 'assign',
                left: { type: 'id', name: 'foo' },
                right:
                { type: 'op',
                    op: '+',
                    left: { type: 'id', name: 'foo' },
                    right: { type: 'number', val: '1' } } });

        test.done();
    },

    "decrement": function (test) {

        var parser = new Parser("statement");

        var result = parser.parse('foo--;');

        test.deepEqual(result.getAst(),
            { type: 'assign',
                left: { type: 'id', name: 'foo' },
                right:
                { type: 'op',
                    op: '-',
                    left: { type: 'id', name: 'foo' },
                    right: { type: 'number', val: '1' } } });

        test.done();
    },

    "conditional": function (test) {

        var parser = new Parser("statement");

        var result = parser.parse('if foo { bar = baz; }');

        test.deepEqual(result.getAst(),
            { type: 'conditional',
                predicate: { type: 'id', name: 'foo' },
                consequent:
                { type: 'stmt_list',
                    head:
                    { type: 'assign',
                        left: { type: 'id', name: 'bar' },
                        right: { type: 'id', name: 'baz' } },
                    tail: null } });

        test.done();
    }
};

module.exports["blocks"] = {

    "plain style, no handlers": function (test) {

        test.deepEqual(new Parser("statement").parse('foo <- (bar);').getAst(),
            {
                type: 'request_stmt',
                address: {type: 'id', name: 'foo'},
                args: [{type: 'id', name: 'bar'}],
                subsequent: undefined,
                contingency: undefined,
                blocking: true
            });

        test.done();
    }
};

module.exports["iteration"] = {

    "while": function (test) {

        test.deepEqual(new Parser("statement").parse('while foo { bar++; }').getAst(),
            { type: 'iteration',
                condition: { type: 'id', name: 'foo' },
                statements:
                { type: 'stmt_list',
                    head:
                    { type: 'assign',
                        left: { type: 'id', name: 'bar' },
                        right:
                        { type: 'op',
                            op: '+',
                            left: { type: 'id', name: 'bar' },
                            right: { type: 'number', val: '1' } } },
                    tail: null } });

        test.done();
    },

    "scan": function (test) {

        test.deepEqual(new Parser("statement").parse('scan foo -> (item) { bar++; }').getAst(),
            { type: 'scan',
                over: { type: 'id', name: 'foo' },
                into:
                { type: 'procedure',
                    params: [ 'item' ],
                    body:
                    { type: 'stmt_list',
                        head:
                        { type: 'assign',
                            left: { type: 'id', name: 'bar' },
                            right:
                            { type: 'op',
                                op: '+',
                                left: { type: 'id', name: 'bar' },
                                right: { type: 'number', val: '1' } } },
                        tail: null },
                    isService: false } });

        test.done();
    }
};

module.exports["requests"] = {

    "plain style, no handlers": function (test) {

        test.deepEqual(new Parser("statement").parse('foo bar;').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: undefined,
                contingency: undefined,
                blocking: true });

        test.deepEqual(new Parser("statement").parse('@foo bar;').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: undefined,
                contingency: undefined,
                blocking: false });

        test.done();
    },

    "arrow style, no handlers": function (test) {

        test.deepEqual(new Parser("statement").parse('foo <- (bar);').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: undefined,
                contingency: undefined,
                blocking: true });

        test.deepEqual(new Parser("statement").parse('@foo <- (bar);').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: undefined,
                contingency: undefined,
                blocking: false });

        test.done();
    },

    "arrow style with yields": function (test) {

        test.deepEqual(new Parser("statement").parse('foo <- (bar) => baz;').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: { type: 'yields', target: { type: 'id', name: 'baz' } },
                contingency: undefined,
                blocking: true });

        test.deepEqual(new Parser("statement").parse('@foo <- (bar) => baz;').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: { type: 'yields', target: { type: 'id', name: 'baz' } },
                contingency: undefined,
                blocking: false });

        test.done();
    },

    "arrow style with yields and fail handler": function (test) {

        test.deepEqual(new Parser("statement").parse('foo <- (bar) => baz ~> (error) {}').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: { type: 'yields', target: { type: 'id', name: 'baz' } },
                contingency: {
                    "body": {
                        "type": "stmt_list",
                        "head": null,
                        "tail": null
                    },
                    "isService": false,
                    "params": [
                        "error"
                    ],
                    "type": "procedure"
                },
                blocking: true });

        test.deepEqual(new Parser("statement").parse('@foo <- (bar) => baz ~> (error) {}').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: { type: 'yields', target: { type: 'id', name: 'baz' } },
                contingency: {
                    "body": {
                        "type": "stmt_list",
                        "head": null,
                        "tail": null
                    },
                    "isService": false,
                    "params": [
                        "error"
                    ],
                    "type": "procedure"
                },
                blocking: false });

        test.done();
    },

    "arrow style, with handlers": function (test) {

        // reply handler

        test.deepEqual(new Parser("statement").parse('foo <- (bar) -> (res) { }').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                subsequent: {
                    "body": {
                        "type": "stmt_list",
                        "head": null,
                        "tail": null
                    },
                    "isService": false,
                    "params": [
                        "res"
                    ],
                    "type": "procedure"
                },
                contingency: undefined,
                blocking: true });

        // error handler

        test.deepEqual(new Parser("statement").parse('foo <- (bar) ~> (err) { }').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                blocking: true,
                subsequent: undefined,
                contingency: {
                    "body": {
                        "type": "stmt_list",
                        "head": null,
                        "tail": null
                    },
                    "isService": false,
                    "params": [
                        "err"
                    ],
                    "type": "procedure"
                }
            });

        // both handlers

        test.deepEqual(new Parser("statement").parse('foo <- (bar) -> (res) {} ~> (err) {}').getAst(),
            { type: 'request_stmt',
                address: { type: 'id', name: 'foo' },
                args: [ { type: 'id', name: 'bar' } ],
                blocking: true,
                subsequent: {
                    "body": {
                        "type": "stmt_list",
                        "head": null,
                        "tail": null
                    },
                    "isService": false,
                    "params": [
                        "res"
                    ],
                    "type": "procedure"
                },
                contingency: {
                    "body": {
                        "type": "stmt_list",
                        "head": null,
                        "tail": null
                    },
                    "isService": false,
                    "params": [
                        "err"
                    ],
                    "type": "procedure"
                }
            });

        test.done();
    },
};

module.exports["modules"] = {

    "module refs": function (test) {

        test.deepEqual(new Parser("locator").parse('Math').getAst(),
            { type: 'modref', namespace: null, id: 'Math' });

        test.deepEqual(new Parser("locator").parse('JS::Math').getAst(),
            { type: 'modref', namespace: 'JS', id: 'Math' });

        test.done();
    },

    "module deps": function (test) {

        test.deepEqual(new Parser("dep").parse('Math as Math').getAst(),
            { type: 'constant',
                name: 'Math',
                value: { type: 'modref', namespace: null, id: 'Math' } });

        test.deepEqual(new Parser("dep").parse('"./Math.lo" as Math').getAst(),
            { type: 'constant',
                name: 'Math',
                value: { type: 'modref', namespace: null, id: './Math.lo' } });

        test.deepEqual(new Parser("dep").parse('JS::Math as Math').getAst(),
            { type: 'constant',
                name: 'Math',
                value: { type: 'modref', namespace: 'JS', id: 'Math' } });

        test.done();
    },

    "module with no deps": function (test) {

        test.deepEqual(new Parser().parse('foo is 18;').getAst(),
            { type: 'module',
                definitions:
                    [ { type: 'constant',
                        name: 'foo',
                        value: { type: 'number', val: '18' } } ] });

        test.deepEqual(new Parser().parse('foo is (bar) { reply 42; };').getAst(),
            { type: 'module',
                definitions:
                    [ { type: 'constant',
                        name: 'foo',
                        value:
                        { type: 'procedure',
                            params: [ 'bar' ],
                            body:
                            { type: 'stmt_list',
                                head:
                                { type: 'response',
                                    channel: 'reply',
                                    args: [ { type: 'number', val: '42' } ] },
                                tail: null },
                            isService: true } } ] });

        test.done();
    }
};