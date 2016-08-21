/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["slice"] = {

    "basic slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
            start: {type: 'number', val: '1'},
            end: {type: 'number', val: '3'},
        };

        test.deepEqual(new Context().compile(node).renderTree(), JS.fnCall(
            JS.select(JS.ID('$foo'), 'slice'),
            [JS.num('1'), JS.add(JS.num('3'), JS.num('1'))]).renderTree());

        test.done();
    },

    "shorthand slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
        };

        test.deepEqual(new Context().compile(node).renderTree(), JS.fnCall(
            JS.select(JS.ID('$foo'), 'slice'),
            [JS.num('0')]).renderTree());

        test.done();
    },

    "reverse indexing slice": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo' },
            start: {type: 'number', val: '-3'},
            end: {type: 'number', val: '-1'}
        };

        test.deepEqual(new Context().compile(node).renderTree(), JS.fnCall(
            JS.select(JS.ID('$foo'), 'slice'),
            [JS.num('-3'), JS.add(JS.num('-1'), JS.num('1'))]).renderTree());

        test.done();
    }
};
