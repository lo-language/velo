/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var LoContext = require('../../codegen/LoContext');
var JsContext = require('../../codegen/JsContext');

module.exports["exists"] = {

    "existence": function (test) {

        var node = new Lo.existence(new Lo.identifier('foo'));

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'strict-ne',
                [ 'typeof', [ 'id', '$foo' ] ],
                [ 'string', 'undefined' ] ]);
        test.done();
    },

    "non-existence": function (test) {

        var node = new Lo.existence(new Lo.identifier('foo'), true);

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(),
            [ 'strict-eq',
                [ 'typeof', [ 'id', '$foo' ] ],
                [ 'string', 'undefined' ] ]);
        test.done();
    }
};
