/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["application"] = {

    "no args": function (test) {

        var node = {
            type: 'application',
            of: {type: 'id', name: 'foo'},
            args: []
        };

        test.equal(Compiler.compile(node).render(), '$foo($foo, [], $connect)');
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'application',
            of: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'}
            ]
        };

        test.equal(Compiler.compile(node).render(), '$foo($foo, [42], $connect)');
        test.done();
    },

    "two args": function (test) {

        var node = {
            type: 'application',
            of: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: 'hi there'}
            ]
        };

        test.equal(Compiler.compile(node).render(), "$foo($foo, [42, 'hi there'], $connect)");
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'application',
            of: {type: 'id', name: 'baz'},
            args: [{
                type: 'application',
                of: {type: 'id', name: 'foo'},
                args: []
            },{
                type: 'application',
                of: {type: 'id', name: 'bar'},
                args: []
            }]
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), "Q.spread([$foo($foo, [], $connect), $bar($bar, [], $connect)], function (x1, x2) {return $baz($baz, [x1, x2], $connect);})");
        test.done();
    }
};
