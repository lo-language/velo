/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";


var TargetScope = require('../../codegen/TargetScope');
var Promise = require('../../codegen/Promise');

module.exports["basics"] = {

    setUp: function (cb) {

        this.target = new TargetScope();
        cb();
    },

    "createPromise": function (test) {

        var p = this.target.createPromise('Q.when(5);');

        test.ok(p instanceof Promise);
        test.equal(p.getName(), '$0');
        test.equal(this.target.statements[0], '$0 = Q.when(5);');
        test.done();
    },

//    "empty target": function (test) {
//
//        test.equal(this.target.renderJs(), 'function () {}');
//        test.done();
//    },
//
//    "getVar": function (test) {
//
//        var p = this.target.getVar('foo');
//
//        test.equal(this.target.renderJs(), 'function () {\n\tvar $foo;\n}');
//        test.done();
//    },
//
//    "createPromise": function (test) {
//
//        var p = this.target.createPromise('foo');
//
//        test.equal(this.target.renderJs(), 'function () {\n\tvar $0;\n}');
//        test.done();
//    }
}