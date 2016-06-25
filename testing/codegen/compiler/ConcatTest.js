/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["basics"] = {

    "two lists": function (test) {

        // weld is very runtime-dependent
        // item -> list appends item
        // item -> list[0] prepends item, etc.
        // item -> item creates list of two items
        // list -> list appends lists

        var node = {
            "type": "op",
            "op": "concat",
            "left": {
                "type": "id",
                "name": "list"
            },
            "right": {
                "type": "id",
                "name": "item"
            }
        };

        test.equal(new Context().compile(node).render(), 'task.concat($list, $item)');
        test.done();
    }
};
