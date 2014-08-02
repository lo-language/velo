/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Identifier = require('../../ast/Identifier');
var Context = require('../../codegen/Context');

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

        this.context = new Context();

        cb();
    },

    "base name": function (test) {

        var id = new Identifier("foo");

        test.equal(id.toJavaScript(this.context), "$foo");
        test.done();
    },

    "field selector": function (test) {

        var id = new Identifier(new Identifier("foo"), "bar");

        test.equal(id.toJavaScript(this.context), "$foo.$bar");
        test.done();
    }
};