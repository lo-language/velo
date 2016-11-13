/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Context = require('../../codegen/Context');
var JS = require('../../codegen/JsPrimitives');
var JsStmt = require('../../codegen/JsStmt');
var util = require('util');
const Lo = require('../../constructs');


module.exports["sync"] = {

    "positive only": function (test) {

        // should create a context
        // should call compile on each statement

        var node = new Lo.conditional(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assignment('=',
                    new Lo.identifier('bar'),
                    new Lo.literal('number', '42')
                )
            )
        );

        test.deepEqual(node.compile(new Context().createInner()).renderTree(),
            [ 'stmtList',
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ] ]);
        test.done();
    },

    "positive and negative blocks": function (test) {

        // should create a context
        // should call compile on each statement

        var node = new Lo.conditional(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assignment('=',
                    new Lo.identifier('bar'),
                    new Lo.literal('number', '42')
                )
            ),
            new Lo.stmtList(
                new Lo.assignment('=',
                    new Lo.identifier('bar'),
                    new Lo.literal('number', '32')
                )
            )
        );

        test.deepEqual(node.compile(new Context().createInner()).renderTree(),
            [ 'stmtList',
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '32' ] ] ] ] ] ]);
        test.done();
    },

    "with else if": function (test) {

        // should create a context
        // should call compile on each statement

        var node = new Lo.conditional(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assignment('=',
                    new Lo.identifier('bar'),
                    new Lo.literal('number', '42')
                )
            ),
            new Lo.conditional(
                new Lo.identifier('bar'),
                new Lo.stmtList(
                    new Lo.assignment('=',
                        new Lo.identifier('bar'),
                        new Lo.literal('number', '32')
                    )
                ),
                new Lo.stmtList(
                    new Lo.assignment('=',
                        new Lo.identifier('baz'),
                        new Lo.literal('number', '82')
                    )
                )
            )
        );

        test.deepEqual(node.compile(new Context().createInner()).renderTree(),
            [ 'stmtList',
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ],
                    [ 'stmtList',
                        [ 'if',
                            [ 'id', '$bar' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '32' ] ] ] ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '82' ] ] ] ] ] ] ] ]);
        test.done();
    }
};

// module.exports["async"] = {
//
//     "positive with async body creates else": function (test) {
//
//         // should create a context
//         // should call compile on each statement
//
//         var node = {
//             type: 'conditional',
//             predicate: {type: 'id', name: 'foo'},
//             consequent: {
//                 type: 'stmt_list',
//                 head: {type: 'assign', op: '=',
//                     left: {type: 'id', name: 'bar'},
//                     right: {type: 'application', address: {type: 'id', name: 'foo'}, args: []}},
//                 tail: null}
//         };
//
//         test.equal(new Context().createInner().compile(node).renderTree(),
//             "var cont0 = function () {};if ($foo) {task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\n$bar = P0;\ncont0();}, null);\n\n}\n\nelse {cont0();}\n\n");
//         test.done();
//     },
//
//     "nested ifs create separate continuations": function (test) {
//         // todo
//         test.done();
//     },
//
//     "nested ifs collapse to else if": function (test) {
//         // todo
//         test.done();
//     },
//
//     "continuation skipped after response": function (test) {
//
//         // should create a context
//         // should call compile on each statement
//
//         var node = {
//             type: 'conditional',
//             predicate: {type: 'id', name: 'foo'},
//             consequent: {
//                 type: 'stmt_list',
//                 head: {
//                     type: 'response',
//                     channel: 'reply',
//                     args: [
//                         {type: 'number', val: '42'}
//                     ]},
//                 tail: null}
//         };
//
//         test.equal(new Context().createInner().compile(node).renderTree(),
//             'if ($foo) {task.respond("reply", [42]);\nreturn;}\n\n');
//         test.done();
//     }
// };
