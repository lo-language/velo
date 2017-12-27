/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var LoContext = require('../../compiler/LoContext');

module.exports["exists"] = {

    "existence": function (test) {

        var node = new Lo.existence(new Lo.identifier('foo'));

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'strict-ne',
                [ 'typeof', [ 'id', '$foo' ] ],
                [ 'string', 'undefined' ] ]);
        test.done();
    },

    "non-existence": function (test) {

        var node = new Lo.existence(new Lo.identifier('foo'), true);

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'strict-eq',
                [ 'typeof', [ 'id', '$foo' ] ],
                [ 'string', 'undefined' ] ]);
        test.done();
    }
};
