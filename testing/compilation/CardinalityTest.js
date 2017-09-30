/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var LoContext = require('../../codegen/LoContext');
var JsContext = require('../../codegen/JsContext');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["cardinality"] = {

    "generates js expression": function (test) {

        var node = new Lo.unaryOpExpr('cardinality', new Lo.identifier('foo'));

        // todo throw runtime error if none match?
        // todo can get rid of function call here with conditional operator

        test.deepEqual(node.compile2(new LoContext(), new JsContext()).renderTree(), JS.fnCall(
            JS.select(JS.ID('Util'), 'cardinality'),
            [JS.ID('$foo')]).renderTree());

        test.done();
    }
};
