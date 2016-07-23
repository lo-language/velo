/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
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

        test.deepEqual(new Context().compile(node), JS.message(
            JS.ID('$foo'), [], null, null)),
        test.done();
    },

    //"with futures and subsequent": function (test) {
    //
    //    var node = {
    //        type: 'message',
    //        address: {
    //            "type": "id",
    //            "name": "foo"
    //        },
    //        args: [{type: 'id', name: 'url'}],
    //        futures: [{type: 'id', name: 'res'}, {type: 'id', name: 'body'}],
    //        subsequent: {
    //            type: 'stmt_list',
    //            head: { type: 'assign',
    //                op: '=',
    //                left: { type: 'id', name: 'bar' },
    //                right: { type: 'id', name: 'body'}
    //            },
    //            tail: null
    //        }
    //    };
    //
    //    test.equal(new Context().compile(node),
    //        'task.sendMessage($foo, [$url], function (args) {$res = args.shift();\n$body = args.shift();\n$bar = $body;\n}, null);\n\n');
    //    test.done();
    //},

    //"with futures but no subsequent": function (test) {
    //
    //    var node = {
    //        type: 'message',
    //        address: {
    //            "type": "id",
    //            "name": "foo"
    //        },
    //        args: [{type: 'id', name: 'url'}],
    //        futures: [{type: 'id', name: 'res'}, {type: 'id', name: 'body'}]
    //    };
    //
    //    test.equal(new Context().compile(node), 'task.sendMessage($foo, [$url], function (args) {$res = args.shift();\n\$body = args.shift();\n}, null);\n\n');
    //    test.done();
    //},

    "passes scope down": function (test) {

        var node = {
            type: 'message',
            address: {
                "type": "id",
                "name": "foo"
            },
            args: [{type: 'id', name: 'url'}],
            subsequent: {
                type: 'procedure',
                channel: 'reply',
                params: [],
                body: {
                    type: 'stmt_list',
                    head: { type: 'assign',
                        op: '=',
                        left: { type: 'id', name: 'bar' },
                        right: { type: 'id', name: 'answer'}
                    },
                    tail: null
                }
            }
        };

        var scope = new Context();
        scope.define('answer', '42');

        // test.deepEqual(scope.createInner().compile(node),
        //     'task.sendMessage($foo, [$url], function (args) {var $bar;\n\n\n$bar = 42;\n}, null)');

        test.deepEqual(new Context().compile(node), JS.message(
            JS.ID('$foo'), [JS.ID('$url')], JS.handler([]), null));
        
        test.done();
    }

    // todo support futures w/no subsequent
};