/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const Lo = require('../../../constructs');

module.exports["response"] = {

    "reply without args": function (test) {

        var node = new Lo.response('reply');

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ], [ 'arrayLiteral', [] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "reply with one arg": function (test) {

        var node = new Lo.response('reply', [new Lo.literal('number', '42')]);

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "reply with two args": function (test) {

        var node = new Lo.response('reply', [
            new Lo.literal('number', '42'),
            new Lo.literal('string', 'hot dog!')
        ]);

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ],
                            [ 'arrayLiteral',
                                [ [ 'num', '42' ], [ 'string', 'hot dog!' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "fail with one arg": function (test) {

        var node = new Lo.response('fail', [new Lo.literal('number', '42')]);

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'fail' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    }
};