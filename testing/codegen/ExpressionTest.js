/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";

var Expression = require('../../codegen/Expression');

module.exports["simple"] = {

    "createLiteral int": function (test) {

        var v = Expression.createLiteral(8);

        test.ok(v.isImmediate());
        test.equal(v.getCode(), '8');
        test.done();
    },

    "createLiteral string": function (test) {

        var v = Expression.createLiteral('hi there');

        test.ok(v.isImmediate());
        test.equal(v.getCode(), '"hi there"');
        test.done();
    },

    "ref": function (test) {

        var v = Expression.createRef('$foo');

        test.equal(v.isImmediate(), false);
        test.equal(v.getCode(), '$foo');
        test.done();
    },

    "immediate ref": function (test) {

        var v = Expression.createRef('$foo', true);

        test.equal(v.isImmediate(), true);
        test.equal(v.getCode(), '$foo');
        test.done();
    }
};

module.exports["compound"] = {

    "immediates": function (test) {

        var a = Expression.createLiteral(8);
        var b = Expression.createLiteral("hello");

        var c = Expression.createCompound(function (args) {
            return args[0] + ' % ' + args[1];
        }, [a, b]);

        test.ok(c.isImmediate());
        test.equal(c.getCode(), '8 % "hello"');
        test.done();
    },

    "one promise": function (test) {

        var a = Expression.createLiteral(8);
        var b = Expression.createRef("$foo");

        var c = Expression.createCompound(function (args) {
            return args[0] + ' % ' + args[1];
        }, [a, b]);

        test.equal(c.isImmediate(), false);
        test.equal(c.getCode(), '$foo.then(function (val) {return 8 % val;})');
        test.done();
    },

    "two promises": function (test) {

        var a = Expression.createRef('$prak');
        var b = Expression.createRef("$zaphod");

        var c = Expression.createCompound(function (args) {
            return args[0] + ' % ' + args[1];
        }, [a, b]);

        test.equal(c.isImmediate(), false);
        test.equal(c.getCode(), 'Q.all([$prak, $zaphod]).then(function (args) {return args[0] % args[1];})');
        test.done();
    },

    "mixed promises": function (test) {

        var a = Expression.createRef('$prak');
        var b = Expression.createRef("42");
        var d = Expression.createRef("$zaphod");

        var c = Expression.createCompound(function (args) {
            return args[0] + ' ? ' + args[1] + ' : ' + args[2];
        }, [a, b, d]);

        test.equal(c.isImmediate(), false);
        test.equal(c.getCode(), 'Q.all([$prak, 42, $zaphod]).then(function (args) {return args[0] ? args[1] : args[2];})');
        test.done();
    }
};