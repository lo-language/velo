/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsWrapper = require('../../codegen/JsWrapper');

module.exports["continue"] = {

    "string": function (test) {

        var expr = new JsWrapper('var x = args.shift();');

        test.equal(expr.continue(new JsWrapper('howdy;')).render(), 'var x = args.shift();\nhowdy;');
        test.done();
    },
};

module.exports["basics"] = {

    "string": function (test) {

        var expr = new JsWrapper('var x = args.shift();');

        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "no-op": function (test) {

        var expr = new JsWrapper(function () {
            return '42';
        });

        test.equal(expr.render(), '42');
        test.done();
    },

    "simple passthrough": function (test) {

        var expr = new JsWrapper(function (env) {
            return '(' + env.realize('42') + ')';
        });

        test.equal(expr.render(), '(42)');
        test.done();
    },

    "simple deferred": function (test) {

        var expr = new JsWrapper(function (env) {
            return env.realize(new JsWrapper(function (env) {
                return 'foo()';
            }, true)) + ';';
        });

        test.equal(expr.render(), 'Q.spread([foo()], function (tmp_0) {\ntmp_0;\n}, result.reject);');
        test.done();
    },

    "as statement": function (test) {

        var expr = new JsWrapper(function (env) {
            return 'bar(' + env.realize(new JsWrapper(function (env) {
                    return 'foo()';
                }, true)) + ')';
        }, true);

        test.equal(expr.asStatement().render(), 'Q.spread([foo()], function (tmp_0) {\nbar(tmp_0);\n}, result.reject);');
        test.done();
    },

    "nested deferred": function (test) {

        var expr = new JsWrapper(function (env) {
            return 'foo([' + env.realize(new JsWrapper(function (env) {
                return 'bar()';
            }, true)) + ']);';
        }, true);

        var result = expr.render();

        test.equal(result, 'Q.spread([bar()], function (tmp_0) {\nfoo([tmp_0]);\n}, result.reject);');
        test.done();
    },

    "complex deferred": function (test) {

        var expr = new JsWrapper(function (env) {
            return env.realize(new JsWrapper(function (env) {
                return 'foo([' + env.realize(new JsWrapper(function (env) {
                    return 'bar()';
                }, true)) + '])';
            }, true)) + ';';
        });

        var result = expr.render();

        test.equal(result, 'Q.spread([bar()], function (tmp_0) {\nQ.spread([foo([tmp_0])], function (tmp_0) {\ntmp_0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "multiple deferred": function (test) {

        var expr = new JsWrapper(function (env) {
            return env.realize(new JsWrapper(function (env) {
                return 'baz(' + env.realize(new JsWrapper(function (env) {
                    return 'foo()';
                }, true)) + ', ' + env.realize(new JsWrapper(function (env) {
                    return 'bar()';
                }, true)) +')';
            }, true)) + ';';
        });

        var result = expr.render();

        test.equal(result, 'Q.spread([foo(),bar()], function (tmp_0,tmp_1) {\nQ.spread([baz(tmp_0, tmp_1)], function (tmp_0) {\ntmp_0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "op with deferred": function (test) {

        var expr = new JsWrapper(function (env) {
            return env.realize(new JsWrapper(function (env) {
                return '(' + env.realize(new JsWrapper(function (env) {
                    return 'foo()';
                }, true)) + ' - ' + env.realize(new JsWrapper(function (env) {
                    return 'bar()';
                }, true)) +')';
            })) + ';';
        });

        var result = expr.render();

        test.equal(result, 'Q.spread([foo(),bar()], function (tmp_0,tmp_1) {\n(tmp_0 - tmp_1);\n}, result.reject);');
        test.done();
    }
};