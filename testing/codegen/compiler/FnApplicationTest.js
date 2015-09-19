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

        test.equal(Compiler.compile(node).resolve().render(), 'this.sendMessage($foo, [], function (P0) {P0}, null);\n\n');
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

        test.equal(Compiler.compile(node).resolve().render(), 'this.sendMessage($foo, [42], function (P0) {P0}, null);\n\n');
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

        test.equal(Compiler.compile(node).resolve().render(), "this.sendMessage($foo, [42, 'hi there'], function (P0) {P0}, null);\n\n");
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

        test.equal(Compiler.compile(node).resolve().render(), "this.sendMessage($foo, [], function (P1) {this.sendMessage($bar, [], function (P2) {this.sendMessage($baz, [P1, P2], function (P0) {P0}, null);\n\n}, null);\n\n}, null);\n\n");
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

        test.equal(Compiler.compile(node).resolve().render(), 'this.sendMessage($foo, [42], function (P0) {P0;\n}, null);\n\n');
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

        test.equal(Compiler.compile(node).resolve().render(),
            "this.sendMessage($foo, [], function (P1) {this.sendMessage($bar, [], function (P2) {this.sendMessage($baz, [(P1 - P2)], function (P0) {P0;\n}, null);\n\n}, null);\n\n}, null);\n\n");
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

        test.equal(Compiler.compile(node).resolve().render(),
            "this.sendMessage($foo, [], function (P2) {this.sendMessage($bar, [], function (P3) {this.sendMessage($baz, [(P2 - P3)], function (P1) {this.sendMessage($quux, [P1], function (P0) {P0;\n}, null);\n\n}, null);\n\n}, null);\n\n}, null);\n\n");
        test.done();
    }
};
