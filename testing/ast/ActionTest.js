/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Operator = require('../../ast/Operator');
var Literal = require('../../ast/Literal');
var Identifier = require('../../ast/Identifier');
var Action = require('../../ast/Action');

//module.exports["json"] = {
//
//    "add": function (test) {
//
//        var op = new Operator("add", new Literal(3), new Literal(4));
//
//        test.equal(JSON.stringify(op), '{"invoke":"add","left":3,"right":4}');
//        test.done();
//    }
//};

module.exports["codegen"] = {

    "no args": function (test) {

        var action = new Action([]);
        test.equal(action.toJavaScript(), "function () {}");
        test.done();
    }
};