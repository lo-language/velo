/**
 * Created by spurcell on 6/26/16.
 */

const JsStmt = require('../../codegen/JsStmt');
const JsFunction = require('../../codegen/JsFunction');
const JS = require('../../codegen/JsPrimitives');

module.exports["render"] = {

    "empty stmt yields empty string": function (test) {

        var stmt = new JsStmt();

        test.equal(stmt.renderJs(), '');

        test.done();
    }
};

module.exports["getTree"] = {

    "empty stmt throws": function (test) {

        var stmt = new JsStmt();

        test.throws(stmt.getTree);

        test.done();
    },

    "no statements": function (test) {

        var ast = JS.assign(JS.ID('$foo'), JS.num('57'));

        test.deepEqual(ast.renderTree(), [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ]);

        test.done();
    },

    "one statement": function (test) {

        var stmt = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')));

        test.deepEqual(stmt.renderTree(), ['stmtList', ['assign', ['id', '$foo'], ['num', '42']]]);
        test.equal(stmt.isFinal(), false);
        test.done();
    },

    "embedded statement": function (test) {

        var ast = new JsFunction(['task'], new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('57')))));

        test.deepEqual(ast.renderTree(),
            [ "function", null, [ "task" ],
                [ "stmtList",
                    [ "expr-stmt", [ "assign", [ "id", "$foo" ], [ "num", "57" ] ] ] ] ]);

        test.done();
    },

    "attached statements": function (test) {

        var stmt = new JsStmt(JS.while(JS.bool('true'), new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('57'))))));

        stmt.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$z'), JS.num('42')))));

        test.deepEqual(stmt.renderTree(),
            [ 'stmtList',
                [ 'while',
                    [ 'bool', 'true' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ] ],
                [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', '$z' ], [ 'num', '42' ] ] ] ] ]);

        test.done();
    },

    "empty attached stmt": function (test) {

        var stmt = new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('57'))));

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);

        stmt = stmt.attach(new JsStmt());

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ],
            [ 'stmtList' ] ]);

        stmt = stmt.attach(new JsStmt());

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ],
            [ 'stmtList' ] ]);

        test.done();
    }
};

module.exports["attach"] = {

    "attach to empty": function (test) {

        var stmt = new JsStmt();
        test.equal(stmt.isAsync(), false);

        stmt.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('57')))));
        test.equal(stmt.isAsync(), false);

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);

        test.done();
    },

    "attach": function (test) {

        var stmt = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')));

        stmt.attach(new JsStmt(JS.assign(JS.ID('$bar'), JS.ID('$baz'))));

        test.deepEqual(stmt.renderTree(),
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

        test.deepEqual(stmt.renderTree(), ['stmtList', ['return']]);
        test.done();
    },

    "attach final": function (test) {

        var stmt = new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('42'))));
        test.equal(stmt.isFinal(), false);

        stmt.attach(new JsStmt(JS.return(), true));
        test.equal(stmt.isFinal(), true);

        test.deepEqual(stmt.renderTree(),
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', ['id', '$foo'], ['num', '42'] ] ],
                [ 'stmtList',
                    [ 'return'] ] ]);
        test.done();
    },

    "attach async": function (test) {

        var stmt = new JsStmt(JS.exprStmt(JS.assign(JS.ID('$foo'), JS.num('42'))));
        test.equal(stmt.isFinal(), false);

        stmt.attach({attach: function () {}, isAsync: () => true});
        test.equal(stmt.isAsync(), true);

        test.done();
    }
};