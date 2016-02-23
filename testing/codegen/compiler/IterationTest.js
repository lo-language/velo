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

    "sync loop": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        var a = new Scope().compile(node);

        test.equal(a.render(), 'while ($foo){$bar = 42;\n}');

        // try attaching a statement
        a.attach(new JsConstruct("var z = 57;"));

        test.equal(a.render(), 'while ($foo){$bar = 42;\n}var z = 57;');

        // try attaching another statement
        a.attach(new JsConstruct("var bee = 27;"));

        test.equal(a.render(), 'while ($foo){$bar = 42;\n}var z = 57;var bee = 27;');

        test.done();
    },

    "async loop": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list',
                head: {
                    type: 'application_stmt',
                    application: {
                        type: 'application',
                        address: {type: 'id', name: 'foo'},
                        args: [{type: 'number', val: '57'}]
                    }
                },
                tail: null}
        };

        var a = new Scope().compile(node);

        test.equal(a.render(),
            'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
            'function (P0) {P0;\nsetImmediate(loop);}, null);\n\n}else {}};\n\nloop();\n');

        // try attaching a statement
        a.attach(new JsConstruct("var z = 57;"));

        test.equal(a.render(),
            'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
            'function (P0) {P0;\nsetImmediate(loop);}, null);\n\n}else {var z = 57;}};\n\nloop();\n');

        // try attaching another statement
        a.attach(new JsConstruct("var bee = 27;"));

        test.equal(a.render(),
            'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
            'function (P0) {P0;\nsetImmediate(loop);}, null);\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');

        test.done();
    },

    "loop with async cond": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list',
                head: {
                    type: 'conditional',
                    predicate: {type: 'id', name: 'bar'},
                    consequent: {
                        type: 'stmt_list',
                        head: {type: 'assign', op: '=',
                            left: {type: 'id', name: 'baz'},
                            right: {type: 'number', val: "4"},
                        tail: null
                        }
                    },
                    otherwise: {
                        type: 'stmt_list',
                        head: {
                            type: 'application_stmt',
                            application: {
                                type: 'application',
                                address: {type: 'id', name: 'foo'},
                                args: [{type: 'number', val: '57'}]
                            }
                        },
                        tail: null
                    }
                },
                tail: null}
        };

        var a = new Scope().compile(node);

        test.equal(a.render(),
            'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(loop);};' +
            'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (P0) ' +
            '{P0;\ncont0();}, null);\n\n}\n\n}else {}};\n\nloop();\n');

        // try attaching a statement
        a.attach(new JsConstruct("var z = 57;"));

        test.equal(a.render(),
            'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(loop);};' +
            'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (P0) ' +
            '{P0;\ncont0();}, null);\n\n}\n\n}else {var z = 57;}};\n\nloop();\n');

        // try attaching another statement
        a.attach(new JsConstruct("var bee = 27;"));

        test.equal(a.render(),
            'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(loop);};' +
            'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (P0) ' +
            '{P0;\ncont0();}, null);\n\n}\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');
        test.done();
    }
};
