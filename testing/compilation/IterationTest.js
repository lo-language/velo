/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');

module.exports["basics"] = {

    "sync loop": function (test) {

        var node = new Lo.while(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assignment(
                    '=',
                    new Lo.identifier('bar'),
                    new Lo.literal('number', '42')
                )
            )
        );

        var result = node.compile(new Context());

        test.deepEqual(result.renderTree(),
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ]);

        // // try attaching a statement – should get stuck on the end
        node = new Lo.stmtList(node,
            new Lo.stmtList(new Lo.assignment('=', new Lo.identifier('z'), new Lo.literal('number', '57'))));

        result = node.compile(new Context());

        test.deepEqual(result.renderTree(),
            [ 'stmtList',
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ],
                [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', '$z' ], [ 'num', '57' ] ] ] ] ]);

        // // try attaching another statement
        node.attach(new Lo.stmtList(new Lo.assignment('=', new Lo.identifier('mork'), new Lo.literal('string', 'ork'))));

        result = node.compile(new Context());

        test.deepEqual(result.renderTree(),
            [ 'stmtList',
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'expr-stmt', [ 'assign', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ],
                [ 'stmtList',
                    [ 'expr-stmt', [ 'assign', [ 'id', '$z' ], [ 'num', '57' ] ] ],
                    [ 'stmtList',
                        [ 'expr-stmt',
                            [ 'assign', [ 'id', '$mork' ], [ 'string', 'ork' ] ] ] ] ] ]);

        test.done();
    },

    "async in body": function (test) {

        var node = new Lo.while(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.requestStmt(
                    new Lo.identifier('bar'),
                    [new Lo.literal('number', '57')]
                )
            )
        );

        var a = node.compile(new Context().createInner());

        test.deepEqual(a.renderTree(),
            [ 'stmtList',
                [ 'let',
                    'l0',
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
                                                [ 'id', 'c0' ],
                                                [ 'id', 'c0' ] ] ] ],
                                    [ 'stmtList',
                                        [ 'function',
                                            'c0',
                                            [],
                                            [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', "setImmediate" ],
                                                [ [ "call", [ "select", [ "id", "task" ], "doAsync" ], [ [ "id", "l0" ] ] ] ] ] ] ] ] ] ] ] ] ] ],
                [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', 'l0' ], [] ] ] ] ]);

        // // try attaching a statement
        // a.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('z'), JS.num('57')))));
        //
        // test.deepEqual(a.renderTree(), [ 'stmtList',
        //     [ 'let',
        //         'loop',
        //         [ 'function',
        //             null,
        //             [],
        //             [ 'stmtList',
        //                 [ 'if',
        //                     [ 'id', '$foo' ],
        //                     [ 'stmtList',
        //                         [ 'expr-stmt',
        //                             [ 'call',
        //                                 [ 'select', [ 'id', 'task' ], 'sendMessage' ],
        //                                 [ [ 'id', '$bar' ],
        //                                     [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
        //                                     [ 'function', null, [ 'res0' ], [ 'stmtList', [ 'expr-stmt', [ 'call', [ 'id', "setImmediate" ], [ [ "call", [ "select", [ "id", "task" ], "doAsync" ], [ [ "id", "loop" ] ] ] ] ] ] ] ] ] ] ] ],
        //                     [ 'stmtList',
        //                         [ 'expr-stmt', [ 'assign', [ 'id', 'z' ], [ 'num', '57' ] ] ] ] ] ] ] ],
        //     [ 'stmtList',
        //         [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        // test.equal(a.renderTree(),
        //     'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
        //     'function (res) {\nvar res0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {var z = 57;}};\n\nloop();\n');
        //
        // // try attaching another statement
        // a.attach(new JsConstruct("var bee = 27;"));
        //
        // test.equal(a.renderTree(),
        //     'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
        //     'function (res) {\nvar res0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');

        test.done();
    },

    "async body and cond": function (test) {

        // var node = {
        //     type: 'iteration',
        //     condition: {
        //         type: 'application',
        //         address: {type: 'id', name: 'foo'},
        //         args: []
        //     },
        //     statements: {type: 'stmt_list',
        //         head: {
        //             type: 'application_stmt',
        //             application: {
        //                 type: 'application',
        //                 address: {type: 'id', name: 'bar'},
        //                 args: [{type: 'number', val: '57'}]
        //             }
        //         },
        //         tail: null}
        // };
        //
        // var a = new Context().createInner().compileStmt(node);
        //
        // test.deepEqual(a.renderTree(), [ 'stmtList',
        //     [ 'let',
        //         'loop',
        //         [ 'function',
        //             null,
        //             [],
        //             [ 'stmtList', [ 'expr-stmt',
        //                 [ 'call',
        //                     [ 'select', [ 'id', 'task' ], 'sendMessage' ],
        //                     [ [ 'id', '$foo' ],
        //                         [ 'arrayLiteral', [] ],
        //                         [ 'function',
        //                             null,
        //                             [ 'res0' ],
        //                             [ 'stmtList',
        //                                 [ 'if',
        //                                     [ "subscript", [ 'id', 'res0' ], [ "num", "0" ] ],
        //                                     [ 'stmtList', [ 'expr-stmt',
        //                                         [ 'call',
        //                                             [ 'select', [ 'id', 'task' ], 'sendMessage' ],
        //                                             [ [ 'id', '$bar' ],
        //                                                 [ 'arrayLiteral', [ [ 'num', '57' ] ] ],
        //                                                 [ 'function',
        //                                                     null,
        //                                                     [ 'res0' ],
        //                                                     [ 'stmtList',
        //                                                         [ 'expr-stmt',
        //                                                             [ 'call',
        //                                                                 [ 'id', 'setImmediate' ],
        //                                                                 [ [ 'call',
        //                                                                     [ 'select', [ 'id', 'task' ], 'doAsync' ],
        //                                                                     [ [ 'id', 'loop' ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ] ],
        //     [ 'stmtList',
        //         [ 'expr-stmt', [ 'call', [ 'id', 'loop' ], [] ] ] ] ]);

        // test.equal(a.render(),
        //     'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
        //     'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
        //     '{\nvar res0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {}};\n\nloop();\n');
        //
        // // try attaching a statement
        // a.attach(new JsConstruct("var z = 57;"));
        //
        // test.equal(a.render(),
        //     'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
        //     'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
        //     '{\nvar res0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {var z = 57;}};\n\nloop();\n');
        //
        // // try attaching another statement
        // a.attach(new JsConstruct("var bee = 27;"));
        //
        // test.equal(a.render(),
        //     'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
        //     'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
        //     '{\nvar res0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');

        test.done();
    },

    // "indirectly async body": function (test) {
    //
    //     var node = {
    //         type: 'iteration',
    //         condition: {
    //             type: 'application',
    //             address: {type: 'id', name: 'foo'},
    //             args: []
    //         },
    //         statements: {type: 'stmt_list',
    //             head: {
    //                 type: 'application_stmt',
    //                 application: {
    //                     type: 'application',
    //                     address: {type: 'id', name: 'bar'},
    //                     args: [{type: 'number', val: '57'}]
    //                 }
    //             },
    //             tail: null}
    //     };
    //
    //     var a = new Context().createInner().compileStmt(node);
    //
    //     test.done();
    // }
};
