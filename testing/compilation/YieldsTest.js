/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');

module.exports["basics"] = {

    "simple": function (test) {

        var node = new Lo.yields(new Lo.identifier('foo'));
        var context = new LoContext().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(node.compile2(context).renderTree(),
            [ 'function',
                null,
                [ 'res' ],
                [ 'stmtList',
                    [ 'assign',
                        [ 'id', '$foo' ],
                        [ 'subscript', [ 'id', 'res' ], [ 'num', '0' ] ],
                        '=' ] ] ]);

        test.equal(context.has('foo'), true);

        test.done();
    }
};
