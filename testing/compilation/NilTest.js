/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
var LoContext = require('../../compiler/LoContext');

module.exports["basics"] = {

    "compile": function (test) {

        var node = new Lo.nil();

        test.deepEqual(node.compile(new LoContext()).renderTree(), [ 'id', 'undefined' ]);
        test.done();
    }
};
