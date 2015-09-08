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

        test.equal(sm.render(), 'T1');

        test.equal(sm.wrap('hola').render(), 'this.sendMessage($foo, [], function (args) {hola}, null);\n\n');
        test.done();
    },

//    "wrap placeholder": function (test) {
//
//        var sm = new SyncMessage('$foo');
//
//        var construct = new JsConstruct(sm.placeholder);
//
//        test.equal(construct.render(), 'this.sendMessage($foo, [], function (args) {??}, null);\n\n');
//        test.done();
//    }
};