/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

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

        test.equal(context.compile(node).render(), '');

        test.equal(context.has('port'), true);
        test.ok(context.isConstant('port'));
        test.equal(context.resolve('port'), "443");

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

        test.equal(context.compile(node).render(), '');

        test.equal(context.has('album'), true);
        test.ok(context.isConstant('album'));
        test.equal(context.resolve('album'), "'Melon Collie'");

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

        test.equal(context.compile(node).render(),
            'const $main = function (task) {var $recur = task.service;\n' +
            'var $next, $result;\n\n$next = task.args[0];\n\n' +
            'task.sendMessage($bar, [42], function (res) {\nvar P0 = res ? res[0] : null;\n$result *= P0;\n}, null);\n\n};');

        test.equal(context.has('main'), true);
        test.ok(context.isConstant('main'));
        test.equal(context.resolve('main'), "$main");

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

        test.equal(context.compile(node).render(), '');

        test.equal(context.has('constructor'), true);
        test.ok(context.isConstant('constructor'));
        test.equal(context.resolve('constructor'), "'Melon Collie'");

        test.done();
    }
};
