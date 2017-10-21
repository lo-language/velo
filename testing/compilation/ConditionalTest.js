/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var LoContext = require('../../codegen/LoContext');
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
                new Lo.assign(
                    new Lo.identifier('bar'),
                    new Lo.number('42')
                )
            )
        );

        test.deepEqual(node.compile2(new LoContext().createInner(), new JsStmt()).renderTree(),
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ]);
        test.done();
    },

    "positive and negative blocks": function (test) {

        // should create a context
        // should call compile on each statement

        var node = new Lo.conditional(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assign(
                    new Lo.identifier('bar'),
                    new Lo.number('42')
                )
            ),
            new Lo.stmtList(
                new Lo.assign(
                    new Lo.identifier('bar'),
                    new Lo.number('32')
                )
            )
        );

        var stmt = new JsStmt();

        test.deepEqual(node.compile2(new LoContext().createInner(), stmt).renderTree(),
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '32' ] ] ] ] ]);

        test.equal(stmt.branches.length, 2);

        test.done();
    },

    "with else if": function (test) {

        // should create a context
        // should call compile on each statement

        var node = new Lo.conditional(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assign(
                    new Lo.identifier('bar'),
                    new Lo.number('42')
                )
            ),
            new Lo.conditional(
                new Lo.identifier('bar'),
                new Lo.stmtList(
                    new Lo.assign(
                        new Lo.identifier('bar'),
                        new Lo.number('32')
                    )
                ),
                new Lo.stmtList(
                    new Lo.assign(
                        new Lo.identifier('baz'),
                        new Lo.number('82')
                    )
                )
            )
        );

        test.deepEqual(node.compile2(new LoContext().createInner(), new JsStmt()).renderTree(),
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ],
                    [ 'if',
                        [ 'id', '$bar' ],
                        [ 'stmtList',
                            [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '32' ] ] ] ],
                        [ 'stmtList',
                            [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '82' ] ] ] ] ] ]);
        test.done();
    }
};

module.exports["async"] = {

    "true-block-only with async body creates else and cond": function (test) {

        // todo test we don't create conts when not necessary

        // should create a context
        // should call compile on each statement

        var node = new Lo.stmtList(
            new Lo.conditional(
                new Lo.identifier('foo'),
                new Lo.stmtList(
                    new Lo.assign( new Lo.identifier('bar'), new Lo.requestExpr(new Lo.identifier('foo'), []))
                )
            ),
            new Lo.stmtList(
                new Lo.assign( new Lo.identifier('baz'), new Lo.identifier('ball'))
            ));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(), [ 'stmtList',
            [ 'if',
                [ 'id', '$foo' ],
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
                                            [ 'assign',
                                                [ 'id', '$bar' ],
                                                [ 'subscript', [ "id", "res0" ], [ "num", "0" ] ] ] ],
                                        [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ] ] ],
                                [ 'null' ] ] ] ] ],
                [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'k0' ], [] ] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'k0',
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign', [ 'id', '$baz' ], [ 'id', '$ball' ] ] ] ] ] ] ]);

        // test.equal(new Context().createInner().compile2(node).renderTree(),
        //     "var cont0 = function () {};if ($foo) {task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\n$bar = P0;\ncont0();}, null);\n\n}\n\nelse {cont0();}\n\n");
        test.done();
    },

    // "bug": function (test) {
    //
    //     var node = new Lo.procedure(
    //         ['test'],
    //         new Lo.stmtList(
    //             new Lo.conditional(
    //                 new Lo.identifier('out'),
    //                 new Lo.stmtList(
    //                     new Lo.requestStmt(
    //                         new Lo.identifier('write'),
    //                         [new Lo.identifier('summary')],
    //                         null, null, true
    //                     )
    //                 )
    //             )
    //         ),
    //         true
    //     );
    //
    //     test.deepEqual(node.compile2(new Context().createInner()).renderJs(), "");
    //     test.done();
    // }

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
//         test.equal(new Context().createInner().compile2(node).renderTree(),
//             'if ($foo) {task.respond("reply", [42]);\nreturn;}\n\n');
//         test.done();
//     }
// };


// module.exports["basics"] = {
//
//     "no following stmts renders without continuation": function (test) {
//
//         var stmt = new AsyncCond(JS.ID('$foo'), new JsStmt(), null, new Wrapper(), new Context());
//
//         test.equal(stmt.isAsync(), false);
//
//         // if no following statements, don't need continuation
//         test.deepEqual(stmt.renderTree(), ['stmtList', ['if', ['id', '$foo'], ['stmtList']]]);
//
//         // now try attaching a stmt
//         stmt.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('48')))));
//
//         test.deepEqual(stmt.renderTree(), [ 'stmtList',
//             [ 'const',
//                 'cont0',
//                 [ 'function',
//                     null,
//                     [],
//                     [ 'stmtList',
//                         [ 'expr-stmt',
//                             [ 'assign', [ 'id', '$bazball' ], [ 'num', '48' ] ] ] ] ] ],
//             [ 'stmtList',
//                 [ 'if',
//                     [ 'id', '$foo' ],
//                     [ 'stmtList',
//                         [ 'expr-stmt', [ 'call', [ 'id', 'cont0' ], [] ] ] ],
//                     [ 'stmtList',
//                         [ 'expr-stmt', [ 'call', [ 'id', 'cont0' ], [] ] ] ] ] ] ]);
//
//         test.done();
//     },
//
//     "async predicate": function (test) {
//
//         var asyncCall = new Wrapper();
//         asyncCall.pushRequest(new Request(JS.ID('$foo'), [], null, null, true));
//
//         var stmt = new AsyncCond(JS.ID('$foo'), asyncCall.wrap(new JsStmt()), null, new Wrapper());
//
//         test.equal(stmt.isAsync(), true);
//
//         test.deepEqual(stmt.renderTree(), [ 'stmtList',
//             [ 'if',
//                 [ 'id', '$foo' ],
//                 [ 'stmtList',
//                     [ 'expr-stmt',
//                         [ 'call',
//                             [ 'select', [ 'id', 'task' ], 'sendMessage' ],
//                             [ [ 'id', '$foo' ],
//                                 [ 'arrayLiteral', [] ],
//                                 [ 'function', null, [ 'res0' ], [ 'stmtList' ] ] ] ] ] ] ] ]);
//
//         test.done();
//     }
};