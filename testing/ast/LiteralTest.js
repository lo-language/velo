/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Literal = require('../../ast/Literal');
var Scope = require('../../codegen/Scope');

module.exports["json"] = {

    "number": function (test) {

        var val = new Literal(3);

        test.equal(val.toJSON(), "3");
        test.done();
    },

    "boolean": function (test) {

        var val = new Literal(true);

        test.equal(val.toJSON(), true);
        test.done();
    },

    "string": function (test) {

        var val = new Literal("Leela");

        test.equal(val.toJSON(), "Leela");
        test.done();
    }
};

module.exports["render"] = {

    setUp: function (cb) {

        this.scope = new Scope();

        cb();
    },

    "number": function (test) {

        var val = new Literal(3).render(this.scope);

        test.ok(val.isConstant());
        test.done();
    },

    "boolean": function (test) {

        var val = new Literal(true).render(this.scope);

        test.ok(val.isConstant());
        test.done();
    },

    "string": function (test) {

        var val = new Literal("Leela").render(this.scope);

        test.ok(val.isConstant());
        test.done();
    }
};