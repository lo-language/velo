/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const Lo = require('../../constructs');

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var node = new Lo.assignment('=',
            new Lo.identifier('foo'), new Lo.literal('number', '57'));

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(node.compile(context).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);

        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign literal to lvalue expression": function (test) {

        var node = new Lo.assignment('*=',
            new Lo.subscript(new Lo.identifier('foo'), new Lo.identifier('bar')),
            new Lo.literal('number', '57'));

        var context = new Context().createInner();

        test.deepEqual(node.compile(context).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'assign',
                        [ 'subscript', [ 'id', '$foo' ], [ 'id', '$bar' ] ],
                        [ 'num', '57' ], '*=' ] ] ]);
        test.done();
    },

    "assign id to id": function (test) {

        var node = new Lo.assignment(
            '=',
            new Lo.identifier('foo'),
            new Lo.identifier('bar'));

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);
        test.deepEqual(node.compile(context).renderTree(),
            [ 'stmtList',
            [ 'expr-stmt',
                [ 'assign', [ 'id', '$foo' ], [ 'id', '$bar' ] ] ] ]);
        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign application to id": function (test) {

        var node = new Lo.assignment(
            '=',
            new Lo.identifier('foo'),
            new Lo.requestExpr(new Lo.identifier('bar'), [])
        );

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(node.compile(context).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$bar' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ "subscript", [ 'id', 'res0' ], [ "num", "0" ]] ] ] ] ] ] ] ] ]);
        test.equal(context.has('foo'), true);

        test.done();
    },

    "doesn't declare if in parent context": function (test) {

        var node = new Lo.assignment('=',
            new Lo.identifier('foo'), new Lo.literal('number', '57'));

        var parent = new Context().createInner();

        parent.declare('foo');

        var context = parent.createInner();

        test.equal(context.has('foo'), true);

        test.deepEqual(node.compile(context).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '57' ] ] ] ]);
        test.deepEqual(context.getJsVars(), []);
        test.done();
    },

    "throws if assigning to constant": function (test) {

        test.done();
    }
};
