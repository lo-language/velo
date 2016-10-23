/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["embedded calls"] = {

    "no args": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: []
        };

        var ctx = new Context();

        ctx.pushBlockingCall = function (request) {

            test.deepEqual(request.renderTree(), [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ], [ 'arrayLiteral', [] ], [ 'null' ] ] ] ] ]);

            return 'blocker';
        };

        var result = ctx.compile(node);

        // should put a blocker into the context and return a placeholder

        test.equal(result, 'blocker');
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'}
            ]
        };

        var ctx = new Context();

        ctx.pushBlockingCall = function (request) {

            test.deepEqual(request.renderTree(), [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ], [ 'arrayLiteral', [ [ 'num', '42' ] ] ], [ 'null' ] ] ] ] ]);

            return 'blocker';
        };

        var result = ctx.compile(node);

        test.equal(result, 'blocker');
        test.done();
    },

    "two args": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: 'hi there'}
            ]
        };

        var ctx = new Context();

        ctx.pushBlockingCall = function (request) {

            test.deepEqual(request.renderTree(), [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ], [ 'arrayLiteral', [ [ 'num', '42' ], [ 'string', 'hi there' ] ] ], [ 'null' ] ] ] ] ]);

            return 'blocker';
        };

        var result = ctx.compile(node);

        test.equal(result, 'blocker');
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'baz'},
            args: [{
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: []
            },{
                type: 'application',
                address: {type: 'id', name: 'bar'},
                args: []
            }]
        };

        var ctx = new Context();

        var blockerCount = 0;

        var swaps = [
            ['res0', [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [ ] ], [ 'null' ] ] ] ] ] ],
            ['res1', [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$bar' ], [ 'arrayLiteral', [] ], [ 'null' ] ] ] ] ] ],
            ['res2', [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$baz' ],
                            [ 'arrayLiteral', [ [ 'id', 'res0' ], [ 'id', 'res1' ] ] ], [ 'null' ] ] ] ] ] ],
        ];

        ctx.pushBlockingCall = function (req) {

            var exp = swaps.shift();

            test.deepEqual(req.renderTree(), exp[1]);

            return JS.ID(exp[0]);
        };

        var result = ctx.compile(node);

        test.deepEqual(result.renderTree(), [ 'id', 'res2' ]);
        test.done();
    }
};

