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
                new Lo.assignment(
                    '*=',
                    new Lo.identifier('result'),
                    new Lo.requestExpr(
                        new Lo.identifier('bar'),
                        [new Lo.literal('number', '42')]
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
                                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                    [ [ 'id', '$bar' ],
                                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                                        [ 'function',
                                            null,
                                            [ 'res0' ],
                                            [ 'stmtList', [ 'expr-stmt',
                                                [ "assign", [ "id", "$result" ], [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ], "*="] ] ] ],
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
                    [new Lo.literal('string', 'hello')],
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
                                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                        [ [ 'id', '$write' ],
                                            [ 'arrayLiteral', [ [ "string", "hello" ] ] ],
                                            [ 'null' ],
                                            [ 'null' ] ] ] ] ] ] ] ] ];

        test.deepEqual(node.compile(new Context()).renderTree(), result);
        test.done();
    }
};
