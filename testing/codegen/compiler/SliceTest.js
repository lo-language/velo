/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
var util = require('util');

module.exports["slice"] = {

    "basic slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
            start: {type: 'number', val: '1'},
            end: {type: 'number', val: '3'},
        };

        test.deepEqual(new Context().compile(node), JS.fnCall(
            JS.select(JS.ID('$foo'), 'slice'),
            [JS.num('1'), JS.add(JS.num('3'), JS.num('1'))]));

        test.done();
    },

    "shorthand slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
        };

        test.deepEqual(new Context().compile(node), JS.fnCall(
            JS.select(JS.ID('$foo'), 'slice'),
            [JS.num('0')]));

        test.done();
    },

    "reverse indexing slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo' },
            start: {type: 'number', val: '-3'},
            end: {type: 'number', val: '-1'}
        };

        test.deepEqual(new Context().compile(node), JS.fnCall(
            JS.select(JS.ID('$foo'), 'slice'),
            [JS.num('-3'), JS.add(JS.num('-1'), JS.num('1'))]));

        test.done();
    }
};
