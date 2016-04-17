/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

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

        test.equal(context.compile(node).render(), '$foo = 57;\n');
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

        test.equal(context.compile(node).render(), '$foo[$bar] = 57;\n');
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
        test.equal(context.compile(node).render(), '$foo = $bar;\n');
        test.equal(context.has('foo'), true);
        test.done();
    },

    "assign application to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'application', address: {type: 'id', name: 'bar'}, args: []}
        };

        var context = new Context().createInner();

        test.equal(context.has('foo'), false);
        test.equal(context.compile(node).render(), 'task.sendMessage($bar, [], function (P0) {$foo = P0;\n}, null);\n\n');
        test.equal(context.has('foo'), true);

        test.done();
    },

    "doesn't assign if in parent context": function (test) {

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

        test.equal(context.compile(node).render(), '$foo = 57;\n');
        test.deepEqual(context.getJsVars(), []);
        test.done();
    },

    "throws if assigning to constant": function (test) {

        test.done();
    }
};
