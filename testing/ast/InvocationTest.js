/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Literal = require('../../ast/Literal');
var Identifier = require('../../ast/Identifier');
var Invocation = require('../../ast/Invocation');
var Scope = require('../../codegen/Scope');
var TargetScope = require('../../codegen/TargetScope');
var Promise = require('../../codegen/Promise');

module.exports["json"] = {

    "add": function (test) {

        var inv = new Invocation(new Identifier("foo"), []);

        test.equal(JSON.stringify(inv), '{"invoke":["id","foo"],"args":[]}');
        test.done();
    }
};

module.exports["renderJs"] = {

    setUp: function (cb) {

        this.scope = new Scope();
        this.target = new TargetScope();

        cb();
    },

    "no args": function (test) {

        var inv = new Invocation(new Identifier("foo"), []);

        var p = inv.renderJs(this.scope, this.target);

        test.ok(p instanceof Promise);
        test.equal(this.target.statements[0], '$1 = Q.all([$foo]).then(function (key) { vm.sendMessage(key); });');
        test.done();
    },

    "one arg": function (test) {

        var inv = new Invocation(new Identifier("foo"), [new Literal(3)]);

        var p = inv.renderJs(this.scope, this.target);

        test.ok(p instanceof Promise);
        test.equal(this.target.statements[0], '$1 = Q.all([$foo, 3]).then(function (key) { vm.sendMessage(key); });');
        test.done();
    },

    "two args": function (test) {

        var inv = new Invocation(new Identifier("foo"), [new Literal(3), new Literal("hi there")]);

        var p = inv.renderJs(this.scope, this.target);

        test.ok(p instanceof Promise);
        test.equal(this.target.statements[0], '$1 = Q.all([$foo, 3, "hi there"]).then(function (key) { vm.sendMessage(key); });');
        test.done();
    },

    "var args": function (test) {

        var inv = new Invocation(new Identifier("foo"), [new Literal(3), new Literal("hi there")]);

        var p = inv.renderJs(this.scope, this.target);

        test.ok(p instanceof Promise);
        test.equal(this.target.statements[0], '$1 = Q.all([$foo, 3, "hi there"]).then(function (key) { vm.sendMessage(key); });');
        test.done();
    }
};