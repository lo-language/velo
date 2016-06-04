/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
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
                type: "procedure",
                channel: "reply",
                params: [],
                body: {
                    type: "stmt_list",
                    head: {
                        type: 'assign',
                        op: '=',
                        left: {type: 'id', name: 'foo'},
                        right: {type: 'number', val: '42'}
                    },
                    tail: null
                }
            }
        };

        test.equal(new Context().compile(node).render(),
            'task.sendMessage($foo, [], function (args) {var $foo;\n\n\n$foo = 42;\n}, null)');
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
                type: "procedure",
                channel: "fail",
                params: [],
                body: {
                    type: "stmt_list",
                    head: {
                        type: 'assign',
                        op: '=',
                        left: {type: 'id', name: 'foo'},
                        right: {type: 'number', val: '42'}
                    },
                    tail: null
                }
            }
        };

        test.equal(new Context().compile(node).render(),
            'task.sendMessage($foo, [], null, function (args) {var $foo;\n\n\n$foo = 42;\n})');
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
                type: "procedure",
                channel: "reply",
                params: [],
                body: {
                    type: "stmt_list",
                    head: {
                        type: 'assign',
                        op: '=',
                        left: {type: 'id', name: 'foo'},
                        right: {type: 'number', val: '42'}
                    },
                    tail: null
                }
            },
            "contingency": {
                type: "procedure",
                channel: "fail",
                params: [],
                body: {
                    type: "stmt_list",
                    head: {
                        type: 'assign',
                        op: '=',
                        left: {type: 'id', name: 'bar'},
                        right: {type: 'number', val: '57'}
                    },
                    tail: null
                }
            }
        };

        test.equal(new Context().compile(node).render(),
            'task.sendMessage($foo, [], function (args) {var $foo;\n\n\n$foo = 42;\n}, function (args) {var $bar;\n\n\n$bar = 57;\n})');
        test.done();
    }
};