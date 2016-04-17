/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["identifiers"] = {

//    "undefined usage": function (test) {
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

        test.equal(new Context().compile(node), '$foo');
        test.done();
    },

    "constant": function (test) {

        var node = {type: 'id', name: 'foo'};

        var scope = new Context();

        scope.define('foo', "42");

        test.equal(scope.compile(node), '42');
        test.done();
    },

    "external constant": function (test) {

        // the compiler should fetch the value and use it

        var node = {type: 'id', scope: 'HTTP', name: 'foo'};

        var refContext = new Context();
        refContext.define('foo', "53");

        var scope = new Context();

        scope.addReference('HTTP', refContext);

        test.equal(scope.compile(node), '53');
        test.done();
    },

    "external service": function (test) {

        test.done();
    }
};
