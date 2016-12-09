/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const Lo = require('../../constructs');

module.exports["blocking"] = {

    "with reply handler": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('baz'),
                        new Lo.literal('number', '42')
                    )
                )
            ),
            null,
            true
        );

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$baz' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '42' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ],
                        [ 'id', 'c0' ] ] ] ],
            [ 'stmtList', [ 'function', 'c0', [], [ 'stmtList' ] ] ] ]);

        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('42')))));

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$baz' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '42' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ],
                        [ 'id', 'c0' ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'c0',
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign', [ 'id', '$bazball' ], [ 'num', '42' ] ] ] ] ] ] ]);

        test.done();
    },

    "contingency handler only": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            null,
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('foo'),
                        new Lo.literal('number', '42')
                    )
                )
            ),
            true
        );

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'id', 'c0' ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ] ] ] ],
            [ 'stmtList', [ 'function', 'c0', [], [ 'stmtList' ] ] ] ]);

        test.done();
    },

    "with both handlers": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('foo'),
                        new Lo.literal('number', '42')
                    )
                )
            ),
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('bar'),
                        new Lo.literal('number', '57')
                    )
                )
            ),
            true
        );

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$foo' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$bar' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ] ] ] ],
                [ 'stmtList', [ 'function', 'c0', [], [ 'stmtList' ] ] ] ]);

        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('42')))));

        test.deepEqual(result.renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$foo' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$bar' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'c0' ], [] ] ] ] ] ] ] ] ] ],
                [ 'stmtList', [ 'function', 'c0', [], [ "stmtList", [
                    "expr-stmt",
                        [ "assign", [ "id", "$bazball" ], [ "num", "42" ] ] ] ] ] ] ]);

        test.done();
    },

    "request with one arg and no handlers": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [new Lo.literal('number', '42')],
            null,
            null,
            true
        );

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                        [ 'id', 'c0' ],
                        [ 'id', 'c0' ] ] ] ],
            [ 'stmtList', [ 'function', 'c0', [], [ 'stmtList' ] ] ] ]);

        // attach a statement - should be tucked inside the replyhandler
        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID("foo"), JS.ID("bar")))));

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                        [ 'id', 'c0' ],
                        [ 'id', 'c0' ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'c0',
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', 'foo' ], [ 'id', 'bar' ] ] ] ] ] ] ]);

        test.done();
    },
    "with embedded blocking expr": function (test) {

        // baz(foo() - bar());

        var node = new Lo.requestStmt(
            new Lo.identifier('baz'),
            [
                new Lo.binaryOpExpr('-',
                    new Lo.requestExpr(new Lo.identifier('foo'), [], true),
                    new Lo.requestExpr(new Lo.identifier('bar'), [], true))
            ],
            null,
            null,
            true
        );

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                        [ [ 'id', '$bar' ],
                                            [ 'arrayLiteral', [] ],
                                            [ 'function',
                                                null,
                                                [ 'res1' ],
                                                [ 'stmtList', [
                                                    "expr-stmt",
                                                    [
                                                        "call",
                                                        [ "select", [ "id", "task" ], "sendMessage" ],
                                                        [
                                                            [ "id", "$baz" ],
                                                            [ "arrayLiteral", [ [ "sub", [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], [ "subscript", [ "id", "res1" ], [ "num", "0" ] ] ] ] ],
                                                            [ "id", "c0" ],
                                                            [ "id", "c0" ]
                                                        ]
                                                    ]
                                                ], [ "stmtList",
                                                        [ "function", "c0", [], [ "stmtList" ] ] ] ] ],
                                            [ 'null' ] ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);

        test.done();
    },

    "several nested applications": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('quux'),
            [
                new Lo.requestExpr(
                    new Lo.identifier('baz'),
                    [
                        new Lo.binaryOpExpr('-',
                            new Lo.requestExpr(new Lo.identifier('foo'), [], true),
                            new Lo.requestExpr(new Lo.identifier('bar'), [], true))
                    ],
                    true
                )
            ],
            null,
            null,
            true
        );

        test.deepEqual(new Context().compileStmt(node).renderTree(), [ 'stmtList', [ 'expr-stmt',
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
                                                    [ [ "sub", [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], [ "subscript", [ "id", "res1" ], [ "num", "0" ] ] ] ] ], [
                                                    "function",
                                                    null,
                                                    [ "res2" ],
                                                    [ "stmtList", [ 'expr-stmt', [ "call", [ "select", [ "id", "task" ], "sendMessage" ],
                                                        [
                                                            [ "id", "$quux" ],
                                                            [ "arrayLiteral", [ [ "subscript", [ "id", "res2" ], [ "num", "0" ] ] ] ],
                                                            [ "id", "c0" ] ,
                                                            [ "id", "c0" ] ] ] ], [ "stmtList",
                                                            [
                                                                "function",
                                                                "c0",
                                                                [], [ "stmtList" ]
                                                            ] ] ] ],
                                                    [ "null" ]
                                                ]
                                            ]
                                        ]
                                        ]
                                    ], [ "null" ] ] ] ] ] ], [ "null" ] ] ] ]
        ]);

        test.done();
    }
};


module.exports["non-blocking"] = {

    "with reply handler": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('foo'),
                        new Lo.literal('number', '42')
                    )
                )
            ),
            null,
            false
        );

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);


        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('42')))));

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ],
                        [ 'null' ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'assign', [ 'id', '$bazball' ], [ 'num', '42' ] ] ] ] ]);

        test.done();
    },

    "contingency handler only": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            null,
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('foo'),
                        new Lo.literal('number', '42')
                    )
                )
            ),
            false
        );

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'stmtList', [ 'expr-stmt',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'null' ],
                    [ 'function',
                        null,
                        [ 'args' ],
                        [ 'stmtList',
                            [ 'var', '$foo' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "with both handlers": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('foo'),
                        new Lo.literal('number', '42')
                    )
                )
            ),
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assignment(
                        '=',
                        new Lo.identifier('bar'),
                        new Lo.literal('number', '57')
                    )
                )
            ),
            false
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'stmtList', [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$bar' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "application in async message": function (test) {

        // @io.stdout.write("`factorial(args[0])`\n");

        // var node = new Lo.requestStmt();

        // test.deepEqual(node.compile(new Context()).renderTree(),
        //     [ 'stmtList',
        //         [ 'expr-stmt',
        //             [ 'call',
        //                 [ 'select', [ 'id', 'task' ], 'sendMessage' ],
        //                 [ [ 'id', '$factorial' ],
        //                     [ 'arrayLiteral',
        //                         [ [ 'subscript', [ 'id', '$args' ], [ 'num', '0' ] ] ] ],
        //                     [ 'function',
        //                         null,
        //                         [ 'res0' ],
        //                         [ 'stmtList',
        //                             [ 'expr-stmt',
        //                                 [ 'stmtList',
        //                                     [ 'call',
        //                                         [ 'select', [ 'id', 'task' ], 'sendMessage' ],
        //                                         [ [ 'select', ['select', [ 'id', '$io' ], 'stdout'], 'write' ],
        //                                             [ 'arrayLiteral', [[
        //                                                 "add", [
        //                                                     "add",
        //                                                     [ "string", "" ], [ "subscript", [ "id", "res0" ], [ "num", "0" ] ] ], [ "string", "\\n" ]
        //                                             ] ] ], [ 'null' ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};