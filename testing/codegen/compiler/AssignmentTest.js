/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var scope = new Scope();

        test.equal(scope.has('foo'), false);

        test.equal(Compiler.compile(node, scope).render(), '$foo = 57;\n');
        test.equal(scope.has('foo'), true);
        test.done();
    },

    "assign literal to lvalue expression": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var scope = new Scope();

        test.equal(Compiler.compile(node, scope).render(), '$foo[$bar] = 57;\n');
        test.done();
    },

    "assign id to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        var scope = new Scope();

        test.equal(scope.has('foo'), false);
        test.equal(Compiler.compile(node, scope).render(), '$foo = $bar;\n');
        test.equal(scope.has('foo'), true);
        test.done();
    },

    "assign application to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'application', address: {type: 'id', name: 'bar'}, args: []}
        };

        var scope = new Scope();

        test.equal(scope.has('foo'), false);
        test.equal(Compiler.compile(node, scope).resolve().render(), 'task.sendMessage($bar, [], function (P0) {$foo = P0;\n}, null);\n\n');
        test.equal(scope.has('foo'), true);

        test.done();
    },

    "doesn't assign if in parent scope": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var parent = new Scope();

        parent.declare('foo');

        var scope = parent.bud();

        test.equal(scope.has('foo'), true);

        test.equal(Compiler.compile(node, scope).render(), '$foo = 57;\n');
        test.deepEqual(scope.getJsVars(), []);
        test.done();
    },

    "throws if assigning to constant": function (test) {

        test.done();
    }
};
