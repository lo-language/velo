/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var LoContext = require('../../compiler/LoContext');

module.exports["exists"] = {

    "binding": function (test) {

        var node = new Lo.defined(new Lo.identifier('foo'));

        test.deepEqual(node.compile(new LoContext()).renderTree(),
            [ 'strict-ne',
                [ 'typeof', [ 'id', '$foo' ] ],
                [ 'string', 'undefined' ] ]);
        test.done();
    }
};
