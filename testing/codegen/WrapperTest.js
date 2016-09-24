/**
 * Created by spurcell on 8/21/16.
 */

"use strict";

const Wrapper = require('../../codegen/Wrapper');
const Request = require('../../codegen/Request');
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

        var placeholder = wrapper.pushRequest(new Request(JS.ID('foo'), [JS.num('57'), JS.string('hello')], null, null, true));
        test.equal(wrapper.isEmpty(), false);

        test.deepEqual(placeholder.renderTree(), ["subscript", [ 'id', 'res0' ], [ "num", "0" ]]);

        var stmt = wrapper.wrap(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

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
                                    [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ] ] ] ] ] ]);

        test.done();
    },

    "two requests": function (test) {

        var wrapper = new Wrapper();

        var ph1 = wrapper.pushRequest(new Request(JS.ID('foo'), [JS.num('57')], null, null, true));
        test.equal(wrapper.isEmpty(), false);

        var ph2 = wrapper.pushRequest(new Request(JS.ID('bar'), [JS.string('hello')], null, null, true));
        test.equal(wrapper.isEmpty(), false);

        test.deepEqual(ph1.renderTree(), [ "subscript", [ 'id', 'res0' ], [ "num", "0" ]]);
        test.deepEqual(ph2.renderTree(), [ "subscript", [ 'id', 'res1' ], [ "num", "0" ]]);

        var stmt = wrapper.wrap(new JsStmt(JS.exprStmt(JS.assign(JS.ID('bazball'), JS.num('11')))));

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
                                            [ 'expr-stmt', [ 'assign', [ 'id', 'bazball' ], [ 'num', '11' ] ] ] ] ] ] ] ] ] ] ] ] ] ]);

        test.done();
    }
};