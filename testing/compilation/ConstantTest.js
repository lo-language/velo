/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Lo = require('../../constructs');
const LoContext = require('../../compiler/LoContext');
const JS = require('../../codegen/JsPrimitives');
const util = require('util');
const JsWriter = require('../../codegen/JsWriter');

const rootContext = new LoContext();

module.exports["root constants"] = {

    "module constant": function (test) {

        var module = new Lo.module([
                new Lo.constant('main', new Lo.procedure([], new Lo.stmtList(
                    new Lo.response('reply', [new Lo.select(new Lo.identifier('Math'), 'PI')]),
                null), true))
            ],[
                new Lo.constant('Math', new Lo.moduleRef('JS', 'Math'))
            ]
        );

        // need to provide a mock registry
        var mockRegistry = {
            include: function () {
            },
            getModules: function () {
            }
        };

        test.equal(module.compile(mockRegistry).renderJs(), '' +
            'const $main = function (args, succ, fail) {\n\n' +
            'var task = new Task(succ, fail);\n' +
            'task.succ([JS.Math.PI]);\n' +
            'return;\n' +
            '};\n' +
            'return {\'main\': $main};\n');

        test.done();
    },

    "numeric": function (test) {

        var node = new Lo.constant('port', new Lo.number('443'));

        var context = new LoContext();

        test.equal(context.has('port'), false);
        test.equal(context.isConstant('port'), false);

        test.equal(new JsWriter().generateJs(node.compile(context)).renderJs(), 'const $port = 443;\n');

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));

        test.done();
    },

    "string": function (test) {

        var node = new Lo.constant('album', new Lo.string("Mellon Collie"));

        var context = new LoContext();

        test.equal(context.has('album'), false);
        test.equal(context.isConstant('album'), false);

        test.equal(new JsWriter().generateJs(node.compile(context)).renderJs(), "const $album = 'Mellon Collie';\n");

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        // test.deepEqual(context.resolve('album').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    }

};

module.exports["non-root constants"] = {

    "numeric": function (test) {

        var node = new Lo.constant('port', new Lo.number('443'));

        var context = new LoContext(rootContext);

        test.equal(context.has('port'), false);
        test.equal(context.isConstant('port'), false);

        test.equal(new JsWriter().generateJs(node.compile(context)).renderJs(), 'const $port = 443;\n');

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));

        test.done();
    },

    "string": function (test) {

        var node = new Lo.constant('album', new Lo.string("Mellon Collie"));

        var context = new LoContext(rootContext);

        test.equal(context.has('album'), false);
        test.equal(context.isConstant('album'), false);

        test.equal(new JsWriter().generateJs(node.compile(context)).renderJs(), "const $album = 'Mellon Collie';\n");

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        // test.deepEqual(context.resolve('album').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    },

    "service": function (test) {

        var node = new Lo.constant('main',
            new Lo.procedure(
                ['next'],
                new Lo.stmtList(
                    new Lo.assign(
                        new Lo.identifier('result'),
                        new Lo.number('10')
                    )
                ),
                true
            ));

        var context = new LoContext(rootContext);
        context.id = 47;

        test.equal(context.has('main'), false);
        test.equal(context.isConstant('main'), false);

        test.deepEqual(new JsWriter().generateJs(node.compile(context)).renderTree(), [ 'stmtList',
            [ 'const',
                '$main',
                [ 'function',
                    null,
                    [ 'args', 'succ', 'fail' ],
                    [ 'stmtList',
                        [ 'var',
                            'task',
                            [ 'new', 'Task', [ [ 'id', 'succ' ], [ 'id', 'fail' ] ] ] ],
                        [ 'stmtList',
                            [ 'var', [ '$next', '$result' ] ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'assign',
                                        [ 'id', '$next' ],
                                        [ 'subscript', [ 'id', 'args' ], [ 'num', '0' ] ] ] ],
                                [ 'stmtList',
                                    [ 'expr-stmt',
                                        [ 'assign', [ 'id', '$result' ], [ 'num', '10' ] ] ],
                                    [ 'stmtList',
                                        [ 'expr-stmt',
                                            [ 'call', [ 'select', [ 'id', 'task' ], 'autoReply' ], [ ] ] ],
                                         ] ] ] ] ] ] ] ]);

        test.equal(context.has('main'), true);
        test.ok(context.isConstant('main'));

        test.done();
    },

    "avoids JS collisions": function (test) {

        var node = new Lo.constant('constructor', new Lo.string("Melon Collie"));

        var context = new LoContext(rootContext);

        test.equal(context.has('constructor'), false);
        test.equal(context.isConstant('constructor'), false);

        test.equal(new JsWriter().generateJs(node.compile(context)).renderJs(), "const $constructor = 'Melon Collie';\n");

        test.equal(context.has('constructor'), true);
        test.ok(context.isConstant('constructor'));
        // test.deepEqual(context.resolve('constructor').renderTree(), JS.string('Melon Collie').renderTree());

        test.done();
    }
};
