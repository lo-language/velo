/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["basics"] = {

    "increment": function (test) {

        var node = {
            "type":"increment",
            "operand":{type: "id", name: "bar"}
        };

        test.equal(new Context().compile(node).render(), '$bar++;\n');
        test.done();
    },

    "decrement": function (test) {

        var node = {
            "type":"decrement",
            "operand":{type: "id", name: "bar"}
        };

        test.equal(new Context().compile(node).render(), '$bar--;\n');
        test.done();
    },

    "splice": function (test) {

        // weld is very runtime-dependent
        // item -> list appends item
        // item -> list[0] prepends item, etc.
        // item -> item creates list of two items
        // list -> list appends lists

        var node = {
            "type": "splice",
            "list": {
                "type": "id",
                "name": "list"
            },
            "item": {
                "type": "id",
                "name": "item"
            }
        };

        test.equal(new Context().compile(node).render(), '$list.push($item);\n');
        test.done();
    }
};
