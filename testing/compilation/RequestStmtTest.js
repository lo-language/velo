/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../codegen/LoContext');
const JsStmt = require('../../codegen/JsStmt');

const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["blocking"] = {

    "with reply handler and no following stmts": function (test) {

        var node = new Lo.requestStmt(
                new Lo.identifier('foo'),
                [],
                new Lo.procedure(
                    [],
                    new Lo.stmtList(
                        new Lo.assign(
                            new Lo.identifier('baz'),
                            new Lo.number('42')
                        )
                    )
                ),
                null,
                true
            );

        var result = node.compile2(new LoContext(), new JsStmt());

        test.deepEqual(result.renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$baz' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '42' ] ] ] ] ] ],
                            [ 'null' ] ] ] ]);

        test.done();
    },

    "with reply handler and following stmts": function (test) {

        var node = new Lo.stmtList(
            new Lo.requestStmt(
                new Lo.identifier('foo'),
                [],
                new Lo.procedure(
                    [],
                    new Lo.stmtList(
                        new Lo.assign(
                            new Lo.identifier('baz'),
                            new Lo.number('42')
                        )
                    )
                ),
                null,
                true
            ),
            new Lo.stmtList(
                new Lo.assign(new Lo.identifier('bazball'), new Lo.number('42'))));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
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
                                        [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ] ] ] ],
                        [ 'id', 'k0' ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'k0',
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
                        new Lo.assign(
                            new Lo.identifier('foo'),
                            new Lo.number('42')
                        )
                    )
                ),
                true
            );

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'null' ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "contingency handler and following stmts": function (test) {

        var node = new Lo.stmtList(
            new Lo.requestStmt(
                new Lo.identifier('foo'),
                [],
                null,
                new Lo.procedure(
                    [],
                    new Lo.stmtList(
                        new Lo.assign(
                            new Lo.identifier('baz'),
                            new Lo.number('42')
                        )
                    )
                ),
                true
            ),
            new Lo.stmtList(
                new Lo.assign(new Lo.identifier('bazball'), new Lo.number('42'))));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'id', 'k0' ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$baz' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '42' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'k0',
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign', [ 'id', '$bazball' ], [ 'num', '42' ] ] ] ] ] ] ]);

        test.done();
    },

    "with both handlers and following stmt": function (test) {

        var reqStmt = new Lo.requestStmt(
                new Lo.identifier('foo'),
                [],
                new Lo.procedure(
                    [],
                    new Lo.stmtList(
                        new Lo.assign(
                            new Lo.identifier('foo'),
                            new Lo.number('42')
                        )
                    )
                ),
                new Lo.procedure(
                    [],
                    new Lo.stmtList(
                        new Lo.assign(
                            new Lo.identifier('bar'),
                            new Lo.number('57')
                        )
                    )
                ),
                true
            );

        test.deepEqual(reqStmt.compile2(new LoContext(), new JsStmt()).renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
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
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ] ] ] ] ] ] ]);


        var node = new Lo.stmtList(reqStmt,
            new Lo.stmtList(
                new Lo.assign(new Lo.identifier('bazball'), new Lo.number('42'))));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
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
                                            [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ] ] ] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$bar' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ] ] ] ] ] ] ],
                [ 'stmtList', [ 'function', 'k0', [], [ "stmtList", [
                    "expr-stmt",
                        [ "assign", [ "id", "$bazball" ], [ "num", "42" ] ] ] ] ] ] ]);

        test.done();
    },

    "request with one arg and no handlers": function (test) {

        var reqStmt = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [new Lo.number('42')],
            null,
            null,
            true
        );

        var result = reqStmt.compile2(new LoContext(), new JsStmt());

        test.deepEqual(result.renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                            [ 'null' ],
                            [ 'null' ] ] ] ]);

        // attach a statement - should be tucked inside the replyhandler
        result = new Lo.stmtList(reqStmt,
            new Lo.stmtList(new Lo.assign(new Lo.identifier('foo'), new Lo.identifier('bar')))).compile2(new LoContext(), new JsStmt());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                        [ 'id', 'k0' ],
                        [ 'id', 'k0' ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'k0',
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'id', '$bar' ] ] ] ] ] ] ]);

        test.done();
    },

    "with embedded blocking expr": function (test) {

        // baz(foo() - bar());

        var node = new Lo.stmtList(
            new Lo.requestStmt(
                new Lo.identifier('baz'),
                [
                    new Lo.binaryOpExpr('-',
                        new Lo.requestExpr(new Lo.identifier('foo'), [], true),
                        new Lo.requestExpr(new Lo.identifier('bar'), [], true))
                ],
                null,
                null,
                true
            ));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                        [ [ 'id', '$bar' ],
                                            [ 'arrayLiteral', [] ],
                                            [ 'function',
                                                null,
                                                [ 'res1' ],
                                                [ 'stmtList', [
                                                    "expr-stmt",
                                                    [
                                                        "call",
                                                        [ "select", [ "id", "task" ], "sendAndBlock" ],
                                                        [
                                                            [ "id", "$baz" ],
                                                            [ "arrayLiteral", [ [ "sub", [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], [ "subscript", [ "id", "res1" ], [ "num", "0" ] ] ] ] ],
                                                            [ "null" ],
                                                            [ "null" ]
                                                        ]
                                                    ]
                                                ] ] ],
                                            [ 'null' ] ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);

        node.append(new Lo.stmtList(
            new Lo.assign(
                new Lo.identifier('bazball'),
                new Lo.number(12)
            )
        ));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [] ],
                            [ 'function',
                                null,
                                [ 'res0' ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'call',
                                            [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                            [ [ 'id', '$bar' ],
                                                [ 'arrayLiteral', [] ],
                                                [ 'function', null, [ 'res1' ], [ 'stmtList', [ "expr-stmt",
                                                    [ "call",
                                                        [ "select", [ "id", "task" ], "sendAndBlock" ],
                                                        [
                                                            [ "id", "$baz" ],
                                                            [
                                                                "arrayLiteral",
                                                                [
                                                                    [
                                                                        "sub",
                                                                        [ "subscript", [ "id", "res0" ], [ "num", "0" ] ],
                                                                        [ "subscript", [ "id", "res1" ], [ "num", "0" ] ]
                                                                    ]
                                                                ]
                                                            ],
                                                            [ "id", "k0" ],
                                                            [ "id", "k0" ]
                                                        ] ] ],
                                                    [ 'stmtList',
                                                        [ 'function',
                                                            'k0',
                                                            [],
                                                            [ 'stmtList',
                                                                [ 'expr-stmt',
                                                                    [ 'assign', [ 'id', '$bazball' ], [ 'num', 12 ] ] ] ] ] ] ] ],
                                                [ 'null' ] ] ] ] ] ],
                            [ 'null' ] ] ] ] ]);

        test.done();
    },

    "several nested applications": function (test) {

        var node = new Lo.stmtList(
            new Lo.requestStmt(
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
            ));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'function',
                        null,
                        [ 'res0' ],
                        [ 'stmtList', [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                [ [ 'id', '$bar' ],
                                    [ 'arrayLiteral', [] ],
                                    [ 'function',
                                        null,
                                        [ 'res1' ],
                                        [ 'stmtList', [ 'expr-stmt',
                                            [ 'call',
                                                [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                                [ [ 'id', '$baz' ], [ "arrayLiteral",
                                                    [ [ "sub", [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], [ "subscript", [ "id", "res1" ], [ "num", "0" ] ] ] ] ], [
                                                    "function",
                                                    null,
                                                    [ "res2" ],
                                                    [ "stmtList", [ 'expr-stmt', [ "call", [ "select", [ "id", "task" ], "sendAndBlock" ],
                                                        [
                                                            [ "id", "$quux" ],
                                                            [ "arrayLiteral", [ [ "subscript", [ "id", "res2" ], [ "num", "0" ] ] ] ],
                                                            [ "null" ] ,
                                                            [ "null" ] ] ] ] ] ],
                                                    [ "null" ]
                                                ]
                                            ]
                                        ]
                                        ]
                                    ], [ "null" ] ] ] ] ] ], [ "null" ] ] ] ] ]);

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
                    new Lo.assign(
                        new Lo.identifier('foo'),
                        new Lo.number('42')
                    )
                )
            ),
            null,
            false
        );

        var result = node.compile2(new LoContext(), new JsStmt());

        test.deepEqual(result.renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAsync' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ],
                        [ 'null' ] ] ] ]);


        result = new Lo.stmtList(node,
            new Lo.stmtList(new Lo.assign(
                new Lo.identifier('bazball'),
                new Lo.number('42')
            ))).compile2(new LoContext(), new JsStmt());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAsync' ],
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
                    new Lo.assign(
                        new Lo.identifier('foo'),
                        new Lo.number('42')
                    )
                )
            ),
            false
        );

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'expr-stmt',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendAsync' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'null' ],
                    [ 'function',
                        null,
                        [ 'args' ],
                        [ 'stmtList',
                            [ 'var', '$foo' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "with both handlers": function (test) {

        var node = new Lo.requestStmt(
            new Lo.identifier('foo'),
            [],
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assign(
                        new Lo.identifier('foo'),
                        new Lo.number('42')
                    )
                )
            ),
            new Lo.procedure(
                [],
                new Lo.stmtList(
                    new Lo.assign(
                        new Lo.identifier('bar'),
                        new Lo.number('57')
                    )
                )
            ),
            false
        );

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAsync' ],
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
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "application in async message": function (test) {

        // @io.stdout.write("`factorial(args[0])`\n");

        // var node = new Lo.requestStmt();

        // test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
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