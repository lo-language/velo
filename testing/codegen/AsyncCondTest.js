/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const Context = require('../../codegen/Context');
const JsStmt = require('../../codegen/JsStmt');
const JsFunction = require('../../codegen/JsFunction');
const AsyncCond = require('../../codegen/AsyncCond');
const Wrapper = require('../../codegen/Wrapper');

module.exports["basics"] = {

    "no following stmts renders without continuation": function (test) {

        var stmt = new AsyncCond(JS.ID('$foo'), new JsStmt(), null, new Wrapper(), new Context());

        test.equal(stmt.isAsync(), false);

        // if no following statements, don't need continuation
        test.deepEqual(stmt.renderTree(), ['stmtList', ['if', ['id', '$foo'], ['stmtList']]]);

        // now try attaching a stmt
        stmt.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('48')))));

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'const',
                'cont0',
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
                        [ 'expr-stmt', [ 'call', [ 'id', 'cont0' ], [] ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'call', [ 'id', 'cont0' ], [] ] ] ] ] ] ]);

        test.done();
    },

    "async predicate": function (test) {

        var asyncCall = new Wrapper();
        asyncCall.pushRequest(JS.ID('$foo'), []);

        var stmt = new AsyncCond(JS.ID('$foo'), asyncCall.wrap(new JsStmt()), null, new Wrapper());

        test.equal(stmt.isAsync(), true);

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'if',
                [ 'id', '$foo' ],
                [ 'stmtList',
                    [ 'expr-stmt',
                        [ 'call',
                            [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                            [ [ 'id', '$foo' ],
                                [ 'arrayLiteral', [] ],
                                [ 'function', null, [ 'P0' ], [ 'stmtList' ] ] ] ] ] ] ] ]);

        test.done();
    }
};