/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["complement"] = {

    "generates js expression": function (test) {

        var node = new Lo.unaryOpExpr('complement', new Lo.identifier('foo'));

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'not', [ 'id', '$foo' ] ]);
        test.done();
    }
};
