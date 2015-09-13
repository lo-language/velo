/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["op"] = {

    "with literals": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: '*',
            left: {type: 'number', val: '1'},
            right: {type: 'number', val: '2'}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), '(1 * 2)');
        test.done();
    },

    "translates and/or": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: 'or',
            left:{
                type: 'op',
                op: 'and',
                left: {type: 'number', val: '1'},
                right: {type: 'number', val: '2'}
            },
            right: {type: 'number', val: '3'}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), '((1 && 2) || 3)');
        test.done();
    },

    "addition handles lists": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: '+',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), "function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {return left.concat(right);} else return left + right;}($foo,$bar)");
        test.done();
    },

    "in operator": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'in',
            left: { type: 'string', val: 'trillian' },
            right: { type: 'id', name: 'dudes' } };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), "function (item, collection) {if (Array.isArray(collection)) return collection.indexOf(item) >= 0;else if (typeof val === 'object') return collection.hasOwnProperty(item);}('trillian',$dudes)");
        test.done();
    }

//    "with promises": function (test) {
//
//        // should create a context
//        // should call compile on each statement
//
//        var node = {
//            type: 'op',
//            op: '+',
//            left: {type: 'number', val: '1'},
//            right: {type: 'number', val: '2'}
//        };
//
//        // patch sub nodes?
//
//        compiler.handlers["op"](node);
//
//        test.deepEqual(node.js, {value: '(1 + 2)'});
//        test.done();
//    },
};
