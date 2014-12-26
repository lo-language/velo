/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Context = require('../../codegen/ExaContext');
var JsContext = require('../../codegen/JsContext');
var util = require('util');


module.exports["literals"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        var result = this.compiler.compile(node);

        test.equal(result.renderExpr(), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: 42};

        var result = this.compiler.compile(node);

        test.equal(result.renderExpr(), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        var result = this.compiler.compile(node);

        test.equal(result.renderExpr(), "'turanga leela'");
        test.done();
    }
};

module.exports["identifiers"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

//    "undefined": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        var result = this.compiler.compile(node);
//
//        test.throws(result.getExpr, Error, "undefined value");
//        test.done();
//    },

    "defined value": function (test) {

        var node = {type: 'id', name: 'foo'};

        this.compiler.context.defineValue('foo');

        var result = this.compiler.compile(node);

        test.equal(result.renderExpr(), '$_foo');
        test.done();
    },

    "defined promise": function (test) {

        var node = {type: 'id', name: 'foo'};

        this.compiler.context.definePromise('foo');

        var result = this.compiler.compile(node);

        test.deepEqual(result.renderExpr(), '$val_foo');
        test.done();
    }
};

module.exports["request"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "no args": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: []};

        this.compiler.context.defineValue('foo');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');
//        test.deepEqual(prereqs, {tmp_0: '$_foo()'});

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo();');
//        test.deepEqual(prereqs, {});
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: 42}
            ]};

        this.compiler.context.defineValue('foo');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');
//        test.deepEqual(prereqs, {tmp_0: '$_foo(42)'});

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo(42);');
//        test.deepEqual(prereqs, {});
        test.done();
    },

    "two args": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: 42},
                {type: 'string', val: 'hi there'}
            ]};

        this.compiler.context.defineValue('foo');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');
//        test.deepEqual(prereqs, {tmp_0: "$_foo(42,'hi there')"});

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), "$_foo(42,'hi there');");
//        test.deepEqual(prereqs, {});
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'baz'},
            args: [{
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: []
            },{
                type: 'request',
                to: {type: 'id', name: 'bar'},
                args: []
            }]
        };

        // patch sub nodes?

        this.compiler.context.defineValue('baz');
        this.compiler.context.defineValue('foo');
        this.compiler.context.defineValue('bar');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');
//        test.deepEqual(prereqs, {tmp_0: '$_foo()', tmp_1: '$_bar()', tmp_2: "$_baz(tmp_0,tmp_1)"});

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), "$_baz(tmp_0,tmp_1);");
//        test.deepEqual(prereqs, {tmp_0: '$_foo()', tmp_1: '$_bar()'});
        test.done();
    }
};

module.exports["op"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "with literals": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: '+',
            left: {type: 'number', val: '1'},
            right: {type: 'number', val: '2'}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(), '(1 + 2)');
        test.done();
    },

    "with request": function (test) {

        var node = {
            type: 'op',
            op: '+',
            left: {type: 'number', val: '1'},
            right: {
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: []
            }
        };

        // patch sub nodes?

        this.compiler.context.defineValue('foo');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), '(1 + tmp_0)');
//        test.deepEqual(prereqs, {tmp_0: '$_foo()'});
        test.done();
    },

    "with two requests": function (test) {

        var node = {
            type: 'op',
            op: '+',
            left: {
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: []
            },
            right: {
                type: 'request',
                to: {type: 'id', name: 'bar'},
                args: []
            }
        };

        // patch sub nodes?

        this.compiler.context.defineValue('foo');
        this.compiler.context.defineValue('bar');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), '(tmp_0 + tmp_1)');
//        test.deepEqual(prereqs, {tmp_0: '$_foo()', tmp_1: '$_bar()'});
        test.done();
    },

////    "with promises": function (test) {
////
////        // should create a context
////        // should call compile on each statement
////
////        var node = {
////            type: 'op',
////            op: '+',
////            left: {type: 'number', val: '1'},
////            right: {type: 'number', val: '2'}
////        };
////
////        // patch sub nodes?
////
////        compiler.handlers["op"](node);
////
////        test.deepEqual(node.js, {value: '(1 + 2)'});
////        test.done();
////    },
//
//    "catches undefined operands": function (test) {
//
//        var node = {
//            type: 'op',
//            op: '+',
//            left: {type: 'id', name: 'foo'},
//            right: {type: 'number', val: '2'}
//        };
//
//        test.throws(function () {
//            this.compiler.compile(node);
//        }, Error, 'left operand not defined');
//
//        node = {
//            type: 'op',
//            op: '+',
//            left: {type: 'number', val: '2'},
//            right: {type: 'id', name: 'foo'}
//        };
//
//        test.throws(function () {
//            this.compiler.compile(node);
//        }, Error, 'right operand not defined');
//
//        test.done();
//    }
};

