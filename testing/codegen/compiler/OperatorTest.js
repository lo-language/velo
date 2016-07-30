/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["op"] = {

    "with literals": function (test) {

        var node = {
            type: 'op',
            op: '*',
            left: {type: 'number', val: '1'},
            right: {type: 'number', val: '2'}
        };

        test.deepEqual(new Context().compile(node).getTree(), JS.mul(JS.num('1'), JS.num('2')).getTree());
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

        test.deepEqual(new Context().compile(node).getTree(), JS.logicalOr(
            JS.logicalAnd(JS.num('1'), JS.num('2')),
            JS.num('3')).getTree());
        test.done();
    },

    "in operator": function (test) {

        var node = {
            type: 'in',
            left: { type: 'string', val: 'trillian' },
            right: { type: 'id', name: 'dudes' } };

        test.deepEqual(new Context().compile(node).getTree(), JS.runtimeCall('in', [JS.string('trillian'), JS.ID('$dudes')]).getTree());
        test.done();
    },

    "equality is strict": function (test) {

        var node = {
            type: 'op',
            op: '==',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        test.deepEqual(new Context().compile(node).getTree(), JS.strictEqual(JS.ID('$foo'), JS.ID('$bar')).getTree());
        test.done();
    },

    "concat": function (test) {

        // offloads to the runtime lib
        // if strings, should use + operator
        // if ints, should create an array
        // if arrays, should concat

        var node = {
            type: 'op',
            op: 'concat',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        test.deepEqual(new Context().compile(node).getTree(), JS.runtimeCall('concat', [JS.ID('$foo'), JS.ID('$bar')]).getTree());
        test.done();
    }
};
