/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsConstruct = require('../../codegen/JsConstruct');

module.exports["basics"] = {

    "one piece": function (test) {

        var expr = new JsConstruct().write('var x = args.shift();');

        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "several pieces": function (test) {

        var expr = new JsConstruct().write('var x = ', '42', ';');

        test.equal(expr.render(), 'var x = 42;');
        test.done();
    },

    "nested pieces": function (test) {

        var expr = new JsConstruct().write(
            '(', new JsConstruct().write('42'), ')');

        test.equal(expr.render(), '(42)');
        test.done();
    },

    "simple request": function (test) {

        var expr = new JsConstruct().write(
            new JsConstruct(true).write('foo()'), ';');

        test.equal(expr.render(), 'Q.spread([foo()], function (PH0) {\nPH0;\n}, result.reject);');
        test.done();
    },

    "as statement": function (test) {

        var expr = new JsConstruct(true).write(
            'bar(', new JsConstruct(true).write('foo()'), ');');

        test.equal(expr.render(), 'Q.spread([foo()], function (PH0) {\nbar(PH0);\n}, result.reject);');
        test.done();
    },

    "nested deferred": function (test) {

        var expr = new JsConstruct(true).write(
            'foo([',new JsConstruct(true).write('bar()'), ']);');

        test.equal(expr.render(), 'Q.spread([bar()], function (PH0) {\nfoo([PH0]);\n}, result.reject);');
        test.done();
    },

    "complex deferred": function (test) {

        var expr = new JsConstruct().write(
            new JsConstruct(true).write(
                'foo([', new JsConstruct(true).write('bar()'), '])'), ';');

        test.equal(expr.render(), 'Q.spread([bar()], function (PH0) {\nQ.spread([foo([PH0])], function (PH0) {\nPH0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "multiple deferred": function (test) {

        var expr = new JsConstruct().write(
            new JsConstruct(true).write(
                'baz(', new JsConstruct(true).write('foo()'), ', ', new JsConstruct(true).write('bar()'), ')'), ';');

        test.equal(expr.render(), 'Q.spread([foo(),bar()], function (PH0,PH1) {\nQ.spread([baz(PH0, PH1)], function (PH0) {\nPH0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "op with deferred": function (test) {

        var expr = new JsConstruct().write(
                '(', new JsConstruct(true).write('foo()'), ' - ', new JsConstruct(true).write('bar()'), ');');

        test.equal(expr.render(), 'Q.spread([foo(),bar()], function (PH0,PH1) {\n(PH0 - PH1);\n}, result.reject);');
        test.done();
    }
};