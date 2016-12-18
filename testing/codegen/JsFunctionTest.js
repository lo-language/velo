/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const JsFunction = require('../../codegen/JsFunction');

module.exports["append"] = {

    "simple stmts": function (test) {

        var fn = new JsFunction(['a', 'b'], JS.stmtList(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('42')))));

        test.deepEqual(fn.renderTree(), [ 'function',
            null,
            [ 'a', 'b' ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ]);

        fn.appendStmt(JS.exprStmt(JS.assign(JS.ID('$bar'), JS.num('57'))));

        test.deepEqual(fn.renderTree(), [ 'function',
            null,
            [ 'a', 'b' ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ] ] ] ]);

        fn.appendStmt(JS.exprStmt(JS.assign(JS.ID('$baz'), JS.num('33'))));

        test.deepEqual(fn.renderTree(), [ 'function',
            null,
            [ 'a', 'b' ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$baz' ], [ 'num', '33' ] ] ] ] ] ] ]);

        test.done();
    }
};