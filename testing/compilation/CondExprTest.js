/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var Context = require('../../codegen/Context');

module.exports["basics"] = {

    "simple expression": function (test) {

        var node = new Lo.condExpr(
            new Lo.identifier('foo'),
            new Lo.identifier('bar'),
            new Lo.identifier('baz')
        );

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'cond-expr',
                [ 'id', '$foo' ],
                [ 'id', '$bar' ],
                [ 'id', '$baz' ] ]);
        test.done();
    }
};
