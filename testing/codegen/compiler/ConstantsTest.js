/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../../constructs');
const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["constants"] = {

    "numeric": function (test) {

        var node = new Lo.constant('port', new Lo.literal('number', '443'));

        var context = new Context();

        test.equal(context.has('port'), false);
        test.equal(context.isConstant('port'), false);

        test.equal(node.compile(context).renderJs(), '');

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));
        test.deepEqual(context.resolve('port').renderTree(), [ 'num', '443' ]);

        test.done();
    },

    "string": function (test) {

        var node = new Lo.constant('album', new Lo.literal('string', "Melon Collie"));

        var context = new Context();

        test.equal(context.has('album'), false);
        test.equal(context.isConstant('album'), false);

        test.equal(node.compile(context).renderJs(), '');

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        test.deepEqual(context.resolve('album').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    },

    "service": function (test) {

        var node = new Lo.constant('main',
            new Lo.procedure(
                ['next'],
                new Lo.stmtList(
                    new Lo.assignment(
                        '*=',
                        new Lo.identifier('result'),
                        new Lo.requestExpr(
                            new Lo.identifier('bar'),
                            [new Lo.literal('number', '42')]
                        )
                    )
                )
            ));

        var context = new Context();
        context.id = 47;

        test.equal(context.has('main'), false);
        test.equal(context.isConstant('main'), false);

        test.deepEqual(node.compile(context).renderTree(), [ 'stmtList',
            [ 'const',
                '$main',
                [ 'function',
                    null,
                    [ 'task' ],
                    [ 'stmtList',
                        [ 'var', '$next' ],
                        [ 'stmtList',
                            [ 'var', '$result' ],
                            [ 'stmtList', [ 'expr-stmt',
                                [ 'assign',
                                    [ 'id', '$next' ],
                                    [ 'subscript',
                                        [ 'select', [ 'id', 'task' ], 'args' ],
                                        [ 'num', '0' ] ] ] ],
                                [ 'stmtList', [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                        [ [ 'id', '$bar' ],
                                            [ 'arrayLiteral', [ ['num', '42' ] ] ],
                                            [ 'function', null, [ 'res0' ], [ 'stmtList', [ "expr-stmt",
                                                [ "assign", [ "id", "$result" ], [ "subscript", [ "id", "res0" ], [ "num", "0" ] ], '*=' ] ] ] ] ] ] ] ] ] ] ] ] ] ]);

        test.equal(context.has('main'), true);
        test.ok(context.isConstant('main'));
        test.deepEqual(context.resolve('main').renderTree(), [ 'id', '$main' ]);

        test.done();
    },

    "avoids JS collisions": function (test) {

        var node = new Lo.constant('constructor', new Lo.literal('string', "Melon Collie"));

        var context = new Context();

        test.equal(context.has('constructor'), false);
        test.equal(context.isConstant('constructor'), false);

        test.equal(node.compile(context).renderJs(), '');

        test.equal(context.has('constructor'), true);
        test.ok(context.isConstant('constructor'));
        test.deepEqual(context.resolve('constructor').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    }
};
