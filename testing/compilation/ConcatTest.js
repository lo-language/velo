/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');

module.exports = {

    "simple": function (test) {

        var node = new Lo.concat(
            new Lo.concat(
                new Lo.string('hello, '),
                new Lo.coercion(new Lo.identifier('name'))), new Lo.string('!'));

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'add',
                [ 'add',
                    [ 'string', 'hello, ' ],
                    [ 'call', [ 'id', 'String' ], [ [ 'id', '$name' ] ] ] ],
                [ 'string', '!' ] ]);
        test.done();
    },

    "compound": function (test) {

        var node = new Lo.concat(new Lo.concat(
            new Lo.concat(
                new Lo.concat(
                    new Lo.string("I'm sorry, "),
                    new Lo.coercion(new Lo.identifier('name'))),
                new Lo.string(", I can't do ")),
            new Lo.coercion(new Lo.identifier('action'))),
            new Lo.string('.'));

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'add',
                [ 'add',
                    [ 'add',
                        [ 'add',
                            [ 'string', 'I\'m sorry, ' ],
                            [ 'call', [ 'id', 'String' ], [ [ 'id', '$name' ] ] ] ],
                        [ 'string', ', I can\'t do ' ] ],
                    [ 'call', [ 'id', 'String' ], [ [ 'id', '$action' ] ] ] ],
                [ 'string', '.' ] ]);

        test.done();
    },

    "three parts": function (test) {

        var node = new Lo.concat(
                new Lo.string("A = "),
                new Lo.concat(
                    new Lo.coercion(new Lo.identifier('a')),
                    new Lo.concat(
                        new Lo.string(", B = "),
                        new Lo.concat(
                            new Lo.coercion(new Lo.identifier('b')),
                            new Lo.concat(
                                new Lo.string(", C = "),
                                new Lo.concat(
                                    new Lo.coercion(new Lo.identifier('c')),
                                    new Lo.string('.')))))));

        console.log(node.compile(new Context()).renderJs());

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'add',
                [ 'string', 'A = ' ],
                [ 'add',
                    [ 'call', [ 'id', 'String' ], [ [ 'id', '$a' ] ] ],
                    [ 'add',
                        [ 'string', ', B = ' ],
                        [ 'add',
                            [ 'call', [ 'id', 'String' ], [ [ 'id', '$b' ] ] ],
                            [ 'add',
                                [ 'string', ', C = ' ],
                                [ 'add',
                                    [ 'call', [ 'id', 'String' ], [ [ 'id', '$c' ] ] ],
                                    [ 'string', '.' ] ] ] ] ] ] ]);
        test.done();
    }
};
