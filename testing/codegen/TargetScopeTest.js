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

    "getVar": function (test) {

        var p = this.target.getVar('foo');

        test.ok(p instanceof Promise);
        test.equal(p.getName(), '$foo');

        // test idempotency

        var p2 = this.target.getVar('foo');

        test.ok(p2 instanceof Promise);
        test.equal(p2.getName(), '$foo');

//        test.equal(this.target.renderJs(), 'function () {\n\tvar $foo;\n}');
        test.done();
    }
}