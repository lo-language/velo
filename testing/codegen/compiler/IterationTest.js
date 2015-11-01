/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var JsConstruct = require('../../../codegen/JsConstruct');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["basics"] = {

    "no outer continuation": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();

        test.equal(Compiler.compile(node, scope).render(), 'var loop = function () {if ($foo) {$bar = 42;\nsetImmediate(loop.bind());}};\n\nloop.call();\n');
        test.done();
    },

    "with outer continuation": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope(null, "cc"); // not a valid continuation call, but it's just subbed in

        test.equal(Compiler.compile(node, scope).render(), 'var loop = function () {if ($foo) {$bar = 42;\nsetImmediate(loop.bind());}\nelse {cc}};\n\nloop.call();\n');
        test.done();
    }
};
