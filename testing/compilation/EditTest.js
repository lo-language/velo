/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const util = require('util');

module.exports["basics"] = {

    "increment ID": function (test) {

        var node = new Lo.incrDecr('increment', new Lo.identifier('bar'));

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'stmtList', [ 'expr-stmt', [ 'inc', [ 'id', '$bar' ] ] ] ]);
        test.done();
    },

    "decrement ID": function (test) {

        var node = new Lo.incrDecr('decrement', new Lo.identifier('bar'));

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'stmtList', [ 'expr-stmt', [ 'dec', [ 'id', '$bar' ] ] ] ]);
        test.done();
    },

    "increment subscript": function (test) {

        var node = new Lo.incrDecr('increment',
            new Lo.subscript(
                new Lo.identifier('bar'), new Lo.literal('number', "1")));

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'inc', [ 'subscript', [ 'id', '$bar' ], [ 'num', '1' ] ] ] ] ]);
        test.done();
    },
};
