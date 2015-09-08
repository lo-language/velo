/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Message = require('../../codegen/Message');
var util = require('util');

module.exports["basics"] = {

    "no handlers": function (test) {

        var msg = new Message('$foo', []);

        test.equal(msg.render(), 'this.sendMessage($foo, [], null, null);\n\n');
        test.done();
    },

    "success handler": function (test) {

        var msg = new Message('$foo', [], "x = 1;");

        test.equal(msg.render(), 'this.sendMessage($foo, [], function (args) {x = 1;}, null);\n\n');
        test.done();
    }
};