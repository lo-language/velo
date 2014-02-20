/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Gateway = require('../../Gateway');

exports["constructor"] = {

    "inits": function (test) {

        var g = new Gateway();

        test.done();
    },

    "accept": function (test) {

        var g = new Gateway();

        var message = "hi";

        g.accept(message);

        test.equal(g.pull(), message);

        test.done();
    }
};