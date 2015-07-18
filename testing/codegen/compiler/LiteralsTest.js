/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["literals"] = {

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
            type: 'list',
            elements:
                [ { type: 'string', val: 'foo' },
                    { type: 'string', val: 'mani' },
                    { type: 'string', val: 'padme' },
                    { type: 'string', val: 'hum' } ] };

        test.equal(Compiler.compile(node).render(), "['foo', 'mani', 'padme', 'hum']");
        test.done();
    },

    "set": function (test) {

        var node = { type: 'set',
            members:
                [ { type: 'dyad',
                    key: { type: 'symbol', name: 'zaphod' },
                    value: { type: 'boolean', val: true } },
                    { type: 'dyad',
                        key: { type: 'symbol', name: 'ford' },
                        value: { type: 'boolean', val: true } },
                    { type: 'dyad',
                        key: { type: 'symbol', name: 'arthur' },
                        value: { type: 'boolean', val: true } },
                    { type: 'dyad',
                        key: { type: 'symbol', name: 'ford' },
                        value: { type: 'boolean', val: true } } ] };

        test.equal(Compiler.compile(node).render(), "{'<zaphod>':true, '<ford>':true, '<arthur>':true, '<ford>':true}");
        test.done();
    }
};
