/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const Lo = require('../../constructs');

module.exports["cardinality"] = {

    "generates js expression": function (test) {

        var node = new Lo.unaryOpExpr('cardinality', new Lo.identifier('foo'));

        // todo throw runtime error if none match?
        // todo can get rid of function call here with conditional operator

        test.deepEqual(node.compile(new Context()).renderTree(), JS.fnCall(
            JS.select(JS.ID('task'), 'cardinality'),
            [JS.ID('$foo')]).renderTree());

        test.done();
    }
};
