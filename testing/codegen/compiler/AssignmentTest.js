/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Compiler = require('../../../codegen/Compiler');
const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);

        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57'))).getTree());
        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign literal to lvalue expression": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var context = new Context().createInner();

        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.assign(JS.subscript(JS.ID('$foo'), JS.ID('$bar')), JS.num('57'))).getTree());
        test.done();
    },

    "assign id to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);
        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.assign(JS.ID('$foo'), JS.ID('$bar'))).getTree());
        test.equal(context.has('foo'), true);
        test.done();
    },

    // "assign application to id": function (test) {
    //
    //     var node = {
    //         type: 'assign',
    //         op: '=',
    //         left: {type: 'id', name: 'foo'},
    //         right: {type: 'application', address: {type: 'id', name: 'bar'}, args: []}
    //     };
    //
    //     var context = new Context().createInner();
    //
    //     test.equal(context.has('foo'), false);
    //     test.deepEqual(context.compile(node), 'task.sendMessage($bar, [], function (res) {\nvar P0 = res ? res[0] : null;\n$foo = P0;\n}, null);\n\n');
    //     test.equal(context.has('foo'), true);
    //
    //     test.done();
    // },

    "doesn't declare if in parent context": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var parent = new Context().createInner();

        parent.declare('foo');

        var context = parent.createInner();

        test.equal(context.has('foo'), true);

        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.assign(JS.ID('$foo'), JS.num('57'))).getTree());
        test.deepEqual(context.getJsVars(), []);
        test.done();
    },

    "throws if assigning to constant": function (test) {

        test.done();
    }
};
