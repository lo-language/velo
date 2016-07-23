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

    "increment ID": function (test) {

        var node = {
            "type":"increment",
            "operand":{type: "id", name: "bar"}
        };

        test.deepEqual(new Context().compile(node), JS.stmt(JS.inc(JS.ID('$bar'))));
        test.done();
    },

    "decrement ID": function (test) {

        var node = {
            "type":"decrement",
            "operand":{type: "id", name: "bar"}
        };

        test.deepEqual(new Context().compile(node), JS.stmt(JS.dec(JS.ID('$bar'))));
        test.done();
    },

    "increment subscript": function (test) {

        var node = {
            "type":"increment",
            "operand": {
                type: 'subscript',
                list: {type: 'id', name: 'bar'},
                index: {type: 'number', val: '1'}
            }
        };

        test.deepEqual(new Context().compile(node), JS.stmt(JS.inc(JS.subscript(JS.ID('$bar'), JS.num('1')))));
        test.done();
    },
};