module.exports["application statements"] = {

    "application with one arg": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: '42'}
                ]}
        };

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                        [ 'function', null, [ 'res0' ], [ 'stmtList' ] ] ] ] ] ]);

        // attach a statement - should be tucked inside the replyhandler
        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID("foo"), JS.ID("bar")))));

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', 'foo' ], [ 'id', 'bar' ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "with nested applications": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'baz'},
                args: [{
                    type: 'op',
                    op: '-',
                    left: {
                        type: 'application',
                        address: {type: 'id', name: 'foo'},
                        args: []
                    },
                    right: {
                        type: 'application',
                        address: {type: 'id', name: 'bar'},
                        args: []
                    }
                }]}
        };

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ "stmtList", [ 'expr-stmt',
            [ "call",
                [ "select", [ "id", "task" ], "sendMessage" ],
                [
                    [ "id", "$foo" ],
                    [ "arrayLiteral", [] ],
                    [ "function", null, [ "res0" ],
                        [ "stmtList", [ 'expr-stmt',
                            [ "call",
                                [ "select", [ "id", "task" ], "sendMessage" ],
                                [
                                    [ "id", "$bar" ],
                                    [ "arrayLiteral", [] ],
                                    [
                                        "function",
                                        null,
                                        [ "res1" ],
                                        [ "stmtList", [ 'expr-stmt',
                                            [ "call",
                                                [ "select", [ "id", "task" ], "sendMessage" ],
                                                [
                                                    [ "id", "$baz" ],
                                                    [ "arrayLiteral", [ [ "sub", [ "subscript", [ "id", "res0" ], [ "num", "0" ] ],
                                                        [ "subscript", [ "id", "res1" ], [ "num", "0" ] ] ] ] ],
                                                    [ "function", null, [ "res2" ],
                                                        [ "stmtList" ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "several nested applications": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'quux'},
                args: [{
                    type: 'application',
                    address: {type: 'id', name: 'baz'},
                    args: [{
                        type: 'op',
                        op: '-',
                        left: {
                            type: 'application',
                            address: {type: 'id', name: 'foo'},
                            args: []
                        },
                        right: {
                            type: 'application',
                            address: {type: 'id', name: 'bar'},
                            args: []
                        }
                    }]}]}
        };

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ 'stmtList', [ 'expr-stmt',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'function',
                        null,
                        [ 'res0' ],
                        [ 'stmtList', [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                [ [ 'id', '$bar' ],
                                    [ 'arrayLiteral', [] ],
                                    [ 'function',
                                        null,
                                        [ 'res1' ],
                                        [ 'stmtList', [ 'expr-stmt',
                                            [ 'call',
                                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                                [ [ 'id', '$baz' ], [ "arrayLiteral",
                                                    [ [ "sub", [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], [ "subscript", [ "id", "res1" ], [ "num", "0" ]] ] ] ], [
                                                        "function",
                                                        null,
                                                        [ "res2" ],
                                                        [ "stmtList", [ 'expr-stmt', [ "call", [ "select", [ "id", "task" ], "sendMessage" ],
                                                                [
                                                                    [ "id", "$quux" ],
                                                                    [ "arrayLiteral", [ [ "subscript", [ "id", "res2" ], [ "num", "0" ]] ] ],
                                                                    [ "function", null, [ "res3" ], [ "stmtList" ] ]
                                                                ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "application in async message": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'message',
                address: {
                    type: 'select',
                    set: {
                        type: 'select',
                        set: {type: 'id', name: 'io'},
                        member: 'stdout'
                    },
                    member: 'write'
                },
                args: [{
                    type: 'interpolation',
                    left: '',
                    middle: {
                        type: 'application',
                        address: {type: 'id', name: 'factorial'},
                        args: [{
                            type: 'subscript',
                            list: {type: 'id', name: 'args'},
                            index: {type: 'number', val: '0'}
                        }]
                    },
                    right: '\\n'
                }]
            }
        };

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$factorial' ],
                            [ 'arrayLiteral',
                                [ [ 'subscript', [ 'id', '$args' ], [ 'num', '0' ] ] ] ],
                            [ 'function',
                                null,
                                [ 'res0' ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'stmtList',
                                            [ 'call',
                                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                                [ [ 'select', ['select', [ 'id', '$io' ], 'stdout'], 'write' ],
                                                    [ 'arrayLiteral', [[
                                                        "add", [
                                                            "add",
                                                            [ "string", "" ], [ "subscript", [ "id", "res0" ], [ "num", "0" ] ] ], [ "string", "\\n" ]
                                                    ] ] ], [ 'null' ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};


module.exports["with handlers"] = {

    "application with reply handler": function (test) {

        // findWords("hello") -> (rest) {
        //     reply "hello";
        // };

        var node = {
            type: 'application_stmt',
            application: {
                type: 'message',
                address: {
                    type: 'id',
                    name: 'findWords'
                },
                args: [{
                    type: 'string',
                    val: 'hello'
                }],
                "subsequent": {
                    "type": "procedure",
                    "params": ["rest"],
                    "body": {
                        "type": "stmt_list",
                        "head": {
                            "type": "response",
                            "channel": "reply",
                            "args": [
                                {
                                    "type": "string",
                                    "val": "hello"
                                }
                            ]
                        },
                        "tail": null
                    },
                    "channel": "reply"
                }
            }
        };

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'stmtList',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$findWords' ],
                            [ 'arrayLiteral', [ [ 'string', 'hello' ] ] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$rest' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt',
                                            [ 'assign',
                                                [ 'id', '$rest' ],
                                                [ 'subscript', ["id", "args"], ["num", "0"] ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', ["select", [ "id", "task" ], "respond"], [ [ "string", "reply" ],
                                                [ "arrayLiteral", [ [ "string", "hello" ] ] ] ] ] ],
                                            [ 'stmtList', [ 'return' ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    },


    "application with fail handler": function (test) {

        // findWords("hello") on fail -> (rest) {
        //     reply "hello";
        // };

        var node = {
            type: 'application_stmt',
            application: {
                type: 'message',
                address: {
                    type: 'id',
                    name: 'findWords'
                },
                args: [{
                    type: 'string',
                    val: 'hello'
                }],
                "contingency": {
                    "type": "procedure",
                    "params": ["rest"],
                    "body": {
                        "type": "stmt_list",
                        "head": {
                            "type": "response",
                            "channel": "reply",
                            "args": [
                                {
                                    "type": "string",
                                    "val": "hello"
                                }
                            ]
                        },
                        "tail": null
                    },
                    "channel": "fail"
                }
            }
        };

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'stmtList',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$findWords' ],
                            [ 'arrayLiteral', [ [ 'string', 'hello' ] ] ],
                            [ 'null' ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$rest' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt',
                                            [ 'assign',
                                                [ 'id', '$rest' ],
                                                [ 'subscript', ["id", "args"], ["num", "0"] ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', ["select", [ "id", "task" ], "respond"], [ [ "string", "reply" ],
                                                [ "arrayLiteral", [ [ "string", "hello" ] ] ] ] ] ],
                                            [ 'stmtList', [ 'return' ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};