module.exports["statements"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "request with one arg": function (test) {

        var node = {
            type: 'exprStatement',
            expr: {
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: 42}
                ]}
        };

        this.compiler.context.defineValue('foo');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo(42);');
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'exprStatement',
            expr: {
                type: 'request',
                to: {type: 'id', name: 'baz'},
                args: [{
                    type: 'op',
                    op: '+',
                    left: {
                        type: 'request',
                        to: {type: 'id', name: 'foo'},
                        args: []
                    },
                    right: {
                        type: 'request',
                        to: {type: 'id', name: 'bar'},
                        args: []
                    }
                }]}};

        // patch sub nodes?

        this.compiler.context.defineValue('foo');
        this.compiler.context.defineValue('bar');
        this.compiler.context.defineValue('baz');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext),
            'Q.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n\n$_baz((tmp_0 + tmp_1));}, result.reject);');
        test.done();
    },

    "several nested requests": function (test) {

        var node = {
            type: 'exprStatement',
            expr: {
                type: 'request',
                to: {type: 'id', name: 'quux'},
                args: [{
                    type: 'request',
                    to: {type: 'id', name: 'baz'},
                    args: [{
                        type: 'op',
                        op: '+',
                        left: {
                            type: 'request',
                            to: {type: 'id', name: 'foo'},
                            args: []
                        },
                        right: {
                            type: 'request',
                            to: {type: 'id', name: 'bar'},
                            args: []
                        }
                    }]}]}};

        // patch sub nodes?

        this.compiler.context.defineValue('foo');
        this.compiler.context.defineValue('bar');
        this.compiler.context.defineValue('baz');
        this.compiler.context.defineValue('quux');
        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), 'Q.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n\nQ.spread([$_baz((tmp_0 + tmp_1))], function (tmp_0) {\n\n$_quux(tmp_0);}, result.reject);}, result.reject);');
        test.done();
    }
};

//module.exports["program"] = {
//
//    "compiles all statements": function (test) {
//
//        // should create a context
//        // should call compile on each statement
//
//        var node = {
//            type: 'program',
//            statements: [
//                {type: 'assign', op: '=', left: {type: 'id', name: 'foo'}, right: {type: 'id', name: 'bar'}}
//            ]
//        };
//
//        // patch sub nodes?
//
//        var result = compiler.handlers["program"](node);
//
//        test.equal(node.code, 'var args = Array.prototype.slice.call(arguments, 2);\nvar result = Q.defer();\n$_foo = $_bar\nreturn result.promise;\n');
//        test.done();
//    }
//};
//
//
//module.exports["conditional"] = {
//
//    "positive only": function (test) {
//
//        // should create a context
//        // should call compile on each statement
//
//        var node = {
//            type: 'conditional',
//            predicate: {type: 'id', name: 'foo'},
//            positive: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 42}}]
//        };
//
//        // patch sub nodes?
//
//        var result = compiler.handlers["conditional"](node);
//
//        test.equal(node.code, 'if ($_foo) {\n    $_bar = 42;\n}\n');
//        test.done();
//    }
//};
//
//module.exports["assignment"] = {
//
//    "assign literal to id": function (test) {
//
//        var context = {};
//
//        var node = {
//            op: '=',
//            left: {type: 'id', name: 'foo'},
//            right: {type: 'number', val: '57'}
//        };
//
//        var result = compiler.handlers["assign"](node, context);
//        test.equal(node.code, '$_foo = 57');
//        test.equal(context['$_foo'], true);
//        test.equal(Object.keys(context).length, 1);
//        test.done();
//    },
//
//    "assign literal to expression": function (test) {
//
//        var context = {};
//
//        var node = {
//            op: '=',
//            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
//            right: {type: 'number', val: '57'}
//        };
//
//        var result = compiler.handlers["assign"](node, context);
//        test.equal(node.code, '$_foo[$_bar] = 57');
//        test.equal(Object.keys(context).length, 0);
//        test.done();
//    },
//
//    "assign var to id": function (test) {
//
//        var context = {};
//
//        var node = {
//            op: '=',
//            left: {type: 'id', name: 'foo'},
//            right: {type: 'id', name: 'bar'}
//        };
//
//        var result = compiler.handlers["assign"](node, context);
//        test.equal(node.code, '$_foo = $_bar');
//        test.equal(context['$_foo'], 'unknown');
//        test.equal(Object.keys(context).length, 1);
//        test.done();
//    },
//
//    "assign request to id": function (test) {
//
//        var context = {};
//
//        var node = {
//            op: '=',
//            left: {type: 'id', name: 'foo'},
//            right: {type: 'request', to: {type: 'id', name: 'bar'}, message: []}
//        };
//
//        var result = compiler.handlers["assign"](node, context);
//        test.equal(node.code, '$_foo = $_bar()');
//        test.equal(context['$_foo'], 'unknown');
//        test.equal(Object.keys(context).length, 2);
//        test.done();
//    }
//};
//
//module.exports["termination"] = {
//
//    "reply": function (test) {
//
//        var node = {channel: 'reply', message: [
//            {type: 'number', val: 42}
//        ]};
//
//        var result = compiler.handlers["termination"](node);
//
//        test.equal(node.code, "result.resolve(42);\nreturn result.promise");
//        test.done();
//    },
//
//    "fail": function (test) {
//
//        var node = {channel: 'fail', message: [
//            {type: 'number', val: 42}
//        ]};
//
//        var result = compiler.handlers["termination"](node);
//
//        test.equal(node.code, "result.reject(42);\nreturn result.promise");
//        test.done();
//    }
//};
//
//
//module.exports["subscript"] = {
//
//    "basic": function (test) {
//
//        var node = {
//            list: {type: 'id', name: 'foo'},
//            index: {type: 'number', val: 1}
//        };
//
//        var result = compiler.handlers["subscript"](node);
//
//        test.equal(node.code, '$_foo[1]');
//        test.done();
//    }
//};