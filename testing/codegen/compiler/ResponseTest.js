/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Context = require('../../../codegen/Context');
var JsKit = require('../../../codegen/JsKit');
var JS = JsKit.parts;
var util = require('util');

module.exports["response"] = {

    "reply without args": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: []};

        test.deepEqual(new Context().compile(node).getAst(),
            JS.stmt(JS.runtimeCall('respond', [JS.string('reply'), JS.arrayLiteral([])]))
                .attach(JS.return()).getAst());
        test.done();
    },

    "reply with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.deepEqual(new Context().compile(node).getAst(),
            JS.stmt(JS.runtimeCall('respond', [JS.string('reply'), JS.arrayLiteral([JS.num('42')])]))
                .attach(JS.return()).getAst());
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

        test.deepEqual(new Context().compile(node).getAst(),
            JS.stmt(JS.runtimeCall('respond', [JS.string('reply'), JS.arrayLiteral([JS.num('42'), JS.string("hot dog!")])]))
                .attach(JS.return()).getAst());
        test.done();
    },

    "fail with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.deepEqual(new Context().compile(node).getAst(),
            JS.stmt(JS.runtimeCall('respond', [JS.string('fail'), JS.arrayLiteral([JS.num('42')])]))
                .attach(JS.return()).getAst());
        test.done();
    }
};