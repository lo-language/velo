/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["basics"] = {

    "sync loop": function (test) {

        var node = {
            type: 'iteration',
            condition: {type: 'id', name: 'foo'},
            statements: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        var a = new Context().createInner().compile(node);

        test.deepEqual(a.getAst(),
            [ 'stmtList',
                [ 'while',
                    [ 'id', '$foo' ],
                    [ 'stmtList',
                        [ 'assignment', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ] ]);

        // try attaching a statement – should get stuck on the end
        a.attach(JS.stmt(JS.assign(JS.ID('$z'), JS.num('57'))));

        test.deepEqual(a.getAst(), [ 'stmtList',
            [ 'while',
                [ 'id', '$foo' ],
                [ 'stmtList',
                    [ 'assignment', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ],
            [ 'stmtList',
                [ 'assignment', [ 'id', '$z' ], [ 'num', '57' ] ] ] ]);

        // try attaching another statement
        a.attach(JS.varDeclaration('bee'));

        test.deepEqual(a.getAst(), [ 'stmtList',
            [ 'while',
                [ 'id', '$foo' ],
                [ 'stmtList',
                    [ 'assignment', [ 'id', '$bar' ], [ 'num', '42' ] ] ] ],
            [ 'stmtList',
                [ 'assignment', [ 'id', '$z' ], [ 'num', '57' ] ],
                [ 'stmtList', [ 'varDeclaration', 'bee' ] ] ] ]);

        test.done();
    },

    // "async loop": function (test) {
    //
    //     var node = {
    //         type: 'iteration',
    //         condition: {type: 'id', name: 'foo'},
    //         statements: {type: 'stmt_list',
    //             head: {
    //                 type: 'application_stmt',
    //                 application: {
    //                     type: 'application',
    //                     address: {type: 'id', name: 'foo'},
    //                     args: [{type: 'number', val: '57'}]
    //                 }
    //             },
    //             tail: null}
    //     };
    //
    //     var a = new Context().createInner().compile(node);
    //
    //     test.equal(a.getAst(),
    //         'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
    //         'function (res) {\nvar P0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {}};\n\nloop();\n');
    //
    //     // try attaching a statement
    //     a.attach(new JsConstruct("var z = 57;"));
    //
    //     test.equal(a.getAst(),
    //         'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
    //         'function (res) {\nvar P0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {var z = 57;}};\n\nloop();\n');
    //
    //     // try attaching another statement
    //     a.attach(new JsConstruct("var bee = 27;"));
    //
    //     test.equal(a.getAst(),
    //         'let loop = function () {if ($foo) {task.sendMessage($foo, [57], ' +
    //         'function (res) {\nvar P0 = res ? res[0] : null;\nsetImmediate(task.doAsync(loop));}, null);\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');
    //
    //     test.done();
    // },
    //
    // "loop with async cond": function (test) {
    //
    //     var node = {
    //         type: 'iteration',
    //         condition: {type: 'id', name: 'foo'},
    //         statements: {type: 'stmt_list',
    //             head: {
    //                 type: 'conditional',
    //                 predicate: {type: 'id', name: 'bar'},
    //                 consequent: {
    //                     type: 'stmt_list',
    //                     head: {type: 'assign', op: '=',
    //                         left: {type: 'id', name: 'baz'},
    //                         right: {type: 'number', val: "4"},
    //                     tail: null
    //                     }
    //                 },
    //                 alternate: {
    //                     type: 'stmt_list',
    //                     head: {
    //                         type: 'application_stmt',
    //                         application: {
    //                             type: 'application',
    //                             address: {type: 'id', name: 'foo'},
    //                             args: [{type: 'number', val: '57'}]
    //                         }
    //                     },
    //                     tail: null
    //                 }
    //             },
    //             tail: null}
    //     };
    //
    //     var a = new Context().createInner().compile(node);
    //
    //     test.equal(a.render(),
    //         'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
    //         'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
    //         '{\nvar P0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {}};\n\nloop();\n');
    //
    //     // try attaching a statement
    //     a.attach(new JsConstruct("var z = 57;"));
    //
    //     test.equal(a.render(),
    //         'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
    //         'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
    //         '{\nvar P0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {var z = 57;}};\n\nloop();\n');
    //
    //     // try attaching another statement
    //     a.attach(new JsConstruct("var bee = 27;"));
    //
    //     test.equal(a.render(),
    //         'let loop = function () {if ($foo) {var cont0 = function () {setImmediate(task.doAsync(loop));};' +
    //         'if ($bar) {$baz = 4;\ncont0();}\n\nelse {task.sendMessage($foo, [57], function (res) ' +
    //         '{\nvar P0 = res ? res[0] : null;\ncont0();}, null);\n\n}\n\n}else {var z = 57;var bee = 27;}};\n\nloop();\n');
    //     test.done();
    // }
};
