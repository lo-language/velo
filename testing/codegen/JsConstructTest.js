/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsConstruct = require('../../codegen/JsConstruct');

module.exports["basics"] = {

    "one part": function (test) {

        var expr = new JsConstruct(['var x = args.shift();']);

        test.equal(expr.isAsync(), false);
        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "several parts": function (test) {

        var expr = new JsConstruct(['var x = ', '42', ';']);

        test.equal(expr.isAsync(), false);
        test.equal(expr.render(), 'var x = 42;');
        test.done();
    },

    "one promise": function (test) {

        var expr = new JsConstruct([new JsConstruct(['foo()'], true, true), ' + ', '3']);

        test.equal(expr.isAsync(), true);
        test.equal(expr.render(), 'foo().then(function (x1) {return x1 + 3;})');
        test.done();
    },

    "two promises": function (test) {

        var expr = new JsConstruct([new JsConstruct(['foo()'], true, true), ' + ', new JsConstruct(['bar()'], true, true)]);

        test.equal(expr.isAsync(), true);
        test.equal(expr.render(), 'Q.spread([foo(), bar()], function (x1, x2) {return x1 + x2;})');
        test.done();
    },

//    "nested arrays": function (test) {
//
//        var expr = new JsConstruct(['(', ['42'], ')']);
//
//        test.equal(expr.toString(), '(42)');
//        test.done();
//    },

    "csvs": function (test) {

        test.deepEqual(new JsConstruct([{csv: ['nork']}]).render(), 'nork');
        test.deepEqual(new JsConstruct([{csv: ['bork', 'stork']}]).render(), 'bork,stork');
        test.deepEqual(new JsConstruct(['bork', 'stork', {csv: ['ork', 'nork']}]).render(), 'borkstorkork,nork');
        test.deepEqual(new JsConstruct([{csv: ['bork', 'stork', {csv: ['ork', 'nork']}]}]).render(), 'bork,stork,ork,nork');

        test.deepEqual(new JsConstruct([{csv: [
            'bork', 'stork', ['el', 'chupacabra', {csv: [
                'ork', 'nork']}]]}]).render(), 'bork,stork,elchupacabraork,nork');

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

    "nested constructs": function (test) {

        var expr = new JsConstruct(['(', new JsConstruct(['42']), ')']);

        test.equal(expr.isAsync(), false);
        test.equal(expr.render(), '(42)');
        test.done();
    },

//    "newline": function (test) {
//
//        var expr = new JsConstruct(['var x = 15;', {br: 1}, 'var y = 43;']);
//
//        test.equal(expr.toString(), 'var x = 15;\nvar y = 43;');
//        test.done();
//    }
};
