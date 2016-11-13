/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
var util = require('util');
const Lo = require('../../constructs');


module.exports["basics"] = {

    "two lists": function (test) {

        // concat is very runtime-dependent
        // item -> list appends item
        // item -> list[0] prepends item, etc.
        // item -> item creates list of two items
        // list -> list appends lists

        var node = new Lo.binaryOpExpr('concat',
            new Lo.identifier('foo'), new Lo.identifier('bar'));

        test.deepEqual(node.compile(new Context()).renderTree(),
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'concat' ],
                [ [ 'id', '$foo' ], [ 'id', '$bar' ] ] ]);
        test.done();
    }
};
