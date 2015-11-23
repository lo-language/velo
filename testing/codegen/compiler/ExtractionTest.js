/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["basics"] = {

    "normal": function (test) {

        var node = {
            type: 'extraction',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: '1'}
        };

        test.equal(Compiler.compile(node).render(), '$foo.splice(1 < 0 ? 1 + $foo.length : 1, 1)[0];');
        test.done();
    },

    "reverse indexing": function (test) {

        var node = {
            type: 'extraction',
            list: { type: 'id', name: 'foo' },
            index: {type: 'number', val: '-1'} };

        test.equal(Compiler.compile(node).render(), '$foo.splice(-1 < 0 ? -1 + $foo.length : -1, 1)[0];');
        test.done();
    }
};
