/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
var util = require('util');

module.exports["basics"] = {

    "two lists": function (test) {

        // concat is very runtime-dependent
        // item -> list appends item
        // item -> list[0] prepends item, etc.
        // item -> item creates list of two items
        // list -> list appends lists

        var node = {
            "type": "op",
            "op": "concat",
            "left": {
                "type": "id",
                "name": "foo"
            },
            "right": {
                "type": "id",
                "name": "bar"
            }
        };

        test.deepEqual(new Context().compile(node), JS.fnCall(JS.select(JS.ID('task'), 'concat'), [JS.ID('$foo'), JS.ID('$bar')]));
        test.done();
    }
};
