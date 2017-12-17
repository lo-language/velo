/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');


module.exports["slice"] = {

    "basic slice": function (test) {
        
        var node = new Lo.slice(
            new Lo.identifier('foo'),
            new Lo.number('1'),
            new Lo.number('3')
        );

        test.deepEqual(node.compile2(new LoContext()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', '$foo' ], 'slice' ],
                [ [ 'num', '1' ], [ 'add', [ 'num', '3' ], [ 'num', '1' ] ] ] ]);

        test.done();
    },

    "shorthand slice": function (test) {

        var node = new Lo.slice(
            new Lo.identifier('foo')
        );

        test.deepEqual(node.compile2(new LoContext()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', '$foo' ], 'slice' ],
                [ [ 'num', '0' ] ] ]);

        test.done();
    },

    "reverse indexing slice": function (test) {

        var node = new Lo.slice(
            new Lo.identifier('foo'),
            new Lo.number('-3'),
            new Lo.number('-1')
        );

        test.deepEqual(node.compile2(new LoContext()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', '$foo' ], 'slice' ],
                [ [ 'num', '-3' ], [ 'add', [ 'num', '-1' ], [ 'num', '1' ] ] ] ]);

        test.done();
    }
};
