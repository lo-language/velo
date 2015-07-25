/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["message"] = {

    "no handlers": function (test) {

        var node = {
            "type":"message",
            "args": [],
            "address": {
                "type": "id",
                "name": "foo"
            }
        };

        test.equal(Compiler.compile(node).render(), 'this.sendMessage($foo, [], null, null);\n\n');
        test.done();
    }
};