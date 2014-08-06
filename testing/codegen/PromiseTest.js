/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";


var Promise = require('../../codegen/Promise');

module.exports["basics"] = {

    "getName": function (test) {

        var p = new Promise('foo');

        test.equal(p.getName(), 'foo');
        test.done();
    },

    "isConstant": function (test) {

        var p = new Promise('foo');

        test.equal(p.isConstant(), false);
        test.done();
    }
}