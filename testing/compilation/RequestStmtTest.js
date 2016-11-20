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
                                        [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ],
                        [ 'call', [ 'id', 'cont' ], [] ] ] ] ],
            [ 'stmtList', [ 'function', 'cont', [], [ 'stmtList' ] ] ] ]);

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
                                        [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ],
                        [ 'call', [ 'id', 'cont' ], [] ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'cont',
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
                        [ 'call', [ 'id', 'cont' ], [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ] ] ] ],
            [ 'stmtList', [ 'function', 'cont', [], [ 'stmtList' ] ] ] ]);

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
                                            [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$bar' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ] ] ] ],
                [ 'stmtList', [ 'function', 'cont', [], [ 'stmtList' ] ] ] ]);

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
                                            [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ],
                            [ 'function',
                                null,
                                [ 'args' ],
                                [ 'stmtList',
                                    [ 'var', '$bar' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ] ] ] ],
                [ 'stmtList', [ 'function', 'cont', [], [ "stmtList", [
                    "expr-stmt",
                        [ "assign", [ "id", "$bazball" ], [ "num", "42" ] ] ] ] ] ] ]);

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
    }
};