/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../codegen/LoContext');
const JsContext = require('../../codegen/JsContext');

module.exports["basics"] = {

    "simple expression": function (test) {

        var node = new Lo.condExpr(
            new Lo.identifier('foo'),
            new Lo.identifier('bar'),
            new Lo.identifier('baz')
        );

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'cond-expr',
                [ 'id', '$foo' ],
                [ 'id', '$bar' ],
                [ 'id', '$baz' ] ]);
        test.done();
    }
};
