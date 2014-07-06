/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Identifier = require('../../ast/Identifier');

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

    "base name": function (test) {

        var id = new Identifier("foo");

        test.equal(id.toJavaScript(), "$foo");
        test.done();
    },

    "field selector": function (test) {

        var id = new Identifier(new Identifier("foo"), "bar");

        test.equal(id.toJavaScript(), "$foo.$bar");
        test.done();
    }
};