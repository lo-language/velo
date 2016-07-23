/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
var util = require('util');

module.exports["subscript"] = {

    "basic": function (test) {

        var node = {
            type: 'subscript',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: '1'}
        };

        test.deepEqual(new Context().compile(node), JS.subscript(JS.ID('$foo'), JS.num('1')));
        test.done();
    },

    "reverse indexing": function (test) {

        var node = {
            type: 'subscript',
            list: { type: 'id', name: 'foo' },
            index: {type: 'number', val: '-1'} };

        test.deepEqual(new Context().compile(node), JS.subscript(
            JS.ID('$foo'),
            JS.add(
                JS.select(JS.ID('$foo'), 'length'),
                JS.num('-1')))
        );
        test.done();
    }
};
