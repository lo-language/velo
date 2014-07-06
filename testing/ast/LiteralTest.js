/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Literal = require('../../ast/Literal');

module.exports["json"] = {

    "number": function (test) {

        var id = new Literal(3);

        test.deepEqual(id.toJSON(), "3");
        test.done();
    }
};

module.exports["codegen"] = {

    "add": function (test) {

        var val = new Literal(3);

        test.equal(val.toJavaScript(), 3);
        test.done();
    }
};