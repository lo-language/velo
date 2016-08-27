/**
 * Created by spurcell on 8/21/16.
 */

"use strict";

const Wrapper = require('../../codegen/Wrapper');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const util = require('util');

module.exports["basics"] = {

    "no requests": function (test) {

        var wrapper = new Wrapper();

        test.equal(wrapper.isEmpty(), true);

        // should pass through
        var stmt = wrapper.wrap(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

        test.deepEqual(stmt.renderTree(),
                        [ 'stmtList',
                            [ 'expr-stmt',
                                [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ]);

        test.done();
    },

    "one request": function (test) {

        var wrapper = new Wrapper();

        var placeholder = wrapper.pushRequest(JS.ID('foo'), [JS.num('57'), JS.string('hello')]);
        test.equal(wrapper.isEmpty(), false);

        test.deepEqual(placeholder.renderTree(), [ 'id', 'P0' ]);

        var stmt = wrapper.wrap(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

        test.deepEqual(stmt.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', 'foo' ],
                        [ 'arrayLiteral', [ [ 'num', '57' ], [ 'string', 'hello' ] ] ],
                        [ 'function',
                            null,
                            [ 'P0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "two requests": function (test) {

        var wrapper = new Wrapper();

        var ph1 = wrapper.pushRequest(JS.ID('foo'), [JS.num('57')]);
        test.equal(wrapper.isEmpty(), false);

        var ph2 = wrapper.pushRequest(JS.ID('bar'), [JS.string('hello')]);
        test.equal(wrapper.isEmpty(), false);

        test.deepEqual(ph1.renderTree(), [ 'id', 'P0' ]);
        test.deepEqual(ph2.renderTree(), [ 'id', 'P1' ]);

        var stmt = wrapper.wrap(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

        test.deepEqual(stmt.renderTree(), [ 'stmtList', [ 'expr-stmt',
            [ 'call',
                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                [ [ 'id', 'foo' ],
                    [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
                    [ 'function',
                        null,
                        [ 'P0' ],
                        [ 'stmtList', [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                [ [ 'id', 'bar' ],
                                    [ 'arrayLiteral', [ [ 'string', 'hello' ] ] ],
                                    [ 'function',
                                        null,
                                        [ 'P1' ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};