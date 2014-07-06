/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Obj = require('../.././Obj');

exports["constructor"] = {

    "inits": function (test) {

        var mockSystem = {};
        var fn = function () {};
        var obj = new Obj(mockSystem, fn);

        test.equal(obj.system, mockSystem);
        test.equal(obj.process, fn);

        test.done();
    }
};