/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["select"] = {

    "basics": function (test) {

        var node = {
            "type":"select",
            "set":{
                "type":"id",
                "name":"foo"
            },
            "member":"bar"
        };

        test.equal(new Scope().compile(node).render(), '$foo.bar');
        test.done();
    }
};
