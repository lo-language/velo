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
            address: {type: 'id', name: 'foo'},
            args: []
        };

        test.equal(Compiler.compile(node).render(), 'this.sendMessage($foo, [], function (args) {T1}, null);\n\n');
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'}
            ]
        };

        test.equal(Compiler.compile(node).render(), 'this.sendMessage($foo, [42], function (args) {T1}, null);\n\n');
        test.done();
    },

    "two args": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: 'hi there'}
            ]
        };

        test.equal(Compiler.compile(node).render(), "this.sendMessage($foo, [42, 'hi there'], function (args) {T1}, null);\n\n");
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'baz'},
            args: [{
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: []
            },{
                type: 'application',
                address: {type: 'id', name: 'bar'},
                args: []
            }]
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), "this.sendMessage($bar, [], function (args) {this.sendMessage($foo, [], function (args) {this.sendMessage($baz, [T1, T2], function (args) {T1}, null);\n\n}, null);\n\n}, null);\n\n");
        test.done();
    }
};

module.exports["application statements"] = {

    "application with one arg": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: '42'}
                ]}
        };

        test.equal(Compiler.compile(node).render(), 'this.sendMessage($foo, [42], function (args) {T1}, null);\n\n');
        test.done();
    },

    "with nested applications": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'baz'},
                args: [{
                    type: 'op',
                    op: '-',
                    left: {
                        type: 'application',
                        address: {type: 'id', name: 'foo'},
                        args: []
                    },
                    right: {
                        type: 'application',
                        address: {type: 'id', name: 'bar'},
                        args: []
                    }
                }]}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(),
            'Q.spread([$foo($foo, []), $bar($bar, [])], function (x1, x2) {return (x1 - x2);}).then(function (x1) {return $baz($baz, [x1]);});');
        test.done();
    },

    "several nested applications": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'quux'},
                args: [{
                    type: 'application',
                    address: {type: 'id', name: 'baz'},
                    args: [{
                        type: 'op',
                        op: '-',
                        left: {
                            type: 'application',
                            address: {type: 'id', name: 'foo'},
                            args: []
                        },
                        right: {
                            type: 'application',
                            address: {type: 'id', name: 'bar'},
                            args: []
                        }
                    }]}]}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(),
            'Q.spread([$foo($foo, []), $bar($bar, [])], function (x1, x2) {return (x1 - x2);}).then(function (x1) {return $baz($baz, [x1]);}).then(function (x1) {return $quux($quux, [x1]);});');
        test.done();
    }
};
