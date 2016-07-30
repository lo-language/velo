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

        var handler = JS.fnDef(['args'],
            JS.varDecl('$foo').attach(
                new JsStmt(JS.assign(JS.ID('$foo'), JS.num('42')))));

        test.deepEqual(new Context().compile(node), JS.message(JS.ID('$foo'), [], handler, null));
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

        var handler = JS.fnDef(['args'],
            JS.varDecl('$foo').attach(
                JS.stmt(JS.assign(JS.ID('$foo'), JS.num('42')))));

        test.deepEqual(new Context().compile(node), JS.message(JS.ID('$foo'), [], null, handler));
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

        var replyHandler = JS.fnDef(['args'],
            JS.varDecl('$foo').attach(
                JS.stmt(JS.assign(JS.ID('$foo'), JS.num('42')))));

        var failHandler = JS.fnDef(['args'],
            JS.varDecl('$bar').attach(
                JS.stmt(JS.assign(JS.ID('$bar'), JS.num('57')))));

        test.deepEqual(new Context().compile(node), JS.message(JS.ID('$foo'), [], replyHandler, failHandler));
        test.done();
    }
};