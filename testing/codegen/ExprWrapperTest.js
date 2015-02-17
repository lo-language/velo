/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var ExprWrapper = require('../../codegen/ExprWrapper');

module.exports["basics"] = {

    "no-op": function (test) {

        var expr = new ExprWrapper(function () {
            return '42';
        });

        test.equal(expr.render(), '42');
        test.done();
    },

    "simple passthrough": function (test) {

        var expr = new ExprWrapper(function (env) {
            return '(' + env.syncrify('42') + ')';
        });

        test.equal(expr.render(), '(42)');
        test.done();
    },

    "simple deferred": function (test) {

        var expr = new ExprWrapper(function (env) {
            return env.syncrify(new ExprWrapper(function (env) {
                return 'foo()';
            }, true)) + ';';
        });

        test.equal(expr.render(), 'Q.spread([foo()], function (tmp_0) {\ntmp_0;\n}, result.reject);');
        test.done();
    },

    "nested deferred": function (test) {

        var expr = new ExprWrapper(function (env) {
            return 'foo([' + env.syncrify(new ExprWrapper(function (env) {
                return 'bar()';
            }, true)) + ']);';
        }, true);

        var result = expr.render();

        test.equal(result, 'Q.spread([bar()], function (tmp_0) {\nfoo([tmp_0]);\n}, result.reject);');
        test.done();
    },

    "complex deferred": function (test) {

        var expr = new ExprWrapper(function (env) {
            return env.syncrify(new ExprWrapper(function (env) {
                return 'foo([' + env.syncrify(new ExprWrapper(function (env) {
                    return 'bar()';
                }, true)) + '])';
            }, true)) + ';';
        });

        var result = expr.render();

        test.equal(result, 'Q.spread([bar()], function (tmp_0) {\nQ.spread([foo([tmp_0])], function (tmp_0) {\ntmp_0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "multiple deferred": function (test) {

        var expr = new ExprWrapper(function (env) {
            return env.syncrify(new ExprWrapper(function (env) {
                return 'baz(' + env.syncrify(new ExprWrapper(function (env) {
                    return 'foo()';
                }, true)) + ', ' + env.syncrify(new ExprWrapper(function (env) {
                    return 'bar()';
                }, true)) +')';
            }, true)) + ';';
        });

        var result = expr.render();

        test.equal(result, 'Q.spread([foo(),bar()], function (tmp_0,tmp_1) {\nQ.spread([baz(tmp_0, tmp_1)], function (tmp_0) {\ntmp_0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "op with deferred": function (test) {

        var expr = new ExprWrapper(function (env) {
            return env.syncrify(new ExprWrapper(function (env) {
                return '(' + env.syncrify(new ExprWrapper(function (env) {
                    return 'foo()';
                }, true)) + ' - ' + env.syncrify(new ExprWrapper(function (env) {
                    return 'bar()';
                }, true)) +')';
            })) + ';';
        });

        var result = expr.render();

        test.equal(result, 'Q.spread([foo(),bar()], function (tmp_0,tmp_1) {\n(tmp_0 - tmp_1);\n}, result.reject);');
        test.done();
    }
};