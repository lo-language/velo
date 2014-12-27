/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
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

        test.equal(result.getStatus(), 'ready');
        test.equal(result.renderExpr(), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: 42};

        var result = this.compiler.compile(node);

        test.equal(result.getStatus(), 'ready');
        test.equal(result.renderExpr(), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        var result = this.compiler.compile(node);

        test.equal(result.getStatus(), 'ready');
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

    "ready value": function (test) {

        var node = {type: 'id', name: 'foo'};

        this.compiler.context.define('foo', true);

        var result = this.compiler.compile(node);

        test.equal(result.renderExpr(), '$_foo');
        test.done();
    },

//    "defined promise": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        this.compiler.context.definePromise('foo');
//
//        var result = this.compiler.compile(node);
//
//        test.deepEqual(result.renderExpr(), '$val_foo');
//        test.done();
//    }
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

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo();');
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: 42}
            ]};

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo(42);');
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

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), "$_foo(42,'hi there');");
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

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), 'tmp_0');

        jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), "\nQ.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n    $_baz(tmp_0,tmp_1);\n}, result.reject);");
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

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), '(1 + tmp_0)');
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

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), '(tmp_0 + tmp_1)');
        test.done();
    },

//    "with promises": function (test) {
//
//        // should create a context
//        // should call compile on each statement
//
//        var node = {
//            type: 'op',
//            op: '+',
//            left: {type: 'number', val: '1'},
//            right: {type: 'number', val: '2'}
//        };
//
//        // patch sub nodes?
//
//        compiler.handlers["op"](node);
//
//        test.deepEqual(node.js, {value: '(1 + 2)'});
//        test.done();
//    },

    "catches undefined operands": function (test) {

        var node = {
            type: 'op',
            op: '+',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '2'}
        };

        var self = this;

//        test.throws(function () {
//            self.compiler.compile(node);
//        }, Error, 'left operand not defined');

        node = {
            type: 'op',
            op: '+',
            left: {type: 'number', val: '2'},
            right: {type: 'id', name: 'foo'}
        };

//        test.throws(function () {
//            self.compiler.compile(node);
//        }, Error, 'right operand not defined');

        test.done();
    }
};

module.exports["statements"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "request with one arg": function (test) {

        var node = {
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: 42}
                ]};

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo(42);');
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
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
                }]};

        // patch sub nodes?

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext),
            '\nQ.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n    $_baz((tmp_0 + tmp_1));\n}, result.reject);');
        test.done();
    },

    "several nested requests": function (test) {

        var node = {
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
                }]}]};

        // patch sub nodes?

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext),
            '\nQ.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n    \nQ.spread([$_baz((tmp_0 + tmp_1))], function (tmp_0) {\n    $_quux(tmp_0);\n}, result.reject);\n}, result.reject);');
        test.done();
    }
};

module.exports["program"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "compiles all statements": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'program',
            statements: [
                {type: 'assign', op: '=', left: {type: 'id', name: 'foo'}, right: {type: 'id', name: 'bar'}}
            ]
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.renderBody(),
            'var args = Array.prototype.slice.call(arguments, 2);\nvar result = Q.defer();\n$_foo = $_bar;\n\nreturn result.promise;\n');
        test.done();
    }
};

module.exports["receive"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "generates js statements": function (test) {

        var node = {
            type: 'receive',
            names: ['foo', 'mani', 'padme', 'hum']
        };

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), 'var $_foo = args[0],\n$_mani = args[1],\n$_padme = args[2],\n$_hum = args[3];');
        test.done();
    }
};

module.exports["conditional"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "positive only": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            positive: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 42}}]
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), '\nif ($_foo) {\n    $_bar = 42;\n}');
        test.done();
    },

    "positive and negative blocks": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            positive: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 42}}],
            negative: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 32}}]
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), '\nif ($_foo) {\n    $_bar = 42;\n}\nelse {\n    $_bar = 32;\n}');
        test.done();
    }
};

module.exports["assignment"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "assign literal to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var result = this.compiler.compile(node);
        var jsContext = new JsContext();
        test.throws(function () {result.renderExpr(jsContext);});
        test.equal(result.renderStmt(jsContext), '$_foo = 57;');
        test.equal(this.compiler.context.getStatus('foo'), 'ready');
        test.done();
    },

    "assign literal to expression": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var result = this.compiler.compile(node);
        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo[$_bar] = 57;');

        // context isn't modified by this
        test.equal(this.compiler.context.getStatus('foo'), undefined);
        test.done();
    },

    "assign ready id to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        this.compiler.context.define('bar', 'ready');

        var result = this.compiler.compile(node);
        var jsContext = new JsContext();
        test.equal(result.renderStmt(jsContext), '$_foo = $_bar;');

        test.equal(this.compiler.context.getStatus('foo'), 'ready');
        test.done();
    },

    "assign request to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'request', to: {type: 'id', name: 'bar'}, args: []}
        };

        var result = this.compiler.compile(node);
        var jsContext = new JsContext();
//        test.equal(result.renderStmt(jsContext), '$_foo = $_bar();');
        test.equal(result.renderStmt(jsContext), '$_foo = tmp_0;');
        test.equal(this.compiler.context.getStatus('foo'), 'promise');
        test.done();
    }
};

module.exports["subscript"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "basic": function (test) {

        var node = {
            type: 'subscript',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: 1}
        };

        var result = this.compiler.compile(node);

        var jsContext = new JsContext();
        test.equal(result.renderExpr(jsContext), '$_foo[1]');
        test.done();
    }
};

module.exports["termination"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "reply": function (test) {

        var node = {
            type: 'termination',
            channel: 'reply',
            args: [
                {type: 'number', val: 42}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), "result.resolve(42);");
        test.done();
    },

    "fail": function (test) {

        var node = {
            type: 'termination',
            channel: 'fail',
            args: [
                {type: 'number', val: 42}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), "result.reject(42);");
        test.done();
    }
};