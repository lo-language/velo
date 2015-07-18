/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["identifiers"] = {

    "symbol": function (test) {

        var node = {type: 'symbol', name: 'cymbal'};

        test.equal(Compiler.compile(node), "'<cymbal>'");
        test.done();
    },

//    "undefined": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        var result = Compiler.compile(node);
//
//        test.throws(result.getExpr, Error, "undefined value");
//        test.done();
//    },

    "ready value": function (test) {

        var node = {type: 'id', name: 'foo'};

        var scope = new Scope();

        scope.define('foo', true);

        test.equal(Compiler.compile(node), '$foo');
        test.done();
    },

//    "defined promise": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        Compiler.context.definePromise('foo');
//
//        var result = Compiler.compile(node);
//
//        test.deepEqual(result.renderExpr(), '$val_foo');
//        test.done();
//    }
};
