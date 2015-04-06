/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsStatement = require('../../codegen/JsStatement');
var JsResolver = require('../../codegen/JsResolver');
var JsRequest = require('../../codegen/JsRequest');
var util = require('util');

module.exports["requests"] = {

    "no requests": function (test) {

        var stmt = new JsStatement('var x = args.shift();');

        test.equal(stmt.isAsync(), false);
        test.deepEqual(stmt.render(), 'var x = args.shift();');
        test.done();
    },

    "simple request": function (test) {

        var stmt = new JsStatement([new JsRequest(['foo()']), ';']);

        test.ok(stmt.isAsync());
        test.deepEqual(stmt.render(), 'foo();');
        test.done();
    },

    "resolved request": function (test) {

        var stmt = new JsStatement([new JsResolver([new JsRequest(['foo()'])]), ';']);

        test.ok(stmt.isAsync());
        test.deepEqual(stmt.render(), 'foo().then(function (x1) {return x1;});');
        test.done();
    },

    "nested request": function (test) {

        var stmt = new JsStatement([new JsRequest(['foo([', new JsRequest(['bar()']), '])']), ';']);

        test.ok(stmt.isAsync());
        test.equal(stmt.render(), 'bar().then(function (x1) {return foo([x1]);});');
        test.done();
    },

    "multiple requests": function (test) {

        var stmt = new JsStatement([
            new JsRequest(
                ['baz(', new JsRequest(['foo()']), ', ', new JsRequest(['bar()']), ')']), ';'], false);

        test.ok(stmt.isAsync());
        test.equal(stmt.render(), 'Q.spread([foo(), bar()], function (x1, x2) {return baz(x1, x2);});');
        test.done();
    }
};