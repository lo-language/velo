/**
 * Created by spurcell on 7/30/16.
 */

const JS = require('../../codegen/JsPrimitives');
const Context = require('../../codegen/Context');
const JsStmt = require('../../codegen/JsStmt');
const ContStmt = require('../../codegen/ContinuedStmt');

module.exports["basics"] = {

    "without following stmts": function (test) {

        // create new cont stmt

        // could we also push a blocking stmt into the context, get a reference to it back, then use the ref, the pop it to render?

        var cs = new ContStmt('test');

        var stmt = new JsStmt(JS.cond(JS.ID('foo'), JS.exprStmt(cs.getCall()), JS.exprStmt(cs.getCall())));

        cs.setStmt(stmt);

        test.deepEqual(cs.renderTree(), [ 'stmtList',
            [ 'if',
                [ 'id', 'foo' ],
                [ 'expr-stmt', [ 'call', [ 'id', 'test' ], [] ] ],
                [ 'expr-stmt', [ 'call', [ 'id', 'test' ], [] ] ] ],
            [ 'stmtList', [ 'function', 'test', [], [ 'stmtList' ] ] ] ]);

        test.done();
    },

    "with following stmts": function (test) {

        // create new cont stmt

        // could we also push a blocking stmt into the context, get a reference to it back, then use the ref, the pop it to render?

        var cs = new ContStmt('test');

        var stmt = new JsStmt(JS.cond(JS.ID('foo'), JS.exprStmt(cs.getCall()), JS.exprStmt(cs.getCall())));

        cs.setStmt(stmt);

        // attach to it
        cs.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.ID('42')))));

        test.deepEqual(cs.renderTree(), [ 'stmtList',
            [ 'if',
                [ 'id', 'foo' ],
                [ 'expr-stmt', [ 'call', [ 'id', 'test' ], [] ] ],
                [ 'expr-stmt', [ 'call', [ 'id', 'test' ], [] ] ] ],
            [ 'stmtList',
                [ 'function',
                    'test',
                    [],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'id', '42' ] ] ] ] ] ] ]);

        test.done();
    },

    "attach returns stmt": function (test) {

        var cs = new ContStmt('test');

        var stmt = new JsStmt(JS.cond(JS.ID('foo'), JS.exprStmt(cs.getCall()), JS.exprStmt(cs.getCall())));

        cs.setStmt(stmt);

        // attach to it
        var result = cs.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.ID('42')))));

        test.equal(cs, result);

        test.done();
    }
};