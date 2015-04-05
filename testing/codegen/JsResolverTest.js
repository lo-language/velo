/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsResolver = require('../../codegen/JsResolver');
var JsRequest = require('../../codegen/JsRequest');

module.exports["basics"] = {

    "one part passthrough": function (test) {

        var expr = new JsResolver('var x = args.shift();');

        test.equal(expr.isAsync(), false);
        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "several parts passthrough": function (test) {

        var expr = new JsResolver(['var x = ', '42', ';']);

        test.equal(expr.isAsync(), false);
        test.equal(expr.render(), 'var x = 42;');
        test.done();
    },

    "one promise": function (test) {

        var expr = new JsResolver([new JsRequest(['foo()']), ' + ', '3']);

        test.equal(expr.isAsync(), true);
        test.equal(expr.render(), 'foo().then(function (x1) {return x1 + 3;})');
        test.done();
    },

    "two promises": function (test) {

        var expr = new JsResolver([new JsRequest(['foo()']), ' + ', new JsRequest(['bar()'])]);

        test.equal(expr.isAsync(), true);
        test.equal(expr.render(), 'Q.spread([foo(), bar()], function (x1, x2) {return x1 + x2;})');
        test.done();
    },

//    "resolution construct": function (test) {
//
//        // in resolving requests in statements, we create lists that contain
//        // csv objects that contain arrays of constructs - this tests that behavior
//
//        var requests = [new JsConstruct(['foo()'])];
//        var placeholders = ['nork'];
//        var parts = [];
//
//        var construct = new JsConstruct(['Q.spread([', {csv: requests}, '], function (', {csv: placeholders}, ') {',
//            parts,
//            '}, result.reject);']);
//
//        test.deepEqual(construct.toString(), 'Q.spread([foo()], function (nork) {}, result.reject);');
//
//        test.done();
//    },
};
