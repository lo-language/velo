/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";


var Constant = require('../../codegen/Constant');


module.exports["basics"] = {

    "isConstant": function (test) {

        var c = new Constant(8);

        test.ok(c.isConstant());
        test.done();
    },

    "getValue": function (test) {

        var c = new Constant(8);

        test.equal(c.getValue(), 8);
        test.done();
    }
}