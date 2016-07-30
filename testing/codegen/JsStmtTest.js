/**
 * Created by spurcell on 6/26/16.
 */

const JsStmt = require('../../codegen/JsStmt');
const JsFunction = require('../../codegen/JsFunction');
const JsKit = require('../../codegen/JsKit');
const Blocker = require('../../codegen/Blocker');
const JS = JsKit.parts;

module.exports["basics"] = {

    "getAst": function (test) {

        var stmt = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')));

        test.deepEqual(stmt.getAst(), ['stmtList', ['assign', ['id', '$foo'], ['num', '42']]]);
        test.equal(stmt.isFinal(), false);
        test.done();
    },

    "attach": function (test) {

        var stmt = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')));

        stmt.attach(new JsStmt(JS.assign(JS.ID('$bar'), JS.ID('$baz'))));

        test.deepEqual(stmt.getAst(),
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

        test.deepEqual(stmt.getAst(), ['stmtList', ['returnStmt']]);
        test.done();
    },

    "attach final": function (test) {

        var stmt = new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]);
        test.equal(stmt.isFinal(), false);

        stmt.attach(new JsStmt(['returnStmt'], true));
        test.equal(stmt.isFinal(), true);

        test.deepEqual(stmt.getAst(),
            ['stmtList',
                ['assignment', ['id', '$foo'], ['num', '42']],
                ['stmtList',
                    ['returnStmt']]]);
        test.done();
    }
};

module.exports["flatten"] = {

    "no statements": function (test) {

        var ast = JS.assign(JS.ID('$foo'), JS.num('57'));

        test.deepEqual(ast.getAst(), [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ]);

        test.done();
    },

    "statement": function (test) {

        var ast = new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57')));

        test.deepEqual(ast.getAst(), ['stmtList', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ]);

        test.done();
    },

    "embedded statement": function (test) {

        var ast = new JsFunction(['task'], new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57'))));

        test.deepEqual(ast.getAst(), ['fnDef', ['task'], ['stmtList', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);

        test.done();
    },

    "attached statements": function (test) {

        var ast = JS.while(JS.bool('true'), new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57'))));
        ast.attach(new JsStmt(JS.assign(JS.ID('$z'), JS.num('42'))));

        test.deepEqual(JsStmt.flatten(ast), [ 'stmtList',
            [ 'while',
                [ 'bool', 'true' ],
                [ 'stmtList',
                    [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ],
            [ 'stmtList',
                [ 'assign', [ 'id', '$z' ], [ 'num', '42' ] ] ] ]);

        test.done();
    }
};


module.exports["resolve blockers"] = {

    "no args": function (test) {
        
        var handler = new JsFunction(['res']);

        var stmt = new JsStmt(new Blocker(JS.ID('$foo'), [], handler, null));

        var exp = new JsStmt(JS.runtimeCall('sendMessage', [JS.ID('$foo'), [], handler, null]));

        test.deepEqual(stmt.getAst(), exp.getAst());
        // test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [], function (res) {\nvar P0 = res ? res[0] : null;\nP0}, null);\n\n');
        test.done();
    }
};