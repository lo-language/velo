/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

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

        test.deepEqual(new Context().compile(node).renderTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ], [ 'arrayLiteral', [] ], [ 'null' ] ] ] ]);
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
        scope.define('answer', JS.num('42'));

        // todo test where bar is defined in an outer scope (shouldn't declare again)

        test.deepEqual(scope.createInner().compile(node).renderTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [ [ 'id', '$url' ] ] ],
                    [ 'function',
                        null,
                        [ 'args' ],
                        [ 'stmtList',
                            [ 'var', '$bar' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ] ] ] ] ]);

        test.done();
    }

    // todo support futures w/no subsequent
};