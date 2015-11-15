/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var JsConstruct = require('../../../codegen/JsConstruct');
var SyncMessage = require('../../../codegen/SyncMessage');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["application"] = {

    "no args": function (test) {

        var node = {
            type: 'application',
            address: {type: 'id', name: 'foo'},
            args: []
        };

        var result = Compiler.compile(node);

        test.ok(result instanceof SyncMessage);
        test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [], function (P0) {P0}, null);\n\n');
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

        var result = Compiler.compile(node);

        test.ok(result instanceof SyncMessage);
        test.equal(JsConstruct.makeStatement(result).render(), 'task.sendMessage($foo, [42], function (P0) {P0}, null);\n\n');
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

        var result = Compiler.compile(node);

        test.ok(result instanceof SyncMessage);
        test.equal(JsConstruct.makeStatement(result).render(), "task.sendMessage($foo, [42, 'hi there'], function (P0) {P0}, null);\n\n");
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

        var result = Compiler.compile(node);

        test.ok(result instanceof SyncMessage);
        test.equal(JsConstruct.makeStatement(result).render(), "task.sendMessage($foo, [], function (P0) {task.sendMessage($bar, [], function (P1) {task.sendMessage($baz, [P0, P1], function (P0) {P0}, null);\n\n}, null);\n\n}, null);\n\n");
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

        var a = Compiler.compile(node).resolve();
        test.equal(a.render(), 'task.sendMessage($foo, [42], function (P0) {P0;\n}, null);\n\n');
        test.ok(a.async);

        // we don't have a good interaction between resolve & attach because of nesting
        // attach only looks at the top structure to see if it has pre and post; but resolve
        // creates nested structures
        // what does resolving do to a sync message?

        // add a statement after resolving
        a.attach(new JsConstruct("foo = bar;"));
        test.equal(a.render(), 'task.sendMessage($foo, [42], function (P0) {P0;\nfoo = bar;}, null);\n\n');

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
            "task.sendMessage($foo, [], function (P0) {task.sendMessage($bar, [], function (P1) {task.sendMessage($baz, [(P0 - P1)], function (P0) {P0;\n}, null);\n\n}, null);\n\n}, null);\n\n");
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
            "task.sendMessage($foo, [], function (P0) {task.sendMessage($bar, [], function (P1) {task.sendMessage($baz, [(P0 - P1)], function (P0) {task.sendMessage($quux, [P0], function (P0) {P0;\n}, null);\n\n}, null);\n\n}, null);\n\n}, null);\n\n");
        test.done();
    }
};
