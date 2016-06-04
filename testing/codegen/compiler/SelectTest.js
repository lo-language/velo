/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
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

        test.equal(new Context().compile(node).render(), '$foo.bar');
        test.done();
    }
};
