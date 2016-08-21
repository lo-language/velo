/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["literals"] = {

    "nil": function (test) {

        var node = {type: 'nil'};

        test.deepEqual(new Context().compile(node).renderTree(), JS.NULL.renderTree());
        test.done();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        test.deepEqual(new Context().compile(node).renderTree(), JS.bool('true').renderTree());
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: '42'};

        test.deepEqual(new Context().compile(node).renderTree(), JS.num('42').renderTree());
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        test.deepEqual(new Context().compile(node).renderTree(), JS.string('turanga leela').renderTree());
        test.done();
    },

    "array": function (test) {

        var node = {
            type: 'array',
            elements:
                [ { type: 'string', val: 'foo' },
                    { type: 'string', val: 'mani' },
                    { type: 'string', val: 'padme' },
                    { type: 'string', val: 'hum' } ] };

        test.deepEqual(new Context().compile(node).renderTree(),
            JS.arrayLiteral([JS.string('foo'), JS.string('mani'), JS.string('padme'), JS.string('hum')]).renderTree());
        test.done();
    },

    "set": function (test) {

        var node = {
            type: 'set',
            elements:
                [ { type: 'string', val: 'foo' },
                    { type: 'string', val: 'mani' },
                    { type: 'string', val: 'padme' },
                    { type: 'string', val: 'hum' } ] };

        test.deepEqual(new Context().compile(node).renderTree(), JS.objLiteral([
            [JS.string('foo'), JS.bool(true)],
            [JS.string('mani'), JS.bool(true)],
            [JS.string('padme'), JS.bool(true)],
            [JS.string('hum'), JS.bool(true)]
        ]).renderTree());
        test.done();
    },

    "map": function (test) {

        var node = {
            type: 'map',
            elements:
                [ { type: 'pair',
                    key: { type: 'string', val: 'Zaphod' },
                    value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'pair',
                        key: { type: 'string', val: 'Ford' },
                        value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'pair',
                        key: { type: 'string', val: 'Arthur' },
                        value: { type: 'string', val: 'Earth' } },
                    { type: 'pair',
                        key: { type: 'string', val: 'Trillian' },
                        value: { type: 'string', val: 'Earth' } } ] };

        test.deepEqual(new Context().compile(node).renderTree(), JS.objLiteral([
            [JS.string('Zaphod'), JS.string('Betelgeuse')],
            [JS.string('Ford'), JS.string('Betelgeuse')],
            [JS.string('Arthur'), JS.string('Earth')],
            [JS.string('Trillian'), JS.string('Earth')]
        ]).renderTree());
        
        test.done();
    },

    "record": function (test) {

        var node = {
            type: 'record',
            fields:
                [ { type: 'pair',
                    key: { type: 'string', val: 'Zaphod' },
                    value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'pair',
                        key: { type: 'string', val: 'Ford' },
                        value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'pair',
                        key: { type: 'string', val: 'Arthur' },
                        value: { type: 'string', val: 'Earth' } },
                    { type: 'pair',
                        key: { type: 'string', val: 'Trillian' },
                        value: { type: 'string', val: 'Earth' } } ] };

        test.deepEqual(new Context().compile(node).renderTree(), JS.objLiteral([
            [JS.string('Zaphod'), JS.string('Betelgeuse')],
            [JS.string('Ford'), JS.string('Betelgeuse')],
            [JS.string('Arthur'), JS.string('Earth')],
            [JS.string('Trillian'), JS.string('Earth')]
        ]).renderTree());

        test.done();
    }
};
