/**
 * Created by spurcell on 6/26/16.
 */

const StmtList = require('../../codegen/StmtList');
const JsStmt = require('../../codegen/JsStmt');

module.exports["basics"] = {

    "render": function (test) {

        var stmtList = new StmtList(new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]));

        test.deepEqual(stmtList.render(), ['stmtList', [ 'assignment', [ 'id', '$foo' ], [ 'num', '42' ] ]]);
        test.done();
    },

    "render with following": function (test) {

        var stmtList = new StmtList(new JsStmt(['assignment', ['id', '$foo'], ['num', '42']]));

        var following = ['assignment', ['id', '$bar'], ['id', '$baz']];

        test.deepEqual(stmtList.render(following), ['stmtList', [ 'assignment', [ 'id', '$foo' ], [ 'num', '42' ] ]]);
        test.done();
    },

    "attach": function (test) {

        var stmtList = new StmtList(new JsStmt(['assignment', ['id', '$foo'], ['num', '42']])).attach(
            new JsStmt(['assignment', ['id', '$bar'], ['id', '$baz']])
        );

        test.deepEqual(stmtList.render(), ['stmtList', [ 'assignment', [ 'id', '$foo' ], [ 'num', '42' ] ],
        ['stmtList', ['assignment', ['id', '$bar'], ['id', '$baz']]]]);

        test.done();
    }
};