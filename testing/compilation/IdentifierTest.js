/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../codegen/LoContext');
const JsStmt = require('../../codegen/JsStmt');

module.exports["identifiers"] = {

    "normal var": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            ['id', '$foo']);
        test.done();
    },

    "error when undefined": function (test) {

        var node = new Lo.identifier('foo');

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(),
            ['id', '$foo']);
        test.done();
    }
};
