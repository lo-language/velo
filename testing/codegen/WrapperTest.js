/**
 * Created by spurcell on 8/21/16.
 */

"use strict";

const Wrapper = require('../../codegen/Wrapper');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const util = require('util');

module.exports["basics"] = {

    "one request": function (test) {

        var wrapper = new Wrapper(JS.ID('foo'), [JS.num('57'), JS.string('hello')], "res0");

        var stmt = wrapper.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', 'foo' ],
                        [ 'arrayLiteral', [ [ 'num', '57' ], [ 'string', 'hello' ] ] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ] ], [ "null" ] ] ] ] ]);

        test.done();
    },

    "two requests": function (test) {

        var wrapper = new Wrapper(JS.ID('foo'), [JS.num('57')], "res0");

        wrapper.attach(new Wrapper(JS.ID('bar'), [JS.string('hello')], "res1"));

        var stmt = wrapper.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

        test.deepEqual(stmt.renderTree(), [ 'stmtList', [ 'expr-stmt',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', 'foo' ],
                    [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
                    [ 'function',
                        null,
                        [ 'res0' ],
                        [ 'stmtList', [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                [ [ 'id', 'bar' ],
                                    [ 'arrayLiteral', [ [ 'string', 'hello' ] ] ],
                                    [ 'function',
                                        null,
                                        [ 'res1' ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ] ], [ "null" ] ] ] ] ] ], [ "null" ] ] ] ] ]);

        test.done();
    }
};