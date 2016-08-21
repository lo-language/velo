/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const JsFunction = require('../../codegen/JsFunction');
const AsyncWhile = require('../../codegen/AsyncWhile');

module.exports["basics"] = {

    "rendering": function (test) {

        var loop = new AsyncWhile(JS.ID('$foo'), new JsStmt());

        test.deepEqual(loop.renderTree(), [ 'stmtList',
            [ 'let',
                'loop',
                [ 'function',
                    null,
                    [],
                    [ 'if',
                        [ 'id', '$foo' ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'call',
                                    [ 'id', 'setImmediate' ],
                                    [ [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'doAsync' ],
                                        [ [ 'id', 'loop' ] ] ] ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        test.done();
    },

    "attach": function (test) {

        var loop = new AsyncWhile(JS.ID('$foo'), new JsStmt());

        loop.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('48')))));
        
        test.deepEqual(loop.renderTree(), [ 'stmtList',
            [ 'let',
                'loop',
                [ 'function',
                    null,
                    [],
                    [ 'if',
                        [ 'id', '$foo' ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'call',
                                    [ 'id', 'setImmediate' ],
                                    [ [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'doAsync' ],
                                        [ [ 'id', 'loop' ] ] ] ] ] ] ],
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'assign', [ 'id', '$bazball' ], [ 'num', '48' ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        test.done();
    }
};