/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var LoContext = require('../../codegen/LoContext');
var JsStmt = require('../../codegen/JsStmt');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["cardinality"] = {

    "generates js expression": function (test) {

        var node = new Lo.unaryOpExpr('cardinality', new Lo.identifier('foo'));

        // todo throw runtime error if none match?
        // todo can get rid of function call here with conditional operator

        test.deepEqual(node.compile2(new LoContext(), new JsStmt()).renderTree(), JS.fnCall(
            JS.select(JS.ID('Util'), 'cardinality'),
            [JS.ID('$foo')]).renderTree());

        test.done();
    }
};
