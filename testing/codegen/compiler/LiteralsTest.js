/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["literals"] = {

    "nil": function (test) {

        var node = {type: 'nil'};

        test.equal(new Context().compile(node), 'null');
        test.done();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        test.equal(new Context().compile(node), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: '42'};

        test.equal(new Context().compile(node), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        test.equal(new Context().compile(node), "'turanga leela'");
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

        test.equal(new Context().compile(node).render(), "['foo', 'mani', 'padme', 'hum']");
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

        test.equal(new Context().compile(node).render(), "{'foo': true, 'mani': true, 'padme': true, 'hum': true}");
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

        test.equal(new Context().compile(node).render(), "{'Zaphod':'Betelgeuse', 'Ford':'Betelgeuse', 'Arthur':'Earth', 'Trillian':'Earth'}");
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

        test.equal(new Context().compile(node).render(), "{'Zaphod':'Betelgeuse', 'Ford':'Betelgeuse', 'Arthur':'Earth', 'Trillian':'Earth'}");
        test.done();
    }
};
