/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Operator = require('../../ast/Operator');
var Literal = require('../../ast/Literal');

//
//module.exports["json"] = {
//
//    "base name": function (test) {
//
//        var id = new Operator("add", 3, 4);
//
//        test.deepEqual(id.toJSON(), ['id','foo']);
//        test.done();
//    },
//
//    "field selector": function (test) {
//
//        var id = new Operator(new Operator("foo"), "bar");
//
//        test.deepEqual(id.toJSON(), ['id',['id','foo'],'bar']);
//        test.done();
//    }
//};

module.exports["codegen"] = {

    "add": function (test) {

        var op = new Operator("add", new Literal(3), new Literal(4));

        test.equal(op.toJavaScript(), "3+4");
        test.done();
    }
};