/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');
const JsWriter = require('../../codegen/JsWriter');

module.exports["basics"] = {

    "reply without args": function (test) {

        var node = new Lo.response('reply');

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext().createInner(true))).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'succ' ],
                        [ [ 'arrayLiteral', [] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    // todo should also throw a compiler warning here!
    // "reply with following stmts should omit them": function (test) {
    //
    //     var node = new Lo.stmtList(new Lo.response('reply'),
    //         new Lo.stmtList(new Lo.assign(new Lo.identifier('x'), new Lo.number('47'))));
    //
    //     var result = node.compile(new LoContext().createInner(true));
    //
    //     test.deepEqual(result.renderTree(),
    //         [ 'stmtList',
    //             [ 'expr-stmt',
    //                 [ 'call',
    //                     [ 'select', [ 'id', 'task' ], 'succ' ],
    //                     [ [ 'arrayLiteral', [] ] ] ] ],
    //             [ 'stmtList', [ 'return' ] ] ]);
    //     test.done();
    // },

    "reply with one arg": function (test) {

        var node = new Lo.response('reply', [new Lo.number('42')]);

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext().createInner(true))).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'succ' ],
                        [ [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "reply with two args": function (test) {

        var node = new Lo.response('reply', [
            new Lo.number('42'),
            new Lo.string('hot dog!')
        ]);

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext().createInner(true))).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'succ' ],
                        [ [ 'arrayLiteral',
                            [ [ 'num', '42' ], [ 'string', 'hot dog!' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "fail with one arg": function (test) {

        var node = new Lo.response('fail', [new Lo.number('42')]);

        test.deepEqual(new JsWriter().generateJs(node.compile(new LoContext().createInner(true))).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'fail' ],
                        [ [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    }
};

module.exports["context"] = {

    "throws error if can't respond": function (test) {

        var node = new Lo.response('fail', [new Lo.number('42')]);

        test.throws(function () {
            node.compile(new LoContext()).renderTree()
        });

        node = new Lo.response('reply', [new Lo.number('42')]);

        test.throws(function () {
            node.compile(new LoContext()).renderTree()
        });

        test.done();
    }
};