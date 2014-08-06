/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Identifier = require('../../ast/Identifier');
var Scope = require('../../codegen/Scope');
var Promise = require('../../codegen/Promise');

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

        this.scope = new Scope();

        cb();
    },

    "base name": function (test) {

        var id = new Identifier("foo");

        var result = id.renderJs(this.scope);

        test.ok(result instanceof Promise);
        test.equal(result.getName(), "$foo");
        test.done();
    }

//    "field selector": function (test) {
//
//        var id = new Identifier(new Identifier("foo"), "bar");
//
//        var result = id.renderJs(this.scope);
//
//        test.ok(result instanceof Promise);
//        test.equal(result.getName(), "$foo");
//
//        test.equal(id.renderJs(this.scope), "$foo.$bar");
//        test.done();
//    }
};