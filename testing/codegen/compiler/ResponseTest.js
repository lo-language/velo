/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const util = require('util');
const JsStmt = require('../../../codegen/JsStmt');

module.exports["response"] = {

    "reply without args": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: []};

        test.deepEqual(new Context().compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ], [ 'arrayLiteral', [] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "reply with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.deepEqual(new Context().compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "reply with two args": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: "hot dog!"}
            ]};

        test.deepEqual(new Context().compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'reply' ],
                            [ 'arrayLiteral',
                                [ [ 'num', '42' ], [ 'string', 'hot dog!' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    },

    "fail with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.deepEqual(new Context().compile(node).renderTree(),
            [ 'stmtList',
                [ 'expr-stmt',
                    [ 'call',
                        [ 'select', [ 'id', 'task' ], 'respond' ],
                        [ [ 'string', 'fail' ],
                            [ 'arrayLiteral', [ [ 'num', '42' ] ] ] ] ] ],
                [ 'stmtList', [ 'return' ] ] ]);
        test.done();
    }
};