/**
 * Created by: spurcell
 * 2/9/14
 */

"use strict";

var Machine = require("../../Machine");

module.exports["constructor"] = {

    "inits properly": function (test) {

        var mockEnv = {};
        var program = "hi there";
        var m = new Machine(mockEnv, program);

        test.equal(m.env, mockEnv);
        test.equal(m.program, program);
        test.deepEqual(m.messages, []);

        test.done();
    }
};