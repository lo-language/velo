/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var JsConstruct = require('../../../codegen/JsConstruct');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["sync"] = {

    "positive only": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        test.equal(new Context().createInner().compile(node).render(),
            'if ($foo) {$bar = 42;\n}\n\n');
        test.done();
    },

    "positive and negative blocks": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null},
            alternate: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '32'}}, tail: null}
        };

        test.equal(new Context().createInner().compile(node).render(),
            'if ($foo) {$bar = 42;\n}\n\nelse {$bar = 32;\n}\n\n');
        test.done();
    },

    "with else if": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null},
            alternate: {type: 'stmt_list', head: {
                type: 'conditional',
                predicate: {type: 'id', name: 'bar'},
                consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '32'}}, tail: null},
                alternate: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'baz'}, right: {type: 'number', val: '82'}}, tail: null},
            }, tail: null}
        };

        test.equal(new Context().createInner().compile(node).render(),
            'if ($foo) {$bar = 42;\n}\n\nelse {if ($bar) {$bar = 32;\n}\n\nelse {$baz = 82;\n}\n\n}\n\n');
        test.done();
    }
};

module.exports["async"] = {

    "positive with async body creates else": function (test) {

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

        test.equal(new Context().createInner().compile(node).render(),
            "var cont0 = function () {};if ($foo) {task.sendMessage($foo, [], function (P0) {$bar = P0;\ncont0();}, null);\n\n}\n\nelse {cont0();}\n\n");
        test.done();
    },

    "nested ifs create separate continuations": function (test) {
        // todo
        test.done();
    },

    "nested ifs collapse to else if": function (test) {
        // todo
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

        test.equal(new Context().createInner().compile(node).render(),
            'if ($foo) {task.respond("reply", [42]);\nreturn;}\n\n');
        test.done();
    }
};
