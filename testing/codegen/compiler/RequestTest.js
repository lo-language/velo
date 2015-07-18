/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["request statements"] = {

    "request with one arg": function (test) {

        var node = {
            type: 'application_stmt',
            expr: {
                type: 'application',
                of: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: '42'}
                ]}
        };

        test.equal(Compiler.compile(node).render(), '$foo($foo, [42], $connect);');
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'application_stmt',
            expr: {
                type: 'application',
                of: {type: 'id', name: 'baz'},
                args: [{
                    type: 'op',
                    op: '-',
                    left: {
                        type: 'application',
                        of: {type: 'id', name: 'foo'},
                        args: []
                    },
                    right: {
                        type: 'application',
                        of: {type: 'id', name: 'bar'},
                        args: []
                    }
                }]}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(),
            'Q.spread([$foo($foo, [], $connect), $bar($bar, [], $connect)], function (x1, x2) {return (x1 - x2);}).then(function (x1) {return $baz($baz, [x1], $connect);});');
        test.done();
    },

    "several nested requests": function (test) {

        var node = {
            type: 'application_stmt',
            expr: {
                type: 'application',
                of: {type: 'id', name: 'quux'},
                args: [{
                    type: 'application',
                    of: {type: 'id', name: 'baz'},
                    args: [{
                        type: 'op',
                        op: '-',
                        left: {
                            type: 'application',
                            of: {type: 'id', name: 'foo'},
                            args: []
                        },
                        right: {
                            type: 'application',
                            of: {type: 'id', name: 'bar'},
                            args: []
                        }
                    }]}]}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(),
            'Q.spread([$foo($foo, [], $connect), $bar($bar, [], $connect)], function (x1, x2) {return (x1 - x2);}).then(function (x1) {return $baz($baz, [x1], $connect);}).then(function (x1) {return $quux($quux, [x1], $connect);});');
        test.done();
    }
};
