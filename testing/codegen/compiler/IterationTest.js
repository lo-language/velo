/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["basics"] = {

    "sync loop": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        var a = new Context().createInner().compileStmt(node);

        test.deepEqual(a.renderTree(),
            [ 'stmtList',
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ] ]);

        // try attaching a statement – should get stuck on the end
        a.attach(new JsStmt(JS.assign(JS.ID('$z'), JS.num('57'))));

        test.deepEqual(a.renderTree(),
            [ 'stmtList',
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ],
                [ 'stmtList', [ 'assign', [ 'id', '$z' ], [ 'num', '57' ] ] ] ]);

        // try attaching another statement
        a.attach(JsStmt.varDecl('bee'));

        test.deepEqual(a.renderTree(),
            [ 'stmtList',
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ],
                [ 'stmtList',
                    [ 'assign', [ 'id', '$z' ], [ 'num', '57' ] ],
                    [ 'stmtList', [ 'var', 'bee' ] ] ] ]);

        test.done();
    },

    "async in body": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list',
                head: {
                    type: 'application_stmt',
                    application: {
                        type: 'application',
                        address: {type: 'id', name: 'bar'},
                        args: [{type: 'number', val: '57'}]
                    }
                },
                tail: null}
        };

        var a = new Context().createInner().compileStmt(node);

        test.deepEqual(a.renderTree(), [ 'stmtList',
            [ 'let', 'loop',
                [ 'function',
                    null,
                    [], [ 'stmtList',
                    [ 'if',
                        [ 'id', '$foo' ],
                        [ 'stmtList', [ 'expr-stmt',
                            [ 'call',
                                [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                [ [ 'id', '$bar' ],
                                    [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
                                    [ 'function',
                                        null,
                                        [ 'P0' ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'call', [ 'id', "setImmediate" ], [ [ "call", [ "select", [ "id", "task" ], "doAsync" ], [ [ "id", "loop" ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        // // try attaching a statement
        a.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('z'), JS.num('57')))));

        test.deepEqual(a.renderTree(), [ 'stmtList',
            [ 'let',
                'loop',
                [ 'function',
                    null,
                    [],
                    [ 'stmtList',
                        [ 'if',
                            [ 'id', '$foo' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                        [ [ 'id', '$bar' ],
                                            [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
                                            [ 'function', null, [ 'P0' ], [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', "setImmediate" ], [ [ "call", [ "select", [ "id", "task" ], "doAsync" ], [ [ "id", "loop" ] ] ] ] ] ] ] ] ] ] ] ],
                            [ 'stmtList',
                                [ 'expr-stmt', [ 'assign', [ 'id', 'z' ], [ 'num', '57' ] ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        // test.equal(a.renderTree(),
        //     'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
        //     'function (res) {\nvar P0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {var z = 57;}};\n\nloop();\n');
        //
        // // try attaching another statement
        // a.attach(new JsConstruct("var bee = 27;"));
        //
        // test.equal(a.renderTree(),
        //     'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
        //     'function (res) {\nvar P0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');

        test.done();
    },

    "async body and cond": function (test) {

        var node = {
            type: 'iteration',
            condition: {
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: []
            },
            statements: {type: 'stmt_list',
                head: {
                    type: 'application_stmt',
                    application: {
                        type: 'application',
                        address: {type: 'id', name: 'bar'},
                        args: [{type: 'number', val: '57'}]
                    }
                },
                tail: null}
        };

        var a = new Context().createInner().compileStmt(node);

        test.deepEqual(a.renderTree(), [ 'stmtList',
            [ 'let',
                'loop',
                [ 'function',
                    null,
                    [],
                    [ 'stmtList', [ 'expr-stmt',
                        [ 'call',
                            [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                            [ [ 'id', '$foo' ],
                                [ 'arrayLiteral', [] ],
                                [ 'function',
                                    null,
                                    [ 'P0' ],
                                    [ 'stmtList',
                                        [ 'if',
                                            [ 'id', 'P0' ],
                                            [ 'stmtList', [ 'expr-stmt',
                                                [ 'call',
                                                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                                    [ [ 'id', '$bar' ],
                                                        [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
                                                        [ 'function',
                                                            null,
                                                            [ 'P0' ],
                                                            [ 'stmtList',
                                                                [ 'expr-stmt',
                                                                    [ 'call',
                                                                        [ 'id', 'setImmediate' ],
                                                                        [ [ 'call',
                                                                            [ 'select', [ 'id', 'task' ], 'doAsync' ],
                                                                            [ [ 'id', 'loop' ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ],
            [ 'stmtList',
                [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        // test.equal(a.render(),
        //     'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
        //     'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
        //     '{\nvar P0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {}};\n\nloop();\n');
        //
        // // try attaching a statement
        // a.attach(new JsConstruct("var z = 57;"));
        //
        // test.equal(a.render(),
        //     'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
        //     'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
        //     '{\nvar P0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {var z = 57;}};\n\nloop();\n');
        //
        // // try attaching another statement
        // a.attach(new JsConstruct("var bee = 27;"));
        //
        // test.equal(a.render(),
        //     'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
        //     'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
        //     '{\nvar P0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');

        test.done();
    },

    "indirectly async body": function (test) {

        var node = {
            type: 'iteration',
            condition: {
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: []
            },
            statements: {type: 'stmt_list',
                head: {
                    type: 'application_stmt',
                    application: {
                        type: 'application',
                        address: {type: 'id', name: 'bar'},
                        args: [{type: 'number', val: '57'}]
                    }
                },
                tail: null}
        };

        var a = new Context().createInner().compileStmt(node);

        test.done();
    }
};
