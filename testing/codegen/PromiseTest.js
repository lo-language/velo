/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";

var Scope = require('../../codegen/Scope');
var TargetScope = require('../../codegen/TargetScope');
var Promise = require('../../codegen/Promise');

module.exports["basics"] = {

    setUp: function (cb) {

        this.scope = new Scope();
        this.target = new TargetScope();

        cb();
    },

    "getName": function (test) {

        var p = new Promise('foo');

        test.equal(p.getName(), 'foo');
        test.done();
    },

    "isConstant": function (test) {

        var p = new Promise('foo');

        test.equal(p.isConstant(), false);
        test.done();
    },

    "renderJs": function (test) {

        var p = new Promise('$foo');

        test.equal(p.renderJs(this.scope, this.target), '$foo');
        test.done();
    }
}