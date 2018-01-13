/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');
const Type = require('../../compiler/Type');
const ArrayType = require('../../compiler/ArrayType');

module.exports["literals"] = {

    "boolean": function (test) {

        var node = new Lo.boolean('true');

        test.deepEqual(node.compile(new LoContext()).renderTree(), JS.bool('true').renderTree());
        test.equal(node.type, Type.BOOL);

        test.done();
    },

    "number": function (test) {

        var node = new Lo.number('42');

        test.deepEqual(node.compile(new LoContext()).renderTree(), JS.num('42').renderTree());
        test.equal(node.type, Type.NUM);
        test.done();
    },

    "string": function (test) {

        var node = new Lo.string("turanga leela");

        test.deepEqual(node.compile(new LoContext()).renderTree(), JS.string('turanga leela').renderTree());
        test.equal(node.type, ArrayType.STRING);
        test.done();
    },

    "array": function (test) {

        var node = new Lo.arrayLiteral([
            new Lo.string("foo"),
            new Lo.string("mani"),
            new Lo.string("padme"),
            new Lo.string("hum")
        ]);

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            JS.arrayLiteral([JS.string('foo'), JS.string('mani'), JS.string('padme'), JS.string('hum')]).renderTree());
        test.equal(node.type.toString(), 'string*');
        test.done();
    },

    "set": function (test) {

        var node = new Lo.setLiteral([
            new Lo.string("foo"),
            new Lo.string("mani"),
            new Lo.string("padme"),
            new Lo.string("hum")
        ]);

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', 'Object' ], 'defineProperty' ],
                [ [ 'objLiteral',
                    [ [ [ 'string', 'foo' ], [ 'bool', true ] ],
                        [ [ 'string', 'mani' ], [ 'bool', true ] ],
                        [ [ 'string', 'padme' ], [ 'bool', true ] ],
                        [ [ 'string', 'hum' ], [ 'bool', true ] ] ] ],
                    [ 'string', '__LO_SET' ],
                    [ 'objLiteral', [ [ [ 'id', 'value' ], [ 'bool', 'true' ] ] ] ] ] ]);

        test.equal(node.type.toString(), '{string}');
        test.done();
    },

    "map": function (test) {

        var node = new Lo.mapLiteral([
            {key: new Lo.string("Zaphod"), value: new Lo.string("Betelgeuse")},
            {key: new Lo.string("Ford"), value: new Lo.string("Betelgeuse")},
            {key: new Lo.string("Arthur"), value: new Lo.string("Earth")},
            {key: new Lo.string("Trillian"), value: new Lo.string("Earth")}
        ]);

        test.deepEqual(node.compile(new LoContext()).renderTree(), [ 'objLiteral',
            [ [ [ 'string', 'Zaphod' ], [ 'string', 'Betelgeuse' ] ],
                [ [ 'string', 'Ford' ], [ 'string', 'Betelgeuse' ] ],
                [ [ 'string', 'Arthur' ], [ 'string', 'Earth' ] ],
                [ [ 'string', 'Trillian' ], [ 'string', 'Earth' ] ] ] ]);

        test.equal(node.type.toString(), '{string => string}');
        test.done();
    },

    "record": function (test) {

        var node = new Lo.compound([
            new Lo.field('Zaphod', new Lo.string('Betelgeuse')),
            new Lo.field('Ford', new Lo.string('Betelgeuse')),
            new Lo.field('Arthur', new Lo.string('Earth')),
            new Lo.field('Trillian', new Lo.string('Earth')),
        ]);

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'objLiteral',
                [ [ [ 'string', 'Zaphod' ], [ 'string', 'Betelgeuse' ] ],
                    [ [ 'string', 'Ford' ], [ 'string', 'Betelgeuse' ] ],
                    [ [ 'string', 'Arthur' ], [ 'string', 'Earth' ] ],
                    [ [ 'string', 'Trillian' ], [ 'string', 'Earth' ] ] ] ]);

        test.done();
    }
};
