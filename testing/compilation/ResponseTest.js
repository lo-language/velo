/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["basics"] = {

    "reply without args": function (test) {

        var node = new Lo.response('reply');

        test.deepEqual(node.compile(new Context().createInner(true)).renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ], [ 'arrayLiteral', [] ] ] ] ]);
        test.done();
    },

    "reply with following stmts": function (test) {

        var node = new Lo.stmtList(new Lo.response('reply'),
            new Lo.stmtList(new Lo.assignment('=', new Lo.identifier('x'), new Lo.literal('number', '47'))));

        test.deepEqual(node.compile(new Context().createInner(true), JS.stmtList()).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ], [ 'arrayLiteral', [] ] ] ] ],
                [ 'stmtList',
                    [ 'return' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$x' ], [ 'num', '47' ] ] ] ] ] ]);
        test.done();
    },

    "reply with one arg": function (test) {

        var node = new Lo.response('reply', [new Lo.literal('number', '42')]);

        test.deepEqual(node.compile(new Context().createInner(true)).renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ]);
        test.done();
    },

    "reply with two args": function (test) {

        var node = new Lo.response('reply', [
            new Lo.literal('number', '42'),
            new Lo.literal('string', 'hot dog!')
        ]);

        test.deepEqual(node.compile(new Context().createInner(true)).renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ],
                            [ 'arrayLiteral',
                                [ [ 'num', '42' ], [ 'string', 'hot dog!' ] ] ] ] ] ]);
        test.done();
    },

    "fail with one arg": function (test) {

        var node = new Lo.response('fail', [new Lo.literal('number', '42')]);

        test.deepEqual(node.compile(new Context().createInner(true)).renderTree(),
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'fail' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ]);
        test.done();
    }
};

module.exports["context"] = {

    "throws error if can't respond": function (test) {

        var node = new Lo.response('fail', [new Lo.literal('number', '42')]);

        test.throws(function () {
            node.compile(new Context()).renderTree()
        });

        node = new Lo.response('reply', [new Lo.literal('number', '42')]);

        test.throws(function () {
            node.compile(new Context()).renderTree()
        });

        test.done();
    }
};