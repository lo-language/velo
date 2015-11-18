/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["literals"] = {

    "nil": function (test) {

        var node = {type: 'nil'};

        test.equal(Compiler.compile(node), 'null');
        test.done();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        test.equal(Compiler.compile(node), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: '42'};

        test.equal(Compiler.compile(node), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        test.equal(Compiler.compile(node), "'turanga leela'");
        test.done();
    },

    "list": function (test) {

        var node = {
            type: 'array',
            elements:
                [ { type: 'string', val: 'foo' },
                    { type: 'string', val: 'mani' },
                    { type: 'string', val: 'padme' },
                    { type: 'string', val: 'hum' } ] };

        test.equal(Compiler.compile(node).render(), "['foo', 'mani', 'padme', 'hum']");
        test.done();
    },

    "map": function (test) {

        var node = {
            type: 'map',
            elements:
                [ { type: 'dyad',
                    key: { type: 'string', val: 'Zaphod' },
                    value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'dyad',
                        key: { type: 'string', val: 'Ford' },
                        value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'dyad',
                        key: { type: 'string', val: 'Arthur' },
                        value: { type: 'string', val: 'Earth' } },
                    { type: 'dyad',
                        key: { type: 'string', val: 'Trillian' },
                        value: { type: 'string', val: 'Earth' } } ] };

        test.equal(Compiler.compile(node).render(), "{'Zaphod':'Betelgeuse', 'Ford':'Betelgeuse', 'Arthur':'Earth', 'Trillian':'Earth'}");
        test.done();
    },

    "record": function (test) {

        var node = {
            type: 'record',
            fields:
                [ { type: 'dyad',
                    key: { type: 'string', val: 'Zaphod' },
                    value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'dyad',
                        key: { type: 'string', val: 'Ford' },
                        value: { type: 'string', val: 'Betelgeuse' } },
                    { type: 'dyad',
                        key: { type: 'string', val: 'Arthur' },
                        value: { type: 'string', val: 'Earth' } },
                    { type: 'dyad',
                        key: { type: 'string', val: 'Trillian' },
                        value: { type: 'string', val: 'Earth' } } ] };

        test.equal(Compiler.compile(node).render(), "{'Zaphod':'Betelgeuse', 'Ford':'Betelgeuse', 'Arthur':'Earth', 'Trillian':'Earth'}");
        test.done();
    }
};
