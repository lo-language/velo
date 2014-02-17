/**
 * Created by: spurcell
 * 2/9/14
 */

"use strict";

var Machine = require("../../Machine");

module.exports["constructor"] = {

    "inits properly": function (test) {

        var mockGateway = {};
        var program = "hi there";
        var m = new Machine(mockGateway, program);

        test.equal(m.gateway, mockGateway);
        test.equal(m.program, program);

        test.done();
    },

    "throws without program": function (test) {

        test.throws(function () {
            var m = new Machine({});
        });

        test.done();
    }
};

module.exports["run"] = {

    "null program": function (test) {

        var mockGateway = {};
        var program = [];
        var m = new Machine(mockGateway, program);

        m.run();

        test.done();
    }
};

module.exports["execute"] = {

    "put value": function (test) {

        var m = new Machine({}, []);

        m.state[0] = 25;
        test.equal(m.state[0], 25);

        m.execute(['put',0,0,0x19]);
        test.equal(m.state[0], 0x19);

        test.done();
    },

    "copy state": function (test) {

        var m = new Machine({}, []);

        m.state[0] = 25;
        test.equal(m.state[0], 25);

        m.execute(['put',0,0,0x19]);
        test.equal(m.state[0], 0x19);

        test.done();
    }
};