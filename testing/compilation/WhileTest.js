/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 12/9/17.
 */

"use strict";

const While = require('../../constructs/While');
const Lo = require('../../constructs/index');
const LoContext = require('./../../compiler/LoContext');
const JsWriter = require('./../../codegen/JsWriter');

module.exports['basics'] = {

    "intact case": function (test) {

        var body = new Lo.stmtList(new Lo.assign(new Lo.identifier('bar'), new Lo.number('57')));

        var loop = new While(new Lo.identifier('foo'), body);
        var stack = [];

        // compiling a stmt returns a graph
        var js = new JsWriter().generateJs(loop.compile(new LoContext(), stack));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['while',
                ['id', '$foo'], ['stmtList',
                ['expr-stmt', ['assign', ['id', '$bar'], ['num', '57']]]]]]);
        test.done();
    },

    "req in cond": function (test) {

        var body = new Lo.stmtList(new Lo.assign(new Lo.identifier('bar'), new Lo.number('57')));

        var loop = new While(new Lo.requestExpr(new Lo.identifier('foo'), [], true), body);
        var stack = [];

        // compiling a stmt returns a control flow graph
        var js = new JsWriter().generateJs(loop.compile(new LoContext(), stack));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['expr-stmt',
                ['call', ['function', 'L1', [], ['stmtList', ['expr-stmt', ['call', ['select', ['id', 'task'], 'sendAndBlock'], [['id', '$foo'], ['arrayLiteral', []], ['function', null, ['res0'], ['stmtList', ['if', ["subscript", ["id", "res0"], ["num", "0"]], ["stmtList", ["expr-stmt", ["assign", ["id", "$bar"], ["num", "57"]]], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L1"]]]]]]
                ]]]]],
                    ['null']]]]]],
                    []]]]);
        test.done();
    },

    "blocking req in body": function (test) {

        // while foo {
        //   bar <- 57;
        // }

        var loop = new While(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.requestStmt(
                    new Lo.identifier('bar'),
                    [new Lo.number('57')],
                    null,
                    null,
                    true
                )
            )
        );

        var js = new JsWriter().generateJs(loop.compile(new LoContext()));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['expr-stmt',
                ['call',
                    ['function',
                        'L1',
                        [],
                        ['stmtList',
                            ['if',
                                ['id', '$foo'],
                                ['stmtList',
                                    ['expr-stmt',
                                        ['call',
                                            ['select', ['id', 'task'], 'sendAndBlock'],
                                            [['id', '$bar'],
                                                ['arrayLiteral', [['num', '57']]],
                                                [ 'id', 'k0' ], [ 'id', 'k0' ] ] ] ],
                                    [ 'stmtList',
                                        ['function', 'k0', [], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L1"]]]]]]]]]]]]],
                    []]]]);
        test.done();
    },

    "req in cond and body": function (test) {

        // while foo() {
        //   bar <- 57;
        // }

        var loop = new While(
            new Lo.requestExpr(new Lo.identifier('foo'), [], true),
            new Lo.stmtList(
                new Lo.requestStmt(
                    new Lo.identifier('bar'),
                    [new Lo.number('57')],
                    null,
                    null,
                    true
                )
            )
        );

        var js = new JsWriter().generateJs(loop.compile(new LoContext()));

        test.deepEqual(js.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'function',
                        'L1',
                        [],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'call',
                                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                    [ [ 'id', '$foo' ],
                                        [ 'arrayLiteral', [] ],
                                        [ 'function',
                                            null,
                                            [ 'res0' ],
                                            [ 'stmtList', [ 'if', ["subscript",
                                                [ "id", "res0" ], [ "num", "0" ] ],
                                                [ "stmtList",
                                                [ "expr-stmt",
                                                    [ "call",
                                                        [ "select", [ "id", "task" ], "sendAndBlock" ],
                                                        [ [ "id", "$bar" ], [ "arrayLiteral", [ [ "num", "57" ] ] ], [ "id", "k0" ], [ "id", "k0" ] ]
                                                    ]
                                                ],
                                                [
                                                    "stmtList",
                                                    [
                                                        "function",
                                                        "k0",
                                                        [],
                                                        [ "stmtList",
                                                            [ "expr-stmt",
                                                                [ "call",
                                                                    [ "id", "setImmediate" ],
                                                                    [ [ "call", [ "select", [ "id", "task" ], "doAsync" ], [ [ "id", "L1" ] ] ] ] ] ]
                                                        ] ] ] ] ] ] ],
                                        [ 'null' ] ] ] ] ] ],
                    [] ] ] ]);
        test.done();
    }
};
