/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";

var Scope = require('../../codegen/Scope');
var TargetScope = require('../../codegen/TargetScope');
var Constant = require('../../codegen/Constant');

module.exports["basics"] = {

    setUp: function (cb) {

        this.scope = new Scope();
        this.target = new TargetScope();

        cb();
    },

    "isConstant": function (test) {

        var c = new Constant(8);

        test.ok(c.isConstant());
        test.done();
    },

    "getValue": function (test) {

        var c = new Constant(8);

        test.equal(c.getValue(), 8);
        test.done();
    },

    "renderJs": function (test) {

        var c = new Constant(8);

        test.equal(c.renderJs(this.scope, this.target), 8);

        var c = new Constant("foobar");

        test.equal(c.renderJs(this.scope, this.target), '"foobar"');
        test.done();
    }
}