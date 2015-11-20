/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var Scope = require('../../codegen/Scope');

module.exports["basics"] = {

    'declare var': function (test) {

        var scope = new Scope();

        test.equal(scope.has('foo'), false);
        test.deepEqual(scope.getJsVars(), []);

        scope.declare('foo');
        test.equal(scope.has('foo'), true);
        test.deepEqual(scope.getJsVars(), ['$foo']);

        // test idempotency
        scope.declare('foo');
        test.equal(scope.has('foo'), true);
        test.deepEqual(scope.getJsVars(), ['$foo']);

        // define a constant with the same name fails
        test.throws(function () {scope.define('foo', 42);});

        test.done();
    },

    'declare var that collides with JS': function (test) {

        var scope = new Scope();

        test.equal(scope.has('constructor'), false);
        test.deepEqual(scope.getJsVars(), []);

        scope.declare('constructor');
        test.equal(scope.has('constructor'), true);
        test.deepEqual(scope.getJsVars(), ['$constructor']);

        // test idempotency
        scope.declare('constructor');
        test.equal(scope.has('constructor'), true);
        test.deepEqual(scope.getJsVars(), ['$constructor']);

        test.done();
    },

    'define constant': function (test) {

        var scope = new Scope();

        test.equal(scope.has('port'), false);
        test.deepEqual(scope.getJsVars(), []);

        scope.define('port', 8080);

        test.deepEqual(scope.getJsVars(), []);
        test.equal(scope.has('port'), true);
        test.equal(scope.isConstant('port'), true);
        test.equal(scope.resolve('port'), 8080);

        // declare as var now fails
        test.throws(function () {scope.declare('port');});

        // define another constant with the same name fails
        test.throws(function() {scope.define('port', 8000);});

        test.done();
    }
};

module.exports["child scope"] = {

    'define var in parent': function (test) {

        var parent = new Scope();

        var child = parent.bud();

        parent.declare('foo');

        test.deepEqual(child.getJsVars(), []);

        // should be defined in the child as well
        test.ok(child.has('foo'));
        test.equal(child.isConstant('foo'), false);

        // define bar in the child
        child.declare('bar');
        test.equal(child.has('bar'), true);
        test.deepEqual(child.getJsVars(), ['$bar']);

        // should not be defined in the parent
        test.equal(parent.has('bar'), false);

        // define a constant in child with the same name as a parent var fails
        test.throws(function() {child.define('foo', 42);});

        test.done();
    },

    'define constant in parent': function (test) {

        var parent = new Scope();

        var child = parent.bud();

        parent.define('foo', "42");

        test.deepEqual(child.getJsVars(), []);

        // should be defined in the child as well
        test.ok(child.has('foo'));
        test.ok(child.isConstant('foo'));
        test.equal(child.resolve('foo'), 42);

        // define constant in child with same name as parent constant fails
        test.throws(function () {child.define('foo', 3.14);});

        // declare var in child with same name as parent constant fails
        test.throws(function() {child.declare('foo');})

        // define bar in the child
        child.define('bar', "53");
        test.equal(child.has('bar'), true);
        test.deepEqual(child.getJsVars(), []);
        test.ok(child.has('bar'));
        test.ok(child.isConstant('bar'));
        test.equal(child.resolve('bar'), "53");

        // should not be defined in the parent
        test.equal(parent.has('bar'), false);

        test.done();
    }
};
