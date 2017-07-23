/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["service"] = {

    "basic": function (test) {

        // should actually throw an error if result isn't defined in the context
        // proc is <-> (next) { result *= bar(42); }

        var node = new Lo.procedure(
            ['next'],
            new Lo.stmtList(
                new Lo.assign(
                    new Lo.identifier('result'),
                    new Lo.requestExpr(
                        new Lo.identifier('bar'),
                        [new Lo.number('42')]
                    )
                )
            ),
            true
        );

        var result = [ 'function',
            null,
            [ 'task' ],
            [ 'stmtList',
                [ 'var', [ '$next', '$result' ] ],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign',
                                [ 'id', '$next' ],
                                [ 'subscript',
                                    [ 'select', [ 'id', 'task' ], 'args' ],
                                    [ 'num', '0' ] ] ] ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'call',
                                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                    [ [ 'id', '$bar' ],
                                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                                        [ 'function',
                                            null,
                                            [ 'res0' ],
                                            [ 'stmtList', [ 'expr-stmt',
                                                [ "assign", [ "id", "$result" ], [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ] ] ] ] ],
                                        [ 'null' ] ] ] ] ] ] ] ];

        test.deepEqual(node.compile(new Context()).renderTree(), result);
        test.done();
    },

    "args ordering": function (test) {

        // should actually throw an error if result isn't defined in the context
        // proc is <-> (args, io) { @write("hello"); }

        var node = new Lo.procedure(
            ['args', 'io'],
            new Lo.stmtList(
                new Lo.requestStmt(
                    new Lo.identifier('write'),
                    [new Lo.string('hello')],
                    false
                )
            ),
            true);

        var result = [ 'function',
            null,
            [ 'task' ],
            [ 'stmtList',
                [ 'var', [ '$args', '$io' ] ],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign',
                                [ 'id', '$args' ],
                                [ 'subscript',
                                    [ 'select', [ 'id', 'task' ], 'args' ],
                                    [ 'num', '0' ] ] ] ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'assign',
                                    [ 'id', '$io' ],
                                    [ 'subscript',
                                        [ 'select', [ 'id', 'task' ], 'args' ],
                                        [ 'num', '1' ] ] ] ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                                        [ [ 'id', '$write' ],
                                            [ 'arrayLiteral', [ [ "string", "hello" ] ] ],
                                            [ 'null' ],
                                            [ 'null' ] ] ] ] ] ] ] ] ];

        test.deepEqual(node.compile(new Context()).renderTree(), result);
        test.done();
    },

    "nested procs doesn't duplicate var declarations": function (test) {

        var node = new Lo.procedure(
            [],
            new Lo.stmtList(
                new Lo.assign(
                    new Lo.identifier('report'),
                    new Lo.string('')
                ),
                new Lo.stmtList(
                    new Lo.scan(new Lo.identifier('tests'),
                    new Lo.procedure(
                        ['test'],
                        new Lo.stmtList(
                            new Lo.assign(
                                new Lo.identifier('report'),
                                new Lo.identifier('test')
                            )
                        )
                    ))
                )
            ),
            true);

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'function',
            null,
            [ 'task' ],
            [ 'stmtList',
                [ 'var', '$report' ],
                [ 'stmtList',
                    [ 'expr-stmt',
                        [ 'assign', [ 'id', '$report' ], [ 'string', '' ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'scan' ],
                                [ [ 'id', '$tests' ],
                                    [ 'function',
                                        null,
                                        [ 'args' ],
                                        [ 'stmtList',
                                            [ 'var', '$test' ],
                                            [ 'stmtList',
                                                [ 'expr-stmt', ["assign",
                                                    [ "id", "$test" ],
                                                    [ "subscript",
                                                        [ "id", "args" ],
                                                        [ "num", "0" ]
                                                    ] ] ],
                                                [ 'stmtList', ["expr-stmt",
                                                    [ "assign",
                                                        [ "id", "$report" ],
                                                        [ "id", "$test" ] ] ] ] ] ] ] ] ] ] ] ] ] ]);
        test.done();
    }
};
