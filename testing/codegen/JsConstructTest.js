/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsConstruct = require('../../codegen/JsConstruct');
var JsRequest = require('../../codegen/JsRequest');

module.exports["basics"] = {

    "one piece": function (test) {

        var expr = new JsConstruct(['var x = args.shift();']);

        test.equal(expr.toString(), 'var x = args.shift();');
        test.done();
    },

    "several pieces": function (test) {

        var expr = new JsConstruct(['var x = ', '42', ';']);

        test.equal(expr.toString(), 'var x = 42;');
        test.done();
    },

    "nested arrays": function (test) {

        var expr = new JsConstruct(['(', ['42'], ')']);

        test.equal(expr.toString(), '(42)');
        test.done();
    },

    "csvs": function (test) {

        test.deepEqual(new JsConstruct([{csv: ['nork']}]).render(), ['nork']);
        test.deepEqual(new JsConstruct([{csv: ['pork', 'stork']}]).render(), ['pork', ',', 'stork']);
        test.deepEqual(new JsConstruct(['pork', 'stork', {csv: ['hork', 'nork']}]).render(), ['pork', 'stork', 'hork', ',', 'nork']);
        test.deepEqual(new JsConstruct([{csv: ['pork', 'stork', {csv: ['hork', 'nork']}]}]).render(), ['pork', ',', 'stork', ',', 'hork', ',', 'nork']);

        test.deepEqual(new JsConstruct([{csv: [
            'pork', 'stork', ['el', 'chupacabra', {csv: [
                'hork', 'nork']}]]}]).render(), ['pork', ',', 'stork', ',', 'el', 'chupacabra', 'hork', ',', 'nork']);

        test.done();
    },

    "resolution construct": function (test) {

        // in resolving requests in statements, we create lists that contain
        // csv objects that contain arrays of constructs - this tests that behavior

        var requests = [new JsConstruct(['foo()'])];
        var placeholders = ['nork'];
        var parts = [];

        var construct = new JsConstruct(['Q.spread([', {csv: requests}, '], function (', {csv: placeholders}, ') {',
            parts,
            '}, result.reject);']);

        test.deepEqual(construct.toString(), 'Q.spread([foo()], function (nork) {}, result.reject);');

        test.done();
    },

    "nested constructs": function (test) {

        var expr = new JsConstruct(['(', new JsConstruct(['42']), ')']);

        test.deepEqual(expr.render(), [ '(', '42', ')' ]);
        test.equal(expr.toString(), '(42)');
        test.done();
    },

    "newline": function (test) {

        var expr = new JsConstruct(['var x = 15;', {br: 1}, 'var y = 43;']);

        test.equal(expr.toString(), 'var x = 15;\nvar y = 43;');
        test.done();
    }
};
