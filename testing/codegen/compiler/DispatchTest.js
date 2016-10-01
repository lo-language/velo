/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

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

        test.deepEqual(new Context().compile(node).renderTree(), [ 'stmtList',
            [ 'call',
            [ 'select', [ 'id', 'task' ], 'sendMessage' ],
            [ [ 'id', '$foo' ],
                [ 'arrayLiteral', [] ],
                [ 'function',
                    null,
                    [ 'args' ],
                    [ 'stmtList',
                        [ 'var', '$foo' ],
                        [ 'stmtList',
                            [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ] ] ] ]);
        test.done();
    },

    "attach": function (test) {

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

        var result = new Context().compile(node);

        result.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('$bazball'), JS.num('42')))));

        test.deepEqual(result.renderTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'function',
                        null,
                        [ 'args' ],
                        [ 'stmtList',
                            [ 'var', '$foo' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'assign', [ 'id', '$bazball' ], [ 'num', '42' ] ] ] ] ]);
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

        test.deepEqual(new Context().compile(node).renderTree(), [ 'stmtList',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', '$foo' ],
                    [ 'arrayLiteral', [] ],
                    [ 'null' ],
                    [ 'function',
                        null,
                        [ 'args' ],
                        [ 'stmtList',
                            [ 'var', '$foo' ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ] ] ] ]);
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

        test.deepEqual(new Context().compile(node).renderTree(),
            [ 'stmtList',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$foo' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$foo' ], [ 'num', '42' ] ] ] ] ] ],
                        [ 'function',
                            null,
                            [ 'args' ],
                            [ 'stmtList',
                                [ 'var', '$bar' ],
                                [ 'stmtList',
                                    [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '57' ] ] ] ] ] ] ] ] ]);
        test.done();
    }
};