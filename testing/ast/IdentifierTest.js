/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Identifier = require('../../ast/Identifier');
var Action = require('../../ast/Action');
var TargetFn = require('../../codegen/TargetFn');

module.exports["json"] = {

    "base name": function (test) {

        var id = new Identifier("foo");

        test.deepEqual(id.toJSON(), ['id','foo']);
        test.done();
    },

    "field selector": function (test) {

        var id = new Identifier(new Identifier("foo"), "bar");

        test.deepEqual(id.toJSON(), ['id',['id','foo'],'bar']);
        test.done();
    }
};

module.exports["codegen"] = {

    setUp: function (cb) {

        this.target = new TargetFn(new Action(['foo']));

        cb();
    },

    "base name": function (test) {

        var id = new Identifier("foo");

        var result = id.compile(this.target).getCode();

        test.equal(result, "$foo");
        test.done();
    },

    "immediate selector": function (test) {

        var id = new Identifier(new Identifier("foo"), "bar");

        var result = id.compile(this.target).getCode();

        test.equal(result, "$foo.$bar");
        test.done();
    },

    "deferred selector": function (test) {

        var id = new Identifier(new Identifier("bar"), "baz");

        var result = id.compile(this.target).getCode();

        test.equal(result, "$bar.then(function (val) {return val.$baz;})");
        test.done();
    }
};