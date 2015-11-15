/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["dispatch"] = {

    "with response handler": function (test) {

        var node = {
            "type":"message",
            "args": [],
            "address": {
                "type": "id",
                "name": "foo"
            },
            "subsequent": {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'foo'},
                    right: {type: 'number', val: '42'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(),
            'task.sendMessage($foo, [], function (args) {$foo = 42;\n}, null);\n\n');
        test.done();
    },

    "contingency handler only": function (test) {

        var node = {
            "type":"message",
            "args": [],
            "address": {
                "type": "id",
                "name": "foo"
            },
            "contingency": {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'foo'},
                    right: {type: 'number', val: '42'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(),
            'task.sendMessage($foo, [], null, function (args) {$foo = 42;\n});\n\n');
        test.done();
    },

    "with both handlers": function (test) {

        var node = {
            "type":"message",
            "args": [],
            "address": {
                "type": "id",
                "name": "foo"
            },
            "subsequent": {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'foo'},
                    right: {type: 'number', val: '42'}
                },
                tail: null
            },
            "contingency": {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'bar'},
                    right: {type: 'number', val: '57'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(),
            'task.sendMessage($foo, [], function (args) {$foo = 42;\n}, function (args) {$bar = 57;\n});\n\n');
        test.done();
    }
};