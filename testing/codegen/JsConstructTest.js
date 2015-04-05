/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsConstruct = require('../../codegen/JsConstruct');

module.exports["basics"] = {

    "one part": function (test) {

        var expr = new JsConstruct('var x = args.shift();');

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

    "csvs": function (test) {

        test.deepEqual(new JsConstruct([{csv: ['leeloo']}]).render(), 'leeloo');
        test.deepEqual(new JsConstruct([{csv: ['leeloo', 'dallas']}]).render(), 'leeloo,dallas');
        test.deepEqual(new JsConstruct(['leeloo', 'dallas', {csv: ['multi', 'pass']}]).render(), 'leeloodallasmulti,pass');
        test.deepEqual(new JsConstruct([{csv: ['leeloo', 'dallas', {csv: ['multi', 'pass']}]}]).render(), 'leeloo,dallas,multi,pass');

        test.deepEqual(new JsConstruct([{csv: [
            'corbin', 'dallas', ['leeloo', 'dallas', {csv: [
                'multi', 'pass']}]]}]).render(), 'corbin,dallas,leeloodallasmulti,pass');

        test.done();
    },


    "nested constructs": function (test) {

        var expr = new JsConstruct(['(', new JsConstruct(['42']), ')']);

        test.equal(expr.isAsync(), false);
        test.equal(expr.render(), '(42)');
        test.done();
    }

//    "newline": function (test) {
//
//        var expr = new JsConstruct(['var x = 15;', {br: 1}, 'var y = 43;']);
//
//        test.equal(expr.toString(), 'var x = 15;\nvar y = 43;');
//        test.done();
//    }
};
