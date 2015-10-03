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

    "positive only": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), 'if ($foo) {$bar = 42;\n}\n\n');
        test.done();
    },

    "positive and negative blocks": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null},
            otherwise: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '32'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), 'if ($foo) {$bar = 42;\n}\n\nelse {$bar = 32;\n}\n\n');
        test.done();
    },

    "with else if": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null},
            otherwise: {type: 'stmt_list', head: {
                type: 'conditional',
                predicate: {type: 'id', name: 'bar'},
                consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '32'}}, tail: null},
                otherwise: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'baz'}, right: {type: 'number', val: '82'}}, tail: null},
            }, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(),
            'if ($foo) {$bar = 42;\n}\n\nelse {if ($bar) {$bar = 32;\n}\n\nelse {$baz = 82;\n}\n\n}\n\n');
        test.done();
    }
};

module.exports["async"] = {

    "positive with continuation creates else": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {
                type: 'stmt_list',
                head: {type: 'assign', op: '=',
                    left: {type: 'id', name: 'bar'},
                    right: {type: 'application', address: {type: 'id', name: 'foo'}, args: []}},
                tail: null}
        };

        var scope = new Scope(null, "cc.call(this);");

        test.equal(Compiler.compile(node, scope).render(),
            "if ($foo) {this.sendMessage($foo, [], function (P0) {$bar = P0;\ncc.call(this);}, null);\n\n}\n\nelse {cc.call(this);}\n\n");
        test.done();
    },

    "continuation skipped after response": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {
                type: 'stmt_list',
                head: {
                    type: 'response',
                    channel: 'reply',
                    args: [
                        {type: 'number', val: '42'}
                    ]},
                tail: null}
        };

        var scope = new Scope(null, "cc.call(this);");

        test.equal(Compiler.compile(node, scope).render(),
            "if ($foo) {this.reply(42);\nreturn;}\n\nelse {cc.call(this);}\n\n");
        test.done();
    }
};
