/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var LoContext = require('../../compiler/LoContext');
var JsWriter = require('../../codegen/JsWriter');

module.exports["exists"] = {

    "drop": function (test) {

        var node = new Lo.drop(new Lo.identifier('foo'));

        test.deepEqual(node.compile(new LoContext()).getJs(new JsWriter()).renderTree(),
            [ 'assign', [ 'id', '$foo' ], [ 'id', 'undefined' ] ]);
        test.done();
    }
};
