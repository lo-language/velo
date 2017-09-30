/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../codegen/LoContext');
const JsContext = require('../../codegen/JsContext');

module.exports["identifiers"] = {

    "normal var": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(),
            ['id', '$foo']);
        test.done();
    },

    "error when undefined": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(),
            ['id', '$foo']);
        test.done();
    }
};
