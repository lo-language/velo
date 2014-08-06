/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";


var Scope = require('../../codegen/Scope');
var Constant = require('../../codegen/Constant');

module.exports["constants"] = {

    setUp: function (cb) {

        this.scope = new Scope();
        cb();
    },

    "define failure": function (test) {

        this.scope.define('foo', 7);

        test.throws(function () {

            this.scope.define('foo', 14);
        });

        test.done();
    },

    "define/resolve": function (test) {

        this.scope.define('foo', 7);

        var constant = this.scope.resolve('foo');

        test.ok(constant instanceof Constant);
        test.equal(constant.getVal(), 7);
        test.done();
    },

    "isConstant": function (test) {

        test.equal(this.scope.isConstant('foo'), false);
        this.scope.define('foo', 47);
        test.ok(this.scope.isConstant('foo'));
        test.done();
    }
}