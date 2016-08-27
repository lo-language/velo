/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const JsFunction = require('../../codegen/JsFunction');
const AsyncCond = require('../../codegen/AsyncCond');
const Wrapper = require('../../codegen/Wrapper');

module.exports["basics"] = {

    "rendering": function (test) {

        var asyncCall = new Wrapper();
        asyncCall.pushRequest(JS.ID('$foo'), []);

        var loop = new AsyncCond(JS.ID('$foo'), asyncCall.wrap(new JsStmt()), null, new Wrapper());

        test.deepEqual(loop.renderTree(), [ 'stmtList',
            [ 'if',
                [ 'id', '$foo' ],
                [ 'stmtList',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                        [ [ 'id', '$foo' ],
                            [ 'arrayLiteral', [] ],
                            [ 'function', null, [ 'P0' ], [ 'stmtList' ] ] ] ] ] ] ]);

        test.done();
    },

    "attach": function (test) {

        var loop = new AsyncCond(JS.ID('$foo'), new JsStmt(), null, new Wrapper());

        test.deepEqual(loop.renderTree(), [ 'stmtList', [ 'if', [ 'id', '$foo' ], [ 'stmtList' ] ] ]);

        loop.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('48')))));
        
        test.deepEqual(loop.renderTree(), [ 'stmtList',
            [ 'let',
                'cont',
                [ 'function',
                    null,
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign', [ 'id', '$bazball' ], [ 'num', '48' ] ] ] ] ] ],
            [ 'stmtList',
                [ 'if',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'call', [ 'id', 'cont' ], [] ] ] ] ] ] ]);

        test.done();
    }
};