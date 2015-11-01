/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var util = require('util');

module.exports["message"] = {

    "no args, handlers or futures": function (test) {

        var node = {
            "type":"message",
            "args": [],
            "address": {
                "type": "id",
                "name": "foo"
            }
        };

        test.equal(Compiler.compile(node).render(), 'task.sendMessage($foo, [], null, null);\n\n');
        test.done();
    },

    "with futures and subsequent": function (test) {

        var node = {
            type: 'message',
            address: {
                "type": "id",
                "name": "foo"
            },
            args: [{type: 'id', name: 'url'}],
            futures: [{type: 'id', name: 'res'}, {type: 'id', name: 'body'}],
            subsequent: {
                type: 'stmt_list',
                head: { type: 'assign',
                    op: '=',
                    left: { type: 'id', name: 'bar' },
                    right: { type: 'id', name: 'body'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(), 'task.sendMessage($foo, [$url], function (args) {$res = args.shift();\n$body = args.shift();\n$bar = $body;\n}, null);\n\n');
        test.done();
    },

    "with futures but no subsequent": function (test) {

        var node = {
            type: 'message',
            address: {
                "type": "id",
                "name": "foo"
            },
            args: [{type: 'id', name: 'url'}],
            futures: [{type: 'id', name: 'res'}, {type: 'id', name: 'body'}]
        };

        test.equal(Compiler.compile(node).render(), 'task.sendMessage($foo, [$url], function (args) {$res = args.shift();\n\$body = args.shift();\n}, null);\n\n');
        test.done();
    }

    // todo support futures w/no subsequent
};