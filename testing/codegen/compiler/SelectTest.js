/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
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

        test.deepEqual(new Context().compile(node).getTree(), JS.select(JS.ID('$foo'), 'bar').getTree());
        test.done();
    }
};
