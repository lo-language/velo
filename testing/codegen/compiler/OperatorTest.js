/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["op"] = {

    "with literals": function (test) {


        var node = {
            type: 'op',
            op: '*',
            left: {type: 'number', val: '1'},
            right: {type: 'number', val: '2'}
        };

        test.equal(new Context().compile(node).render(), '(1 * 2)');
        test.done();
    },

    "translates and/or": function (test) {


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

        test.equal(new Context().compile(node).render(), '((1 && 2) || 3)');
        test.done();
    },

//    "addition handles lists": function (test) {
//
//
//        var node = {
//            type: 'op',
//            op: '+',
//            left: {type: 'id', name: 'foo'},
//            right: {type: 'id', name: 'bar'}
//        };
//
//        // patch sub nodes?
//
//        test.equal(new Context().compile(node).render(), "function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {return left.concat(right);} else return left + right;}($foo,$bar)");
//        test.done();
//    },

    "in operator": function (test) {


        var node = {
            type: 'in',
            left: { type: 'string', val: 'trillian' },
            right: { type: 'id', name: 'dudes' } };

        test.equal(new Context().compile(node).render(), "function (item, collection) {if (Array.isArray(collection)) return collection.indexOf(item) >= 0;else if (typeof val === 'object') return collection.hasOwnProperty(item);}('trillian',$dudes)");
        test.done();
    },

    "equality is strict": function (test) {


        var node = {
            type: 'op',
            op: '==',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        test.equal(new Context().compile(node).render(), "($foo === $bar)");
        test.done();
    },

    "concat": function (test) {

        // if strings, should use + operator
        // if ints, should create an array
        // if arrays, should concat

        var node = {
            type: 'op',
            op: 'concat',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        test.equal(new Context().compile(node).render(), "task.concat($foo, $bar)");
        test.done();
    }
};
