/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsRequest = require('../../codegen/JsRequest');
var JsStatement = require('../../codegen/JsStatement');
var util = require('util');

module.exports["requests"] = {

    "simple request": function (test) {

        var stmt = new JsStatement([new JsRequest(['foo()']), ';']);

        test.ok(stmt.isAsync());
        test.deepEqual(stmt.toString(), 'Q.spread([foo()], function (PH0) {PH0;}, result.reject);');
        test.done();
    },

    "nested request": function (test) {

        var stmt = new JsStatement([new JsRequest(['foo([', new JsRequest(['bar()']), '])']).getConstruct(), ';']);

        test.equal(stmt.toString(), 'Q.spread([bar()], function (PH0) {foo([PH0]);}, result.reject);');
        test.done();
    },

    "multiple requests": function (test) {

        var stmt = new JsStatement([
            new JsRequest(
                ['baz(', new JsRequest(['foo()']), ', ', new JsRequest(['bar()']), ')']), ';']);

        test.equal(stmt.toString(), 'Q.spread([foo(),bar()], function (PH0,PH1) {Q.spread([baz(PH0, PH1)], function (PH0) {PH0;}, result.reject);}, result.reject);');
        test.done();
    },

    "op with requests": function (test) {

        var stmt = new JsStatement([
                '(', new JsRequest(['foo()']), ' - ', new JsRequest(['bar()']), ');']);

        test.equal(stmt.toString(), 'Q.spread([foo(),bar()], function (PH0,PH1) {(PH0 - PH1);}, result.reject);');
        test.done();
    }
};