/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["subscript"] = {

    "basic": function (test) {

        var node = {
            type: 'subscript',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: '1'}
        };

        test.equal(new Scope().compile(node).render(), '$foo[1]');
        test.done();
    },

    "reverse indexing": function (test) {

        var node = {
            type: 'subscript',
            list: { type: 'id', name: 'foo' },
            index: {type: 'number', val: '-1'} };

        test.equal(new Scope().compile(node).render(), '$foo[$foo.length-1]');
        test.done();
    }
};
