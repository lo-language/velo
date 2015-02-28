/**
 * Created by: spurcell
 * 2/16/15
 */

"use strict";

var JsWrapper = require('../../codegen/JsWrapper');
var Resolver = require('../../codegen/Resolver');

module.exports["setNext"] = {

    "string": function (test) {

        var expr = new Resolver('var x = args.shift();');

        test.equal(expr.setNext(new Resolver('howdy;')).render(), 'var x = args.shift();\nhowdy;');
        test.done();
    }
};

module.exports["basics"] = {

    setUp: function (cb) {

        cb();
    },

    "string": function (test) {

        var expr = new JsWrapper('var x = args.shift();');

        test.equal(expr.render(), 'var x = args.shift();');
        test.done();
    },

    "simple passthrough": function (test) {

        var expr = new Resolver(new JsWrapper(function (resolver) {
            return '(' + resolver.resolve('42') + ')';
        }));

        test.equal(expr.render(), '(42)');
        test.done();
    },

    "simple deferred": function (test) {

        var expr = new Resolver(new JsWrapper(function (resolver) {
            return resolver.resolve(new JsWrapper(function (resolver) {
                return 'foo()';
            }, true)) + ';';
        }));

        test.equal(expr.render(), 'Q.spread([foo()], function (ph0) {\nph0;\n}, result.reject);');
        test.done();
    },

    "nested deferred": function (test) {

        var expr = new Resolver(new JsWrapper(function (resolver) {
            return 'foo([' + resolver.resolve(new JsWrapper(function (resolver) {
                return 'bar()';
            }, true)) + ']);';
        }, true));

        test.equal(expr.render(), 'Q.spread([bar()], function (ph0) {\nfoo([ph0]);\n}, result.reject);');
        test.done();
    },

    "complex deferred": function (test) {

        var expr = new Resolver(new JsWrapper(function (resolver) {
            return resolver.resolve(new JsWrapper(function (resolver) {
                return 'foo([' + resolver.resolve(
                    new JsWrapper(function (resolver) {
                        return 'bar()';
                    }, true)) + '])';
            }, true)) + ';';
        }));

        test.equal(expr.render(), 'Q.spread([bar()], function (ph0) {\nQ.spread([foo([ph0])], function (ph0) {\nph0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "multiple deferred": function (test) {

        var expr = new Resolver(new JsWrapper(function (resolver) {
            return resolver.resolve(new JsWrapper(function (resolver) {
                return 'baz(' + resolver.resolve(new JsWrapper(function (resolver) {
                    return 'foo()';
                }, true)) + ', ' + resolver.resolve(new JsWrapper(function (resolver) {
                    return 'bar()';
                }, true)) +')';
            }, true)) + ';';
        }));

        test.equal(expr.render(), 'Q.spread([foo(),bar()], function (ph0,ph1) {\nQ.spread([baz(ph0, ph1)], function (ph0) {\nph0;\n}, result.reject);\n}, result.reject);');
        test.done();
    },

    "op with deferred": function (test) {

        var expr = new Resolver(new JsWrapper(function (resolver) {
            return resolver.resolve(new JsWrapper(function (resolver) {
                return '(' + resolver.resolve(new JsWrapper(function (resolver) {
                    return 'foo()';
                }, true)) + ' - ' + resolver.resolve(new JsWrapper(function (resolver) {
                    return 'bar()';
                }, true)) +')';
            })) + ';'}));

        test.equal(expr.render(), 'Q.spread([foo(),bar()], function (ph0,ph1) {\n(ph0 - ph1);\n}, result.reject);');
        test.done();
    }
};