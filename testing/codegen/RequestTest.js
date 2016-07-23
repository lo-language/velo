/**
 * Created by spurcell on 6/26/16.
 */

const Request = require('../../codegen/Request');
const JsFunction = require('../../codegen/JsFunction');
const StmtList = require('../../codegen/StmtList');
const JsStmt = require('../../codegen/JsStmt');
const JsWriter = require('../../codegen/JsWriter');

// test all combinations of sync/async, has/lacks replyHandler, has/lacks failHandler, where handlers can be final or non-final
// should also test with/without following statements

var following = new StmtList(new JsStmt(['assignment', ['id', 'baz'], ['num', '57']]));

module.exports["blocking"] = {

    "with no handlers": function (test) {

        var req = new Request(['id', '$foo'], [['num', '42']], null, null, true);

        test.deepEqual(req.render(following),
            ['message', ['id', '$foo'], [['num', '42']],
                new JsFunction(['res'], following).render(),
                JsFunction.DEFAULT_FAIL_HANDLER.render()]);

        // console.log(JsWriter.render(req.render(following)));

        test.done();
    },

    // "with reply handler": function (test) {
    //
    //     var replyHandler = new JsFunction([], new StmtList(new JsStmt(['assignment', ['id', '$bar'], ['num', '16']])));
    //
    //     var req = new Request(['id', '$foo'], [['num', '42']], replyHandler, null, true);
    //
    //     test.deepEqual(req.render(following),
    //         ['message', ['id', '$foo'], [['num', '42']], replyHandler.render(following), JsFunction.DEFAULT_FAIL_HANDLER.render()]);
    //     test.done();
    // },

    "with reply handler (final)": function (test) {

        var replyHandler = new JsFunction([], new StmtList(JsStmt.RETURN));

        var req = new Request(['id', '$foo'], [['num', '42']], replyHandler, null, true);

        test.deepEqual(req.render(following),
            ['message', ['id', '$foo'], [['num', '42']], replyHandler.render(following), JsFunction.DEFAULT_FAIL_HANDLER.render()]);
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