/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["select"] = {

    "simple": function (test) {

        var node = {
            "type":"interpolation",
            "left":"hello, ",
            "middle":{
                "type":"id",
                "name":"name"
            },
            "right":"!"
        };

        test.equal(Compiler.compile(node).render(), "'hello, ' + $name + '!'");
        test.done();
    },

    "compound": function (test) {

        var node = {
            "type":"interpolation",
            "left":"I'm sorry, ",
            "middle":{
                "type":"dynastring",
                "left":{
                    "type":"id",
                    "name":"name"
                },
                "middle":", I can't do ",
                "right":{
                    "type":"id",
                    "name":"action"
                }
            },
            "right":"."
        };

        test.equal(Compiler.compile(node).render(), "'I'm sorry, ' + $name + ', I can't do ' + $action + '.'");
        test.done();
    },

    "three parts": function (test) {

        var node = {
            "type":"interpolation",
            "left":"A = ",
            "middle":{
                "type":"dynastring",
                "left":{
                    "type":"id",
                    "name":"a"
                },
                "middle":", B = ",
                "right":{
                    "type":"dynastring",
                    "left": {
                        "type":"id",
                        "name":"b"
                    },
                    "middle":", C = ",
                    "right": {
                        "type":"id",
                        "name":"c"
                    }
                }
            },
            "right":"."
        };

        test.equal(Compiler.compile(node).render(), "'A = ' + $a + ', B = ' + $b + ', C = ' + $c + '.'");
        test.done();
    }
};
