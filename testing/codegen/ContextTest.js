/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

const Context = require('../../compiler/LoContext');

module.exports["basics"] = {

    "setRegistry": function (test) {

        var root = new Context();

        test.equal(root.registry, null);

        var registry = {};

        root.setRegistry(registry);

        test.equal(root.registry, registry);

        test.done();
    },

    "isRoot": function (test) {

        var root = new Context();

        test.ok(root.isRoot());

        var child = root.createInner();

        test.equal(child.isRoot(), false);

        test.done();
    },

    'declare var': function (test) {

        var ctx = new Context().createInner();

        test.equal(ctx.has('foo'), false);
        test.deepEqual(ctx.getJsVars(), []);

        ctx.declare('foo');
        test.equal(ctx.has('foo'), true);
        test.deepEqual(ctx.getJsVars(), ['$foo']);

        // test idempotency
        ctx.declare('foo');
        test.equal(ctx.has('foo'), true);
        test.deepEqual(ctx.getJsVars(), ['$foo']);

        // define a constant with the same name fails
        test.throws(function () {ctx.define('foo', 42);});

        test.done();
    },

    'context type': function (test) {

        var ctx = new Context();

        test.equal(ctx.isService(), false);
        test.equal(ctx.isSink(), false);

        test.equal(ctx.createInner(false).isService(), false);
        test.equal(ctx.createInner(false).isSink(), true);

        test.equal(ctx.createInner(true).isService(), true);
        test.equal(ctx.createInner(true).isSink(), false);

        test.done();
    },

    'declare var that collides with JS': function (test) {

        var ctx = new Context().createInner();

        test.equal(ctx.has('function'), false);
        test.deepEqual(ctx.getJsVars(), []);

        ctx.declare('function');
        test.equal(ctx.has('function'), true);
        test.deepEqual(ctx.getJsVars(), ['$function']);

        // test idempotency
        ctx.declare('function');
        test.equal(ctx.has('function'), true);
        test.deepEqual(ctx.getJsVars(), ['$function']);

        test.done();
    },

    'define constant': function (test) {

        var ctx = new Context();

        test.equal(ctx.has('port'), false);
        test.deepEqual(ctx.getJsVars(), []);

        ctx.define('port', 8080);

        test.deepEqual(ctx.getJsVars(), []);
        test.equal(ctx.has('port'), true);
        test.equal(ctx.isConstant('port'), true);
        test.equal(ctx.resolve('port'), 8080);

        // declare as var now fails
        test.throws(function () {ctx.declare('port');});

        // define another constant with the same name fails
        test.throws(function() {ctx.define('port', 8000);});

        test.done();
    },

    'define constant that collides with JS': function (test) {

        var ctx = new Context().createInner();

        test.equal(ctx.has('function'), false);
        test.deepEqual(ctx.getJsVars(), []);

        ctx.define('function', 77);
        test.equal(ctx.has('function'), true);
        test.deepEqual(ctx.getJsVars(), []);

        test.done();
    },

    'define service constant': function (test) {

        var ctx = new Context().createInner();

        test.equal(ctx.has('function'), false);
        test.deepEqual(ctx.getJsVars(), []);

        ctx.define('foo', 'function () {};', true);
        test.equal(ctx.has('foo'), true);
        test.deepEqual(ctx.getJsVars(), []);

        test.done();
    },

    'set future': function (test) {

        var ctx = new Context();

        test.equal(ctx.has('John_Zoidberg'), false);
        test.deepEqual(ctx.getJsVars(), []);

        ctx.setFuture('John_Zoidberg');
        test.equal(ctx.has('John_Zoidberg'), true);
        test.deepEqual(ctx.getJsVars(), ['$John_Zoidberg']);

        test.done();
    }
};

module.exports["child ctx"] = {

    'lookup var in parent': function (test) {

        var parent = new Context().createInner();

        var child = parent.createInner();

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

    'lookup constant in parent': function (test) {

        var parent = new Context();

        var child = parent.createInner();

        parent.define('foo', "42");

        test.deepEqual(child.getJsVars(), []);

        // should be defined in the child as well
        test.ok(child.has('foo'));
        test.ok(child.isConstant('foo'));
        test.equal(child.resolve('foo'), '42');

        // define constant in child with same name as parent constant fails
        test.throws(function () {child.define('foo', 3.14);});

        // declare var in child with same name as parent constant fails
        test.throws(function() {child.declare('foo');});

        // define bar in the child
        child.define('bar', "53");
        test.equal(child.has('bar'), true);
        // test.deepEqual(child.getJsVars(), []);
        test.ok(child.has('bar'));
        test.ok(child.isConstant('bar'));
        test.equal(child.resolve('bar'), '53');

        // should not be defined in the parent
        test.equal(parent.has('bar'), false);

        test.done();
    }
};

module.exports["can respond"] = {

    'in various contexts': function (test) {

        var root = new Context();
        test.equal(root.canRespond(), false);

        var sink = root.createInner(false);
        test.equal(sink.canRespond(), false);

        var service = root.createInner(true);
        test.equal(service.canRespond(), true);

        var innerSink = service.createInner(false);
        test.equal(innerSink.canRespond(), true);

        test.done();
    }
};

module.exports["continuations"] = {

    'wrapTail': function (test) {

        // todo

        test.done();
    }
};

module.exports["compile statements"] = {

    'basic': function (test) {

        test.done();
    }
};