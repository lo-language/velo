/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const JS = require('../../codegen/JsPrimitives');
const Lo = require('../../constructs');
const LoContext = require('../../compiler/LoContext');
const JsWriter = require('../../codegen/JsWriter');

module.exports["basics"] = {

    "sync loop": function (test) {

        var node = new Lo.while(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.assign(
                    new Lo.identifier('bar'),
                    new Lo.number('42')
                )
            )
        );

        var result = node.compile2(new LoContext()).getJs(new JsWriter());

        test.deepEqual(result.renderTree(),
            ['while',
                ['id', '$foo'],
                ['stmtList',
                    ['expr-stmt', ['assign', ['id', '$bar'], ['num', '42']]]]]);

        // // try attaching a statement – should get stuck on the end
        node = new Lo.stmtList(node,
            new Lo.stmtList(new Lo.assign(new Lo.identifier('z'), new Lo.number('57'))));

        result = new JsWriter().generateJs(node.compile2(new LoContext()));

        test.deepEqual(result.renderTree(),
            ['stmtList',
                ['while',
                    ['id', '$foo'],
                    ['stmtList',
                        ['expr-stmt', ['assign', ['id', '$bar'], ['num', '42']]]]],
                ['stmtList',
                    ['expr-stmt', ['assign', ['id', '$z'], ['num', '57']]]]]);

        // // try attaching another statement
        node.attach(new Lo.stmtList(new Lo.assign(new Lo.identifier('mork'), new Lo.string('ork'))));

        result = new JsWriter().generateJs(node.compile2(new LoContext()));

        test.deepEqual(result.renderTree(),
            ['stmtList',
                ['while',
                    ['id', '$foo'],
                    ['stmtList',
                        ['expr-stmt', ['assign', ['id', '$bar'], ['num', '42']]]]],
                ['stmtList',
                    ['expr-stmt', ['assign', ['id', '$z'], ['num', '57']]],
                    ['stmtList',
                        ['expr-stmt',
                            ['assign', ['id', '$mork'], ['string', 'ork']]]]]]);

        test.done();
    },

    "req in cond": function (test) {

        // while foo() {
        //  bar = 57;
        // }


        var body = new Lo.stmtList(new Lo.assign(new Lo.identifier('bar'), new Lo.number('57')));

        var loop = new Lo.while(new Lo.requestExpr(new Lo.identifier('foo'), [], true), body);
        var stack = [];

        // compiling a stmt returns a control flow graph
        var js = new JsWriter().generateJs(loop.compile2(new LoContext(), stack));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['expr-stmt',
                ['call', ['function', 'L1', [], ['stmtList', ['expr-stmt', ['call', ['select', ['id', 'task'], 'sendAndBlock'], [['id', '$foo'], ['arrayLiteral', []], ['function', null, ['res0'], ['stmtList', ['if', ["subscript", ["id", "res0"], ["num", "0"]], ["stmtList", ["expr-stmt", ["assign", ["id", "$bar"], ["num", "57"]]], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L1"]]]]]]
                ]]]]],
                    ['null']]]]]],
                    []]]]);
        test.done();
    },

    "blocking call in body": function (test) {

        // while foo {
        //   bar <- 57;
        // }

        // could optimize to:
        // fn L1 () {
        // if ($foo) {
        //  SM (bar, 57, L1, L1);
        // }}

        // but defeated by branch node seeing it has a follower...
        // todo optimize this case

        var node = new Lo.while(
            new Lo.identifier('foo'),
            new Lo.stmtList(
                new Lo.requestStmt(
                    new Lo.identifier('bar'),
                    [new Lo.number('57')],
                    null,
                    null,
                    true
                )
            )
        );

        var js = new JsWriter().generateJs(node.compile2(new LoContext()));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['expr-stmt',
                ['call',
                    ['function',
                        'L1',
                        [],
                        ['stmtList',
                            ['if',
                                ['id', '$foo'],
                                ['stmtList',
                                    ['expr-stmt',
                                        ['call',
                                            ['select', ['id', 'task'], 'sendAndBlock'],
                                            [['id', '$bar'],
                                                ['arrayLiteral', [['num', '57']]],
                                                ['id', 'k0'], ['id', 'k0']]]],
                                    ['stmtList',
                                        ['function', 'k0', [], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L1"]]]]]]]]]]]]],
                    []]]]);


        // todo optimize this case to produce this
        // test.deepEqual(a.renderTree(), [ 'expr-stmt',
        //     [ 'call',
        //         [ 'function',
        //             'L1',
        //             [],
        //             [ 'stmtList',
        //                 [ 'if',
        //                     [ 'id', '$foo' ],
        //                     [ 'stmtList',
        //                             [ 'expr-stmt',
        //                                 [ 'call',
        //                                     [ 'select', [ 'id', 'task' ], 'sendAndBlock' ],
        //                                     [ [ 'id', '$bar' ],
        //                                         [ 'arrayLiteral', [ [ 'num','57' ] ] ],
        //                                         [ 'id', 'L1' ],
        //                                         [ 'id', 'L1' ] ] ] ] ] ] ] ],
        //         [] ] ]);

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

    "nested async loops": function (test) {

        // while y < MAX {
        //   while x < MAX {
        //      log <- count;
        //      x++;
        //   }
        //   y++;
        // }

        var node = new Lo.while(
            new Lo.binaryOpExpr('<', new Lo.identifier('y'), new Lo.identifier('MAX')),
            new Lo.stmtList(
                new Lo.while(
                    new Lo.binaryOpExpr('<', new Lo.identifier('x'), new Lo.identifier('MAX')),
                    new Lo.stmtList(
                        new Lo.requestStmt(
                            new Lo.identifier('log'),
                            [new Lo.identifier('count')],
                            null,
                            null,
                            true
                        ),
                        new Lo.stmtList(new Lo.assign(
                            new Lo.identifier('x'),
                            new Lo.binaryOpExpr('+', new Lo.identifier('x'), new Lo.number('1'))))
                    )
                ),
                new Lo.stmtList(new Lo.assign(
                    new Lo.identifier('y'),
                    new Lo.binaryOpExpr('+', new Lo.identifier('y'), new Lo.number('1'))))
            )
        );

        var js = new JsWriter().generateJs(node.compile2(new LoContext()));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['expr-stmt',
                ['call',
                    ['function',
                        'L2',
                        [],
                        ['stmtList',
                            ['if',
                                ['lt', ['id', '$y'], ['id', '$MAX']],
                                ['stmtList',
                                    ['expr-stmt',
                                        ['call',
                                            ['function', 'L1', [], ['stmtList', ["if",
                                                ["lt", ["id", "$x"], ["id", "$MAX"]], ["stmtList", ["expr-stmt", ["call", ["select", ["id", "task"], "sendAndBlock"], [["id", "$log"], ["arrayLiteral", [["id", "$count"]]], ["id", "k0"], ["id", "k0"]]]], ["stmtList", ["function", "k0", [], ["stmtList", ["expr-stmt", ["assign", ["id", "$x"], ["call", ["select", ["id", "Util"], "add"], [["id", "$x"], ["num", "1"]]]]], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L1"]]]]]]]]]]], ["stmtList", ["expr-stmt", ["assign", ["id", "$y"], ["call", ["select", ["id", "Util"], "add"], [["id", "$y"], ["num", "1"]]]]], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L2"]]]]]]]]]]],
                                            []]]]]]],
                    []]]]);

        test.done();
    },

    "async body and cond": function (test) {

        // while foo() {
        //   bar <- 57;
        // }

        var node = new Lo.while(
            new Lo.requestExpr(new Lo.identifier('foo'), [], true),
            new Lo.stmtList(
                new Lo.requestStmt(
                    new Lo.identifier('bar'),
                    [new Lo.number('57')],
                    null,
                    null,
                    true
                )
            )
        );

        var js = new JsWriter().generateJs(node.compile2(new LoContext()));

        test.deepEqual(js.renderTree(), ['stmtList',
            ['expr-stmt',
                ['call',
                    ['function',
                        'L1',
                        [],
                        ['stmtList',
                            ['expr-stmt',
                                ['call',
                                    ['select', ['id', 'task'], 'sendAndBlock'],
                                    [['id', '$foo'],
                                        ['arrayLiteral', []],
                                        ['function',
                                            null,
                                            ['res0'],
                                            ['stmtList', ['if', ["subscript", ["id", "res0"], ["num", "0"]],
                                                ["stmtList", ["expr-stmt", ["call", ["select", ["id", "task"], "sendAndBlock"], [["id", "$bar"], ["arrayLiteral", [["num", "57"]]], ["id", "k0"], ["id", "k0"]]]], ["stmtList", ["function", "k0", [], ["stmtList", ["expr-stmt", ["call", ["id", "setImmediate"], [["call", ["select", ["id", "task"], "doAsync"], [["id", "L1"]]]]]]]]]]]]],
                                        ['null']]]]]],
                    []]]]);

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
    //     var a = new LoContext().createInner().compile2Stmt(node);
    //
    //     test.done();
    // }
};
