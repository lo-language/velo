/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

const Context = require('../../codegen/Context');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const Request = require('../../codegen/Request');

module.exports["basics"] = {

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

    'declare var in root ctx should fail': function (test) {

        var ctx = new Context();

        test.equal(ctx.has('foo'), false);
        test.deepEqual(ctx.getJsVars(), []);

        try {
            ctx.declare('foo');
            test.fail();
        }
        catch (err) {
            test.done();
        }
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

module.exports["external constants"] = {

    'lookup success from root': function (test) {

        test.expect(3);

        var resolver = {
            resolveExternal: function (name, qualifier) {

                test.equal(name, "PI");
                test.equal(qualifier, "Math");
                return "snooks";
            }
        };

        var parent = new Context(resolver);

        test.equal(parent.resolveExternal("PI", "Math"), "snooks");

        test.done();
    },

    'lookup success from child': function (test) {

        test.expect(3);

        var resolver = {
            resolveExternal: function (name, qualifier) {

                test.equal(name, "cos");
                test.equal(qualifier, "Trig");
                return "snooks";
            }
        };

        var parent = new Context(resolver);
        var child = parent.createInner();

        test.equal(child.resolveExternal("cos", "Trig"), "snooks");

        test.done();
    },

    'lookup failure': function (test) {

        test.expect(2);

        var resolver = {
            resolveExternal: function (name, qualifier) {

                test.equal(name, "cos");
                test.equal(qualifier, "Trig");

                throw new Error("not found");
            }
        };

        var parent = new Context(resolver);

        try {
            parent.resolveExternal("cos", "Trig");
            test.fail();
        }
        catch (err) {
            test.done();
        }
    }
};


module.exports["compileStmt"] = {

    "with no wrappers": function (test) {

        var node = {
            type: 'assign',
            op: '*=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var context = new Context();

        // spoof a wrapper
        var s = context.compileStmt(node);

        test.deepEqual(s.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'assign',
                    [ 'subscript', [ 'id', '$foo' ], [ 'id', '$bar' ] ],
                    [ 'num', '57' ], '*=' ] ] ]);

        test.equal(s.async, false);

        test.done();
    },

    "with one wrapper": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: '42'}
                ]}
        };

        var context = new Context();

        // spoof a wrapper
        var s = context.compileStmt(node);

        test.deepEqual(s.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [ [ 'num', '42' ] ] ],
                        [ 'function', null, [ 'res0' ], [ 'stmtList' ] ] ] ] ] ]);

        test.equal(s.async, true);

        test.done();
    },

    "with two wrappers": function (test) {

        var node = {
            type: 'application_stmt',
            application: {
                type: 'application',
                address: {type: 'id', name: 'baz'},
                args: [ {
                        type: 'application',
                        address: {type: 'id', name: 'foo'},
                        args: []
                    }]}
        };

        var context = new Context();

        // spoof a wrapper
        var s = context.compileStmt(node);

        test.deepEqual(s.renderTree(), [ 'stmtList',
            [ 'expr-stmt',
                [ 'call',
                    [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                    [ [ 'id', '$foo' ],
                        [ 'arrayLiteral', [] ],
                        [ 'function',
                            null,
                            [ 'res0' ],
                            [ 'stmtList',
                                [ 'expr-stmt',
                                    [ 'call',
                                        [ 'select', [ 'id', 'task' ], 'sendMessage' ],
                                        [ [ 'id', '$baz' ],
                                            [ 'arrayLiteral', [ [ "subscript", [ 'id', 'res0' ], [ "num", "0" ] ] ] ],
                                            [ 'function', null, [ 'res1' ], [ 'stmtList' ] ] ] ] ] ] ] ] ] ] ]);

        test.equal(s.async, true);

        test.done();
    }
};