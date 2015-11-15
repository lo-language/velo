/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["basics"] = {

    "increment": function (test) {

        var node = {
            "type":"increment",
            "operand":{type: "id", name: "bar"}
        };

        test.equal(Compiler.compile(node).render(), '$bar++;\n');
        test.done();
    },

    "decrement": function (test) {

        var node = {
            "type":"decrement",
            "operand":{type: "id", name: "bar"}
        };

        test.equal(Compiler.compile(node).render(), '$bar--;\n');
        test.done();
    },

    "push back": function (test) {

        var node = {
            "type": "push_back",
            "list": {
                "type": "id",
                "name": "list"
            },
            "item": {
                "type": "id",
                "name": "item"
            }
        };

        test.equal(Compiler.compile(node).render(), '$list.push($item);\n');
        test.done();
    },

    "push front": function (test) {

        var node = {
            "type": "push_front",
            "list": {
                "type": "id",
                "name": "list"
            },
            "item": {
                "type": "id",
                "name": "item"
            }
        };

        test.equal(Compiler.compile(node).render(), '$list.unshift($item);\n');
        test.done();
    }
};
