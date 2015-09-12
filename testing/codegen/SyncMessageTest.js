/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var util = require('util');
var SyncMessage = require('../../codegen/SyncMessage');
var JsConstruct = require('../../codegen/JsConstruct');

module.exports["message"] = {

    "basics": function (test) {

        var sm = new SyncMessage('$foo');

        sm.placeholder = 'boba';

        test.equal(sm.wrap('hola').resolve().render(), 'this.sendMessage($foo, [], function (boba) {hola}, null);\n\n');
        test.done();
    }
};