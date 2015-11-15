/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Scope = require('../../../codegen/Scope');
var util = require('util');

module.exports["constants"] = {

    "numeric": function (test) {

        var node = {
            "type":"constant",
            "name":"port",
            "value": {type: "number", val: "443"}
        };

        var scope = new Scope();

        test.equal(scope.has('port'), false);
        test.equal(scope.isConstant('port'), false);

        test.equal(Compiler.compile(node, scope).render(), '');

        test.equal(scope.has('port'), true);
        test.ok(scope.isConstant('port'));
        test.equal(scope.resolve('port'), "443");

        test.done();
    },

    "string": function (test) {

        var node = {
            "type":"constant",
            "name":"album",
            "value": {type: "string", val: "Melon Collie"}
        };

        var scope = new Scope();

        test.equal(scope.has('album'), false);
        test.equal(scope.isConstant('album'), false);

        test.equal(Compiler.compile(node, scope).render(), '');

        test.equal(scope.has('album'), true);
        test.ok(scope.isConstant('album'));
        test.equal(scope.resolve('album'), "'Melon Collie'");

        test.done();
    },

    "prevents JS collisions": function (test) {

        var node = {
            "type":"constant",
            "name":"constructor",
            "value": {type: "string", val: "Melon Collie"}
        };

        var scope = new Scope();

        test.equal(scope.has('constructor'), false);
        test.equal(scope.isConstant('constructor'), false);

        test.equal(Compiler.compile(node, scope).render(), '');

        test.equal(scope.has('constructor'), true);
        test.ok(scope.isConstant('constructor'));
        test.equal(scope.resolve('constructor'), "'Melon Collie'");

        test.done();
    }
};
