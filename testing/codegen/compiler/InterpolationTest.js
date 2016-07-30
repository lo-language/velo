/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
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

        test.deepEqual(new Context().compile(node).getTree(), JS.add(
            JS.add(JS.string('hello, '), JS.ID('$name')),
            JS.string('!')
        ).getTree());
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

        test.deepEqual(new Context().compile(node).getTree(), JS.add(
            JS.add(
                JS.string("I'm sorry, "),
                JS.add(
                    JS.add(JS.ID('$name'), JS.string(", I can't do ")),
                    JS.ID('$action')
                )
            ),
            JS.string('.')
        ).getTree());

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

        var exp = JS.add(
            JS.add(
                JS.string("A = "),
                JS.add(
                    JS.add(JS.ID('$a'), JS.string(", B = ")),
                    JS.add(
                        JS.add(JS.ID('$b'), JS.string(", C = ")),
                        JS.ID('$c')))),
            JS.string('.'));

        test.deepEqual(new Context().compile(node).getTree(), exp.getTree());
        test.done();
    }
};
