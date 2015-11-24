/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["slice"] = {

    "basic": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo'},
            start: {type: 'number', val: '1'},
            end: {type: 'number', val: '3'},
        };

        test.equal(Compiler.compile(node).render(), '$foo.slice(1,3)');
        test.done();
    },

    "reverse indexing": function (test) {

        var node = {
            type: 'slice',
            list: {type: 'id', name: 'foo' },
            start: {type: 'number', val: '-3'},
            end: {type: 'number', val: '-1'}
        };


        test.equal(Compiler.compile(node).render(), '$foo.slice($foo.length-3,$foo.length-1)');
        test.done();
    }
};
