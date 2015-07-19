/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["response"] = {

    "reply": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(Compiler.compile(node).render(), "this.reply(42);\nreturn;\n\n");
        test.done();
    },

    "fail": function (test) {

        var node = {
            type: 'response',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(Compiler.compile(node).render(), "this.fail(42);\nreturn;\n\n");
        test.done();
    }
};