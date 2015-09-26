/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["identifiers"] = {

//    "undefined": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        var result = Compiler.compile(node);
//
//        test.throws(result.getExpr, Error, "undefined value");
//        test.done();
//    },

    "normal var": function (test) {

        var node = {type: 'id', name: 'foo'};

        var scope = new Scope();

        test.equal(Compiler.compile(node, scope), '$foo');
        test.done();
    },

    "constant": function (test) {

        var node = {type: 'id', name: 'foo'};

        var scope = new Scope();

        scope.define('foo', "42");

        test.equal(Compiler.compile(node, scope), '42');
        test.done();
    }
};