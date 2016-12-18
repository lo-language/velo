/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');


module.exports["slice"] = {

    "basic slice": function (test) {
        
        var node = new Lo.slice(
            new Lo.identifier('foo'),
            new Lo.literal('number', '1'),
            new Lo.literal('number', '3')
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', '$foo' ], 'slice' ],
                [ [ 'num', '1' ], [ 'add', [ 'num', '3' ], [ 'num', '1' ] ] ] ]);

        test.done();
    },

    "shorthand slice": function (test) {

        var node = new Lo.slice(
            new Lo.identifier('foo')
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', '$foo' ], 'slice' ],
                [ [ 'num', '0' ] ] ]);

        test.done();
    },

    "reverse indexing slice": function (test) {

        var node = new Lo.slice(
            new Lo.identifier('foo'),
            new Lo.literal('number', '-3'),
            new Lo.literal('number', '-1')
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', '$foo' ], 'slice' ],
                [ [ 'num', '-3' ], [ 'add', [ 'num', '-1' ], [ 'num', '1' ] ] ] ]);

        test.done();
    }
};
