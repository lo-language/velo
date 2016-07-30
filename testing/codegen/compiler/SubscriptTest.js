/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["subscript"] = {

    "basic": function (test) {

        var node = {
            type: 'subscript',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: '1'}
        };

        test.deepEqual(new Context().compile(node).getTree(), JS.subscript(JS.ID('$foo'), JS.num('1')).getTree());
        test.done();
    },

    "reverse indexing": function (test) {

        var node = {
            type: 'subscript',
            list: { type: 'id', name: 'foo' },
            index: {type: 'number', val: '-1'} };

        test.deepEqual(new Context().compile(node).getTree(), JS.subscript(
            JS.ID('$foo'),
            JS.add(
                JS.select(JS.ID('$foo'), 'length'),
                JS.num('-1'))).getTree()
        );
        test.done();
    }
};
