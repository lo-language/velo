/**
 * Created by spurcell on 6/26/16.
 */

const JsStmt = require('../../codegen/JsStmt');
const JsFunction = require('../../codegen/JsFunction');
const JS = require('../../codegen/JsPrimitives');

module.exports["basics"] = {

    "getTree": function (test) {

        var stmt = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')));

        test.deepEqual(stmt.getTree(), ['stmtList', ['assign', ['id', '$foo'], ['num', '42']]]);
        test.equal(stmt.isFinal(), false);
        test.done();
    },

    "attach": function (test) {

        var stmt = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')));

        stmt.attach(new JsStmt(JS.assign(JS.ID('$bar'), JS.ID('$baz'))));

        test.deepEqual(stmt.getTree(),
            ['stmtList',
                ['assign', ['id', '$foo'], ['num', '42']],
                ['stmtList',
                    ['assign', ['id', '$bar'], ['id', '$baz']]]]);
        test.done();
    },

    "attach to final does nothing": function (test) {

        var stmt = new JsStmt(JS.return(), true);
        test.equal(stmt.isFinal(), true);

        stmt.attach(new JsStmt(['assign', ['id', '$bar'], ['id', '$baz']]));

        test.deepEqual(stmt.getTree(), ['stmtList', ['return']]);
        test.done();
    },

    "attach final": function (test) {

        var stmt = new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('42'))));
        test.equal(stmt.isFinal(), false);

        stmt.attach(new JsStmt(JS.return(), true));
        test.equal(stmt.isFinal(), true);

        // test.deepEqual(stmt.getTree(),
        //     [ 'stmtList',
        //         [ 'expr-stmt' [ 'assign', ['id', '$foo'], ['num', '42'] ] ],
        //         [ 'stmtList',
        //             [ 'return'] ] ]);
        test.done();
    }
};

module.exports["getTree"] = {

    "no statements": function (test) {

        var ast = JS.assign(JS.ID('$foo'), JS.num('57'));

        test.deepEqual(ast.getTree(), [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ]);

        test.done();
    },

    "statement": function (test) {

        var ast = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57')));

        test.deepEqual(ast.getTree(), ['stmtList', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ]);

        test.done();
    },

    "embedded statement": function (test) {

        var ast = new JsFunction(['task'], new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('57')))));

        test.deepEqual(ast.getTree(),
            [ "function", "anon", [ "task" ],
                [ "stmtList",
                    [ "expr-stmt", [ "assign", [ "id", "$foo" ], [ "num", "57" ] ] ] ] ]);

        test.done();
    },

    // "attached statements": function (test) {
    //
    //     var stmt = JS.while(JS.bool('true'), new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57'))));
    //     stmt.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$z'), JS.num('42')))));
    //
    //     test.deepEqual(stmt.getTree(), [ 'stmtList',
    //         [ 'while',
    //             [ 'bool', 'true' ],
    //             [ 'stmtList',
    //                 [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ],
    //         [ 'stmtList',
    //             [ 'assign', [ 'id', '$z' ], [ 'num', '42' ] ] ] ]);
    //
    //     test.done();
    // }
};
