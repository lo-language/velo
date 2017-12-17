/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../compiler/LoContext');

module.exports["identifiers"] = {

    "normal var": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile2(new LoContext()).renderTree(),
            ['id', '$foo']);
        test.done();
    },

    "error when undefined": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile2(new LoContext()).renderTree(),
            ['id', '$foo']);
        test.done();
    }
};
