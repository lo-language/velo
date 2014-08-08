/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Action = require('../../ast/Action');
var Scope = require('../../codegen/Scope');
var TargetScope = require('../../codegen/TargetScope');

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

    setUp: function (cb) {

        this.scope = new Scope();
        this.target = new TargetScope();

        cb();
    },

    "no args": function (test) {

        var action = new Action([]);
        test.equal(action.renderJs(this.scope, this.target), "function () {}");
        test.done();
    }
};