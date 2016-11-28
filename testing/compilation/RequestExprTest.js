/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const util = require('util');

module.exports["blocking calls"] = {


    "expr args": function (test) {

        var node = new Lo.response('reply', [new Lo.binaryOpExpr(
            '*',
            new Lo.identifier('num'),
            new Lo.requestExpr(
                new Lo.identifier('main'), [
                    new Lo.binaryOpExpr('-', new Lo.identifier('num'), new Lo.literal('number', '1'))
                ],
                true))]);

        // compile with a nice service context

        var ctx = new Context().createInner(true);

        var result = ctx.compileStmt(node);

        console.log(result.renderJs());

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$main' ],
                        [ 'arrayLiteral',
                            [ [ 'sub', [ 'id', '$num' ], [ 'num', '1' ] ] ] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'respond' ],
                                        [ [ 'string', 'reply' ], [ 'arrayLiteral', [ ["mul",
                                            [ "id", "$num" ], [ "id", "res0" ] ] ] ] ] ] ],
                                [ 'stmtList', [ 'return' ] ] ] ],
                        [ 'null' ] ] ] ] ]);

        test.done();
    },

    "no args": function (test) {

        var node = new Lo.assignment(
            '=',
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('foo'), [], true
            )
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
                                        [ 'assign', [ 'id', '$baz' ], [ 'id', 'res0' ] ] ] ] ],
                            [ 'null' ] ] ] ] ]
            );

        test.done();
    },

    "one arg": function (test) {

        var node = new Lo.assignment(
            '=',
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('foo'), [new Lo.literal('number', '42')], true
            )
        );

        var result = new Context().compileStmt(node);

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
                                [ 'expr-stmt',
                                    [ 'assign', [ 'id', '$baz' ], [ 'id', 'res0' ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);
        test.done();
    },

    "two args": function (test) {

        var node = new Lo.assignment(
            '=',
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('foo'), [
                    new Lo.literal('number', '42'),
                    new Lo.literal('string', 'hi there')
                ], true
            )
        );

        var result = new Context().compileStmt(node);

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral',
                            [ [ 'num', '42' ], [ 'string', 'hi there' ] ] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'assign', [ 'id', '$baz' ], [ 'id', 'res0' ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);
        test.done();
    },

    "with nested requests": function (test) {


        var node = new Lo.assignment(
            '=',
            new Lo.identifier('baz'),
            new Lo.requestExpr(
                new Lo.identifier('baz'), [
                    new Lo.requestExpr(
                        new Lo.identifier('foo'), [], true
                    ),
                    new Lo.requestExpr(
                        new Lo.identifier('bar'), [], true
                    )
                ], true
            )
        );

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
                                            [ 'function', null, [ 'res1' ], [ 'stmtList', [ "expr-stmt",
                                                [ "call",
                                                    [ "select",
                                                        [ "id", "task" ], "sendMessage" ],
                                                    [
                                                        [ "id", "$baz" ],
                                                        [ "arrayLiteral", [ [ "id", "res0" ], [ "id", "res1" ] ] ],
                                                        [ "function",
                                                            null,
                                                            [ "res2" ],
                                                            [ "stmtList",
                                                                [ "expr-stmt",
                                                                    [ "assign", [ "id", "$baz" ], [ "id", "res2" ] ]
                                                                ] ] ],
                                                        [ "null" ] ] ] ] ] ],
                                            [ 'null' ] ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);
        test.done();
    }
};


