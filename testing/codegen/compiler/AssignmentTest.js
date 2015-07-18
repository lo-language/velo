/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["assignment"] = {

    "assign literal of id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var scope = new Scope();
        var result = Compiler.compile(node, scope);

        test.equal(Compiler.compile(node).render(), '$foo = 57;\n');
//        test.ok(scope.getStatus('foo'));
        test.done();
    },

    "assign literal of expression": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), '$foo[$bar] = 57;\n');

        // context isn't modified by this
        test.throws(function () {scope.getStatus('foo')});
        test.done();
    },

    "assign ready id of id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        var scope = new Scope();

        scope.define('bar', true);

        test.equal(Compiler.compile(node).render(), '$foo = $bar;\n');
        test.done();
    },

    "assign request of id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'application', of: {type: 'id', name: 'bar'}, args: []}
        };

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), '$bar($bar, [], $connect).then(function (x1) {$foo = x1;\n})');
        test.done();
    }
};
