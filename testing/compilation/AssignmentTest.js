/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const CFNode = require('../../compiler/CFNode');
const Lo = require('../../constructs');

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('foo'), new Lo.number('57'));

        var context = new LoContext().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(node.compile2(context).renderTree(), ['stmtList',
            [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);

        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign literal to lvalue expression": function (test) {

        var node = new Lo.assign(
            new Lo.subscript(new Lo.identifier('foo'), new Lo.identifier('bar')),
            new Lo.number('57'));

        var context = new LoContext().createInner();

        test.deepEqual(node.compile2(context).renderTree(), ['stmtList',
                [ 'expr-stmt',
                    [ 'assign',
                        [ 'subscript', [ 'id', '$foo' ], [ 'id', '$bar' ] ],
                        [ 'num', '57' ] ] ] ]);
        test.done();
    },

    "assign id to id": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('foo'),
            new Lo.identifier('bar'));

        var context = new LoContext().createInner();

        test.equal(context.has('foo'), false);
        test.deepEqual(node.compile2(context).renderTree(), ['stmtList',
            [ 'expr-stmt',
                [ 'assign', [ 'id', '$foo' ], [ 'id', '$bar' ] ] ] ]);
        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign application to id": function (test) {

        // this is more of an integration test

        var node = new Lo.assign(
            new Lo.identifier('foo'),
            new Lo.requestExpr(new Lo.identifier('bar'), [])
        );

        var context = new LoContext().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(node.compile2(context, new CFNode()).renderTree(), ['stmtList',
            [ 'expr-stmt',
                [ 'assign',
                    [ 'id', '$foo' ],
                    [ 'subscript', [ 'id', 'res0' ], [ 'num', '0' ] ] ] ] ]);
        test.equal(context.has('foo'), true);

        test.done();
    },

    "doesn't declare if in parent context": function (test) {

        var node = new Lo.assign(
            new Lo.identifier('foo'), new Lo.number('57'));

        var parent = new LoContext().createInner();

        parent.declare('foo');

        var context = parent.createInner();

        test.equal(context.has('foo'), true);

        test.deepEqual(node.compile2(context).renderTree(), ['stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);
        test.deepEqual(context.getJsVars(), []);
        test.done();
    },

    "throws if assigning to constant": function (test) {

        test.done();
    }
};
