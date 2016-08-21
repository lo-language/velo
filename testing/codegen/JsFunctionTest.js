/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const JsFunction = require('../../codegen/JsFunction');
const JsStmt = require('../../codegen/JsStmt');

module.exports["basics"] = {

    "simple fn": function (test) {

        var fn = new JsFunction(['a', 'b'], new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('42')))));

        test.deepEqual(fn.renderTree(), [ 'function',
            null,
            [ 'a', 'b' ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ]);

        fn.append(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bar'), JS.num('57')))));

        test.deepEqual(fn.renderTree(), [ 'function',
            null,
            [ 'a', 'b' ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ],
                [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ] ] ] ]);

        test.done();
    }
};