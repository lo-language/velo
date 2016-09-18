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

module.exports["basics"] = {

    "increment ID": function (test) {

        var node = {
            "type":"increment",
            "operand":{type: "id", name: "bar"}
        };

        test.deepEqual(new Context().compile(node).renderTree(), [ 'stmtList', [ 'expr-stmt', [ 'inc', [ 'id', '$bar' ] ] ] ]);
        test.done();
    },

    "decrement ID": function (test) {

        var node = {
            "type":"decrement",
            "operand":{type: "id", name: "bar"}
        };

        test.deepEqual(new Context().compile(node).renderTree(), [ 'stmtList', [ 'expr-stmt', [ 'dec', [ 'id', '$bar' ] ] ] ]);
        test.done();
    },

    "increment subscript": function (test) {

        var node = {
            "type":"increment",
            "operand": {
                type: 'subscript',
                list: {type: 'id', name: 'bar'},
                index: {type: 'number', val: '1'}
            }
        };

        test.deepEqual(new Context().compile(node).renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'inc', [ 'subscript', [ 'id', '$bar' ], [ 'num', '1' ] ] ] ] ]);
        test.done();
    },
};
