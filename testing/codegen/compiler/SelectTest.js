/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
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

        test.deepEqual(new Context().compile(node), JS.select(JS.ID('$foo'), 'bar'));
        test.done();
    }
};
