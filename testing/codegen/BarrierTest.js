/**
 * Created by: spurcell
 * 2/15/15
 */

"use strict";

var Barrier = require('../../codegen/SyncWrapper');
var Deferred = require('../../codegen/Deferred');

module.exports["basics"] = {

    "no-op": function (test) {

        var barrier = new Barrier(function () {
            return '42';
        });

        test.equal(barrier.getJs(), '42');
        test.done();
    },

    "simple passthrough": function (test) {

        var barrier = new Barrier(function () {
            return '(' + this.renderSync('42') + ')';
        });

        test.equal(barrier.getJs(), '(42)');
        test.done();
    },

    "simple deferred": function (test) {

        var barrier = new Barrier(function () {
            return this.renderSync(new Deferred(function () {
                return 'foo()';
            }));
        });

        test.equal(barrier.getJs(), 'Q.spread([foo()], function (tmp_0) {\ntmp_0;\n}, result.reject);');
        test.done();
    },

    "complex deferred": function (test) {

        var deferred = new Deferred(function () {
            return 'foo([' + this.renderSync(new Deferred(function () {
                return 'bar()';
            })) + '])'});

        var barrier = new Barrier(function () {
            return this.renderSync(deferred);
        });

        var result = barrier.getJs();

        test.equal(result, 'Q.spread([bar()], function (tmp_0) {\nQ.spread([foo([tmp_0)]], function (tmp_0) {\ntmp_0;\n}, result.reject);\n}, result.reject);');
        test.done();
    }
};