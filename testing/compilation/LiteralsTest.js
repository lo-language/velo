/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["literals"] = {

    "boolean": function (test) {

        var node = new Lo.boolean('true');

        test.deepEqual(node.compile(new Context()).renderTree(), JS.bool('true').renderTree());
        test.done();
    },

    "number": function (test) {

        var node = new Lo.number('42');

        test.deepEqual(node.compile(new Context()).renderTree(), JS.num('42').renderTree());
        test.done();
    },

    "string": function (test) {

        var node = new Lo.string("turanga leela");

        test.deepEqual(node.compile(new Context()).renderTree(), JS.string('turanga leela').renderTree());
        test.done();
    },

    "array": function (test) {

        var node = new Lo.array([
            new Lo.string("foo"),
            new Lo.string("mani"),
            new Lo.string("padme"),
            new Lo.string("hum")
        ]);

        test.deepEqual(node.compile(new Context()).renderTree(),
            JS.arrayLiteral([JS.string('foo'), JS.string('mani'), JS.string('padme'), JS.string('hum')]).renderTree());
        test.done();
    },

    "set": function (test) {

        var node = new Lo.setLiteral([
            new Lo.string("foo"),
            new Lo.string("mani"),
            new Lo.string("padme"),
            new Lo.string("hum")
        ]);

        test.deepEqual(node.compile(new Context()).renderTree(), JS.objLiteral([
            [JS.string('foo'), JS.bool(true)],
            [JS.string('mani'), JS.bool(true)],
            [JS.string('padme'), JS.bool(true)],
            [JS.string('hum'), JS.bool(true)]
        ]).renderTree());
        test.done();
    },

    "map": function (test) {

        var node = new Lo.mapLiteral([
            new Lo.pair(new Lo.string("Zaphod"), new Lo.string("Betelgeuse")),
            new Lo.pair(new Lo.string("Ford"), new Lo.string("Betelgeuse")),
            new Lo.pair(new Lo.string("Arthur"), new Lo.string("Earth")),
            new Lo.pair(new Lo.string("Trillian"), new Lo.string("Earth")),
        ]);

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'objLiteral',
            [ [ [ 'string', 'Zaphod' ], [ 'string', 'Betelgeuse' ] ],
                [ [ 'string', 'Ford' ], [ 'string', 'Betelgeuse' ] ],
                [ [ 'string', 'Arthur' ], [ 'string', 'Earth' ] ],
                [ [ 'string', 'Trillian' ], [ 'string', 'Earth' ] ] ] ]);

        test.done();
    },

    "record": function (test) {

        var node = new Lo.record([
            new Lo.field('Zaphod', new Lo.string('Betelgeuse')),
            new Lo.field('Ford', new Lo.string('Betelgeuse')),
            new Lo.field('Arthur', new Lo.string('Earth')),
            new Lo.field('Trillian', new Lo.string('Earth')),
        ]);

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'objLiteral',
                [ [ [ 'string', '$Zaphod' ], [ 'string', 'Betelgeuse' ] ],
                    [ [ 'string', '$Ford' ], [ 'string', 'Betelgeuse' ] ],
                    [ [ 'string', '$Arthur' ], [ 'string', 'Earth' ] ],
                    [ [ 'string', '$Trillian' ], [ 'string', 'Earth' ] ] ] ]);

        test.done();
    }
};
