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

        ctx.pushBlockingCall = function (req) {

            test.deepEqual(req.getTree(), [ 'stmtList',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ], [ 'arrayLiteral', [] ] ] ] ]);

            return 'blocker';
        };

        var result = ctx.compile(node);

        // should put a blocker into the context and return a placeholder

        test.equal(result, 'blocker');

        // test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n');
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

        ctx.pushBlockingCall = function (req) {

            test.deepEqual(req.getTree(), [ 'stmtList',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ], [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ]);

            return 'blocker';
        };

        var result = ctx.compile(node);

        test.equal(result, 'blocker');
        // test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [42], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n');
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

        ctx.pushBlockingCall = function (req) {

            test.deepEqual(req.getTree(), [ 'stmtList',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ], [ 'arrayLiteral', [ [ 'num', '42' ], [ 'string', 'hi there' ] ] ] ] ] ]);

            return 'blocker';
        };

        var result = ctx.compile(node);

        test.equal(result, 'blocker');

        // test.equal(JsConstruct.makeStatement(result).render(), "task.sendMessage($foo, [42, 'hi there'], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n");
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
            ['P0', [ 'stmtList',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ], [ 'arrayLiteral', [] ] ] ] ] ],
            ['P1', [ 'stmtList',
                ['call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$bar' ], [ 'arrayLiteral', [] ] ] ] ] ],
            ['P2', [ 'stmtList',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$baz' ],
                        [ 'arrayLiteral', [ [ 'id', 'P0' ], [ 'id', 'P1' ] ] ] ] ] ] ]
        ];

        ctx.pushBlockingCall = function (req) {

            var exp = swaps.shift();

            test.deepEqual(req.getTree(), exp[1]);

            return JS.ID(exp[0]);
        };

        var result = ctx.compile(node);

        test.deepEqual(result.getTree(), [ 'id', 'P2' ]);
        // test.equal(JsConstruct.makeStatement(result).render(), "task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($bar, [], function (res) {\nvar P1 = res ? res[0] : null;\ntask.sendMessage($baz, [P0, P1], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n}, null);\n\n}, null);\n\n");
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

        test.deepEqual(result.getTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                    [ 'function', null, 'res', [ 'stmtList', [ 'id', 'P0' ] ] ] ] ] ] );

        // test.equal(a.render(), 'task.sendMessage($foo, [42], function (res) {\nvar P0 = res ? res[0] : null;\n}, null);\n\n');

        // add a statement - should be tucked inside the replyhandler
        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID("foo"), JS.ID("bar")))));

        test.deepEqual(result.getTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                    [ 'function', null, 'res',
                        [ 'stmtList',
                            [ 'id', 'P0' ],
                            [ "stmtList",
                                [ "expr-stmt", [ "assign", [ "id", "foo" ], [ "id", "bar" ]
                            ]
                        ] ] ] ] ] ] ] );

        // test.equal(a.render(), 'task.sendMessage($foo, [42], function (res) {\nvar P0 = res ? res[0] : null;\nfoo = bar;}, null);\n\n');

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

        test.deepEqual(result.getTree(), [ "stmtList",
            [ "call",
                [ "select", [ "id", "task" ], "sendMessage" ],
                [
                    [ "id", "$foo" ],
                    [ "arrayLiteral", [] ],
                    [ "function", null, "res",
                        [ "stmtList",
                            [ "call",
                                [ "select", [ "id", "task" ], "sendMessage" ],
                                [
                                    [ "id", "$bar" ],
                                    [ "arrayLiteral", [] ],
                                    [
                                        "function",
                                        null,
                                        "res",
                                        [ "stmtList",
                                            [ "call",
                                                [ "select", [ "id", "task" ], "sendMessage" ],
                                                [
                                                    [ "id", "$baz" ],
                                                    [ "arrayLiteral", [ [ "sub", [ "id", "P0" ], [ "id", "P1" ] ] ] ],
                                                    [ "function", null, "res",
                                                        [ "stmtList", [ "id", "P2" ] ] ] ] ] ] ] ] ] ] ] ] ] ] );

        // test.equal(new Context().compile(node).render(),
        //     "task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($bar, [], function (res) {\nvar P1 = res ? res[0] : null;\ntask.sendMessage($baz, [(P0 - P1)], function (res) {\nvar P0 = res ? res[0] : null;\n}, null);\n\n}, null);\n\n}, null);\n\n");
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

        test.deepEqual(result.getTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'function',
                        null,
                        'res',
                        [ 'stmtList',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                [ [ 'id', '$bar' ],
                                    [ 'arrayLiteral', [] ],
                                    [ 'function',
                                        null,
                                        'res',
                                        [ 'stmtList',
                                            [ 'call',
                                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                                [ [ 'id', '$baz' ], [ "arrayLiteral",
                                                    [ [ "sub", [ "id", "P0" ], [ "id", "P1" ] ] ] ], [
                                                        "function",
                                                        null,
                                                        "res",
                                                        [ "stmtList", [ "call", [ "select", [ "id", "task" ], "sendMessage" ],
                                                                [
                                                                    [ "id", "$quux" ],
                                                                    [ "arrayLiteral", [ [ "id", "P2" ] ] ],
                                                                    [ "function", null, "res", [ "stmtList", [ "id", "P3" ] ] ]
                                                                ] ] ] ] ] ] ] ] ] ] ] ] ] ] ]);

        // test.equal(new Context().compile(node).render(),
        //     "task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($bar, [], function (res) {\nvar P1 = res ? res[0] : null;\ntask.sendMessage($baz, [(P0 - P1)], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($quux, [P0], function (res) {\nvar P0 = res ? res[0] : null;\n}, null);\n\n}, null);\n\n}, null);\n\n}, null);\n\n");
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

        // test.deepEqual(result.getTree(), [ ]);

        // test.equal(new Context().compile(node).render(),
        //     "task.sendMessage($factorial, [$args[0]], function (res) {\nvar P0 = res ? res[0] : null;\ntask.sendMessage($io.stdout.write, ['' + P0 + '\\n'], null, null);\n}, null);\n\n");

        test.done();
    }
};
