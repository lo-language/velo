/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["subscript"] = {

    "basic": function (test) {

        var node = {
            type: 'subscript',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: '1'}
        };

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), '$foo[1]');
        test.done();
    },

    "last element shortcut": function (test) {

        var node = {
            type: 'subscript',
            list: { type: 'id', name: 'foo' },
            index: undefined };

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), '$foo[$foo.length - 1]');
        test.done();
    }
};
