/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["response"] = {

    "reply": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(new Context().compile(node).render(), 'task.respond("reply", 42);\nreturn;');
        test.done();
    },

    "fail": function (test) {

        var node = {
            type: 'response',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(new Context().compile(node).render(), 'task.respond("fail", 42);\nreturn;');
        test.done();
    }
};