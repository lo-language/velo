/**
 * Created by spurcell on 6/26/16.
 */

const JsStmt = require('../../codegen/JsStmt');

module.exports["basics"] = {

    "render": function (test) {

        var stmt = new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]);

        test.deepEqual(stmt.render(), ['stmtList', [ 'assignment', [ 'id', '$foo' ], [ 'num', '42' ] ]]);
        test.equal(stmt.isFinal(), false);
        test.done();
    },

    "attach": function (test) {

        var stmt = new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]);

        stmt.attach(new JsStmt(['assignment', ['id', '$bar'], ['id', '$baz']]));

        test.deepEqual(stmt.render(),
            ['stmtList',
                [ 'assignment', [ 'id', '$foo' ], [ 'num', '42' ] ],
                ['stmtList',
                    ['assignment', ['id', '$bar'], ['id', '$baz']]]]);
        test.done();
    },

    "attach to final does nothing": function (test) {

        var stmt = JsStmt.RETURN;
        test.equal(stmt.isFinal(), true);

        stmt.attach(new JsStmt(['assignment', ['id', '$bar'], ['id', '$baz']]));

        test.deepEqual(stmt.render(), ['stmtList', ['returnStmt']]);
        test.done();
    },

    "attach final": function (test) {

        var stmt = new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]);
        test.equal(stmt.isFinal(), false);

        stmt.attach(JsStmt.RETURN);
        test.equal(stmt.isFinal(), true);

        test.deepEqual(stmt.render(),
            ['stmtList',
                [ 'assignment', [ 'id', '$foo' ], [ 'num', '42' ] ],
                ['stmtList',
                    ['returnStmt']]]);
        test.done();
    }
};