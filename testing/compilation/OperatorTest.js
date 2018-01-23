/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');

module.exports["op"] = {

    "add": function (test) {

        var node = new Lo.binaryOpExpr('+', new Lo.number('1'), new Lo.number('2'));

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'call',
            [ 'select', [ 'id', 'Util' ], 'add' ],
            [ [ 'num', '1' ], [ 'num', '2' ] ] ]);

        test.done();
    },

    "basic operators": function (test) {

        var cases = [
            ['-', 'sub'],
            ['*', 'mul'],
            ['/', 'div'],
            ['%', 'mod'],
            ['==', 'strict-eq'],
            ['and', '&&'],
            ['or', '||'],
            ['<', 'lt'],
            ['>', 'gt'],
            ['<=', 'lte'],
            ['>=', 'gte'],
            ['!=', 'ne']
        ];

        cases.forEach(op => {

            var node = new Lo.binaryOpExpr(op[0], new Lo.number('1'), new Lo.number('2'));

            test.deepEqual(node.compile(new LoContext()).renderTree(), [ op[1], [ 'num', '1' ], [ 'num', '2' ] ]);
        });

        test.done();
    },

    "translates and/or": function (test) {

        var node = new Lo.binaryOpExpr(
            'or',
            new Lo.binaryOpExpr(
                'and',
                new Lo.number('1'),
                new Lo.number('2')),
            new Lo.number('3'));

        test.deepEqual(node.compile(new LoContext()).renderTree(), [ '||',
            [ '&&', [ 'num', '1' ], [ 'num', '2' ] ],
            [ 'num', '3' ] ]);
        test.done();
    },

    "not": function (test) {

        var node = new Lo.unaryOpExpr('not', new Lo.identifier('foo'));

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'not', [ 'id', '$foo' ] ]);
        test.done();
    },

    "in operator": function (test) {

        var node = new Lo.membership(
            new Lo.identifier('dudes'),
            new Lo.string('trillian'));

        test.deepEqual(node.compile(new LoContext()).renderTree(), [ 'call',
            [ 'select', [ 'id', 'Util' ], 'in' ],
            [ [ 'string', 'trillian' ], [ 'id', '$dudes' ] ] ]);
        test.done();
    },

    "equality is strict": function (test) {

        var node = new Lo.binaryOpExpr(
                '==',
                new Lo.identifier('foo'),
                new Lo.identifier('bar'));

        test.deepEqual(node.compile(new LoContext()).renderTree(), [ 'strict-eq', [ 'id', '$foo' ], [ 'id', '$bar' ] ]);
        test.done();
    },

    "concat": function (test) {

        // offloads to the runtime lib
        // if strings, should use + operator
        // if ints, should create an array
        // if arrays, should concat

        var node = new Lo.binaryOpExpr(
            'concat',
            new Lo.identifier('foo'),
            new Lo.identifier('bar'));

        test.deepEqual(node.compile(new LoContext()).renderTree(), [ 'call',
            [ 'select', [ 'id', 'Util' ], 'concat' ],
            [ [ 'id', '$foo' ], [ 'id', '$bar' ] ] ]);
        test.done();
    }
};
