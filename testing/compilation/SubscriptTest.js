/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const LoContext = require('../../codegen/LoContext');
const JsStmt = require('../../codegen/JsStmt');
const Lo = require('../../constructs');


module.exports["subscript"] = {

    "basic": function (test) {

        var node = new Lo.subscript(new Lo.identifier('foo'), new Lo.number('1'));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'subscript', [ 'id', '$foo' ], [ 'num', '1' ] ]);
        test.done();
    },

    "reverse indexing": function (test) {

        var node = new Lo.subscript(new Lo.identifier('foo'), new Lo.number('-1'));

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            [ 'subscript',
                [ 'id', '$foo' ],
                [ 'add',
                    [ 'select', [ 'id', '$foo' ], 'length' ],
                    [ 'num', '-1' ] ] ]);
        test.done();
    }
};
