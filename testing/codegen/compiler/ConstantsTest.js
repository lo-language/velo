/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Compiler = require('../../../codegen/Compiler');
const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const JsStmt = require('../../../codegen/JsStmt');
const util = require('util');

module.exports["constants"] = {

    "numeric": function (test) {

        var node = {
            "type":"constant",
            "name":"port",
            "value": {type: "number", val: "443"}
        };

        var context = new Context();

        test.equal(context.has('port'), false);
        test.equal(context.isConstant('port'), false);

        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.EMPTY).getTree());

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));
        test.deepEqual(context.resolve('port').getTree(), JS.num('443').getTree());

        test.done();
    },

    "string": function (test) {

        var node = {
            "type":"constant",
            "name":"album",
            "value": {type: "string", val: "Melon Collie"}
        };

        var context = new Context();

        test.equal(context.has('album'), false);
        test.equal(context.isConstant('album'), false);

        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.EMPTY).getTree());

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        test.deepEqual(context.resolve('album').getTree(), JS.string('Melon Collie').getTree());

        test.done();
    },

    "service": function (test) {

        var node = {
            "type":"constant",
            "name":"main",
            "value": {
                type: 'procedure',
                params: ['next'],
                body: {
                    type: 'stmt_list',
                    head:
                    { type: 'assign',
                        op: '*=',
                        left: { type: 'id', name: 'result' },
                        right: {
                            type: 'application',
                            address: {type: 'id', name: 'bar'},
                            args: [
                                {type: 'number', val: '42'}
                            ]} },
                    tail: null
                }}
        };

        var context = new Context();
        context.id = 47;

        test.equal(context.has('main'), false);
        test.equal(context.isConstant('main'), false);

        test.deepEqual(context.compile(node).getTree(), [ 'stmtList', [ 'const', '$main' ] ]);

        test.equal(context.has('main'), true);
        test.ok(context.isConstant('main'));
        test.deepEqual(context.resolve('main').getTree(), JS.ID("$main").getTree());

        test.done();
    },

    "prevents JS collisions": function (test) {

        var node = {
            "type":"constant",
            "name":"constructor",
            "value": {type: "string", val: "Melon Collie"}
        };

        var context = new Context();

        test.equal(context.has('constructor'), false);
        test.equal(context.isConstant('constructor'), false);

        test.deepEqual(context.compile(node).getTree(), new JsStmt(JS.EMPTY).getTree());

        test.equal(context.has('constructor'), true);
        test.ok(context.isConstant('constructor'));
        test.deepEqual(context.resolve('constructor').getTree(), JS.string('Melon Collie').getTree());

        test.done();
    }
};
