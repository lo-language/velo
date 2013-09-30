/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var Identifier = require('../../Identifier');

exports["eval"] = {

    "resolves correctly": function (test) {

        var ref = new Identifier("name");
        var scope = {};

        test.equal(undefined, ref.evaluate(scope));

        scope.name = 47;

        test.equal(47, ref.evaluate(scope));

        test.done();
    }
};