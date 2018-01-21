/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../compiler/LoContext');
const Lo = require('../../constructs');
const JsWriter = require('../../codegen/JsWriter');


module.exports["basics"] = {

    "simple": function (test) {

        var node = new Lo.yields(new Lo.identifier('foo'));
        var context = new LoContext().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(node.compile(context).getJs(new JsWriter()).renderTree(),
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
