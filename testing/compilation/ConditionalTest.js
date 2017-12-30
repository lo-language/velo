/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../compiler/LoContext');
const JsWriter = require('../../codegen/JsWriter');

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

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList',
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

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList',
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

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList',
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

module.exports["async"] = {

    "true-block-only with async body creates else and cond": function (test) {

        // todo test we don't create conts when not necessary

        // if foo {
        //  bar = foo();
        // }
        // baz = ball;

        var node = new Lo.stmtList(
            new Lo.conditional(
                new Lo.identifier('foo'),
                new Lo.stmtList(
                    new Lo.assign(new Lo.identifier('bar'), new Lo.requestExpr(new Lo.identifier('foo'), []))
                )
            ),
            new Lo.stmtList(
                new Lo.assign( new Lo.identifier('baz'), new Lo.identifier('ball'))
            ));

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList',
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
                                [ 'assign', [ 'id', '$baz' ], [ 'id', '$ball' ] ] ] ] ]
                    ] ]);

        test.done();
    },


    "req in predicate": function (test) {

        // if report.finalize() == false {
        //   fail;
        // }

        var node = new Lo.stmtList(new Lo.conditional(
            new Lo.binaryOpExpr('==',
                new Lo.requestExpr(new Lo.select(new Lo.identifier('report'), 'finalize'), [], true),
                new Lo.boolean('false')),
            new Lo.stmtList(
                new Lo.response('fail')
            )
        ));

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext())).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
                    [ [ 'select', [ 'id', '$report' ], 'finalize' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'if',
                                    [ 'strict-eq',
                                        [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ],
                                        [ 'bool', 'true' ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt',
                                            [ 'call', [ 'select', [ 'id', 'task' ], 'fail' ], [ [ 'arrayLiteral', [] ] ] ] ],
                                        [ 'stmtList', [ 'return' ] ] ] ] ] ],
                        [ 'null' ] ] ] ] ]);

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
    //     test.deepEqual(node.compile(new Context().createInner()).renderJs(), "");
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
//         test.equal(new Context().createInner().compile(node).renderTree(),
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
//     }
};
