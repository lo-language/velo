/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');

module.exports["basics"] = {

    "reply without args": function (test) {

        var node = new Lo.response('reply');

        test.deepEqual(node.compile2(new LoContext().createInner(true)).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'succ' ],
                    [ [ 'arrayLiteral', [] ] ] ] ]);
        test.done();
    },

    // todo should also throw a compiler warning here!
    // "reply with following stmts should omit them": function (test) {
    //
    //     var node = new Lo.stmtList(new Lo.response('reply'),
    //         new Lo.stmtList(new Lo.assign(new Lo.identifier('x'), new Lo.number('47'))));
    //
    //     var result = node.compile2(new LoContext().createInner(true));
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

        test.deepEqual(node.compile2(new LoContext().createInner(true)).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'succ' ],
                    [ [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ]);
        test.done();
    },

    "reply with two args": function (test) {

        var node = new Lo.response('reply', [
            new Lo.number('42'),
            new Lo.string('hot dog!')
        ]);

        test.deepEqual(node.compile2(new LoContext().createInner(true)).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'succ' ],
                    [ [ 'arrayLiteral',
                        [ [ 'num', '42' ], [ 'string', 'hot dog!' ] ] ] ] ] ]);
        test.done();
    },

    "fail with one arg": function (test) {

        var node = new Lo.response('fail', [new Lo.number('42')]);

        test.deepEqual(node.compile2(new LoContext().createInner(true)).renderTree(),
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'fail' ],
                    [ [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ]);
        test.done();
    }
};

module.exports["context"] = {

    "throws error if can't respond": function (test) {

        var node = new Lo.response('fail', [new Lo.number('42')]);

        test.throws(function () {
            node.compile2(new LoContext()).renderTree()
        });

        node = new Lo.response('reply', [new Lo.number('42')]);

        test.throws(function () {
            node.compile2(new LoContext()).renderTree()
        });

        test.done();
    }
};