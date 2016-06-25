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
    }
};
