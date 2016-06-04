/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var util = require('util');

module.exports["response"] = {

    "reply without args": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: []};

        test.equal(new Context().compile(node).render(), 'task.respond("reply", []);\nreturn;');
        test.done();
    },

    "reply with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(new Context().compile(node).render(), 'task.respond("reply", [42]);\nreturn;');
        test.done();
    },

    "reply with two args": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: "hot dog!"}
            ]};

        test.equal(new Context().compile(node).render(), 'task.respond("reply", [42, \'hot dog!\']);\nreturn;');
        test.done();
    },

    "fail": function (test) {

        var node = {
            type: 'response',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(new Context().compile(node).render(), 'task.respond("fail", [42]);\nreturn;');
        test.done();
    }
};