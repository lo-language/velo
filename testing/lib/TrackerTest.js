/**
 * Created by: spurcell
 * 12/31/14
 */

"use strict";

var Tracker = require('../../lib/Tracker');
var Q = require('q');

module.exports["basics"] = {

    "wraps value": function (test) {

        test.expect(1);

        var tracker = new Tracker(17);

        var d = Q.defer();

        tracker.register(d.promise, function () {

            test.equal(this.val, 18);
        });

        tracker.getPromise().then(function (val) {

            test.equal(val, 18);
            test.done();
        });

        d.resolve('blah');
    }
};