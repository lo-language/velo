/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Machine = require('../../Machine');

exports["constructor"] = {

    "inits": function (test) {

        var mockSystem = {};
        var fn = function () {};
        var machine = new Machine(mockSystem, fn);

        test.equal(machine.system, mockSystem);
        test.equal(machine.process, fn);

        test.done();
    }
};