/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../../constructs');
const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');

module.exports["select"] = {

    "simple": function (test) {

        var node = new Lo.interpolation('hello, ', new Lo.identifier('name'), '!');

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'add',
                [ 'add', [ 'string', 'hello, ' ], [ 'id', '$name' ] ],
                [ 'string', '!' ] ]);
        test.done();
    },

    "compound": function (test) {

        var node = new Lo.interpolation("I'm sorry, ", new Lo.dynaString(
            new Lo.identifier('name'), ", I can't do ", new Lo.identifier('action')), '.');

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'add',
            [ 'add',
                [ 'string', 'I\'m sorry, ' ],
                [ 'add',
                    [ 'add', [ 'id', '$name' ], [ 'string', ', I can\'t do ' ] ],
                    [ 'id', '$action' ] ] ],
            [ 'string', '.' ] ]);

        test.done();
    },

    "three parts": function (test) {

        var node = new Lo.interpolation(
            "A = ",
            new Lo.dynaString(
                new Lo.identifier('a'),
                ", B = ",
                new Lo.dynaString(
                    new Lo.identifier('b'),
                    ", C = ",
                    new Lo.identifier('c')
                )),
            '.');

        test.deepEqual(node.compile(new Context()).renderTree(), [ 'add',
            [ 'add',
                [ 'string', 'A = ' ],
                [ 'add',
                    [ 'add', [ 'id', '$a' ], [ 'string', ', B = ' ] ],
                    [ 'add',
                        [ 'add', [ 'id', '$b' ], [ 'string', ', C = ' ] ],
                        [ 'id', '$c' ] ] ] ],
            [ 'string', '.' ] ]);
        test.done();
    }
};
