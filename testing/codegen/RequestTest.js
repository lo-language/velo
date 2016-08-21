/**
 * Created by spurcell on 6/26/16.
 */

const Request = require('../../codegen/Request');
const JsFunction = require('../../codegen/JsFunction');
const JsStmt = require('../../codegen/JsStmt');
const JS = require('../../codegen/JsPrimitives');

// test all combinations of sync/async, has/lacks replyHandler, has/lacks failHandler, where handlers can be final or non-final
// should also test with/without following statements

module.exports["blocking"] = {

    "with no handlers": function (test) {

        var req = new Request(JS.ID('$foo'), [JS.num('42')], null, null);

        test.deepEqual(req.renderTree(),
            [ 'stmtList', [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ], [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ]);

        test.done();
    },

    "with reply handler": function (test) {

        // var replyHandler = new JsFunction([], new StmtList(new JsStmt(['assignment', ['id', '$bar'], ['num', '16']])));

        var replyHandler = new JsFunction(['res'], new JsStmt(JS.assign(JS.ID('baz'), JS.num('57'))));
        var req = new Request(JS.ID('$foo'), [JS.num('42')], replyHandler, null);

        test.deepEqual(req.renderTree(),
            [ 'stmtList', [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                    [ 'function',
                        null,
                        [ 'res' ],
                        [ 'stmtList', [ 'assign', [ 'id', 'baz' ], [ 'num', '57' ] ] ] ] ] ] ]);

        test.done();
    },

    "with reply handler (final)": function (test) {

        var replyHandler = new JsFunction([], JsStmt.return());

        var req = new Request(JS.ID('$foo'), [JS.num('42')], replyHandler, null);

        test.deepEqual(req.renderTree(),
            [ 'stmtList', [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                    [ 'function', null, [], [ 'stmtList', [ 'return' ] ] ] ] ] ]);
        test.done();
    },


    "with fail handler": function (test) {
        test.done();
    },

    "with reply handler and fail handler": function (test) {
        test.done();
    },

    "with reply handler (final) and fail handler": function (test) {
        test.done();
    },


    "with fail handler (final)": function (test) {
        test.done();
    },

    "with reply handler and fail handler (final)": function (test) {
        test.done();
    },

    "with reply handler (final) and fail handler (final)": function (test) {
        test.done();
    }
};


module.exports["non-blocking"] = {

    "with no handlers": function (test) {
        test.done();
    },

    "with reply handler": function (test) {
        test.done();
    },

    "with reply handler (final)": function (test) {
        test.done();
    },


    "with fail handler": function (test) {
        test.done();
    },

    "with reply handler and fail handler": function (test) {
        test.done();
    },

    "with reply handler (final) and fail handler": function (test) {
        test.done();
    },


    "with fail handler (final)": function (test) {
        test.done();
    },

    "with reply handler and fail handler (final)": function (test) {
        test.done();
    },

    "with reply handler (final) and fail handler (final)": function (test) {
        test.done();
    }
};