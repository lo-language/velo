/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

const Context = require('../../../codegen/Context');
const JS = require('../../../codegen/JsPrimitives');
const util = require('util');
const JsStmt = require('../../../codegen/JsStmt');

module.exports["response"] = {

    "reply without args": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: []};

        test.deepEqual(new Context().compile(node).renderTree(),
            new JsStmt(JS.runtimeCall('respond', [JS.string('reply'), JS.arrayLiteral([])]))
                .attach(JsStmt.return()).renderTree());
        test.done();
    },

    "reply with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.deepEqual(new Context().compile(node).renderTree(),
            new JsStmt(JS.runtimeCall('respond', [JS.string('reply'), JS.arrayLiteral([JS.num('42')])]))
                .attach(JsStmt.return()).renderTree());
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

        test.deepEqual(new Context().compile(node).renderTree(),
            new JsStmt(JS.runtimeCall('respond', [JS.string('reply'), JS.arrayLiteral([JS.num('42'), JS.string("hot dog!")])]))
                .attach(JsStmt.return()).renderTree());
        test.done();
    },

    "fail with one arg": function (test) {

        var node = {
            type: 'response',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.deepEqual(new Context().compile(node).renderTree(),
            new JsStmt(JS.runtimeCall('respond', [JS.string('fail'), JS.arrayLiteral([JS.num('42')])]))
                .attach(JsStmt.return()).renderTree());
        test.done();
    }
};