/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var JsStmt = require('../../codegen/JsStmt');
var Scope = require('../../codegen/Scope');
var util = require('util');


module.exports["literals"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        var result = this.compiler.compile(node);

        test.ok(result.isReady());

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: 42};

        var result = this.compiler.compile(node);

        test.ok(result.isReady());

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        var result = this.compiler.compile(node);

        test.ok(result.isReady());

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), "'turanga leela'");
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

        this.compiler.scope.define('foo', true);

        var result = this.compiler.compile(node);

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), '$_foo');
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), 'tmp_0');

        test.equal(result.renderStmt(), '$_foo();');
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), 'tmp_0');

        test.equal(result.renderStmt(), '$_foo(42);');
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), 'tmp_0');

        test.equal(result.renderStmt(), "$_foo(42,'hi there');");
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), 'tmp_0');

        test.equal(result.renderStmt(), "Q.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n    $_baz(tmp_0,tmp_1);\n}, result.reject);");
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), '(1 + 2)');
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), '(1 + tmp_0)');
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), '(tmp_0 + tmp_1)');
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

        test.equal(result.renderStmt(), '$_foo(42);');
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

        test.equal(result.renderStmt(),
            'Q.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n    $_baz((tmp_0 + tmp_1));\n}, result.reject);');
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

        test.equal(result.renderStmt(),
            'Q.spread([$_foo(),$_bar()], function (tmp_0,tmp_1) {\n    Q.spread([$_baz((tmp_0 + tmp_1))], function (tmp_0) {\n    $_quux(tmp_0);\n}, result.reject);\n}, result.reject);');
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
            '$_foo = $_bar;\n');
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

module.exports["cardinality"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "generates js expression": function (test) {

        var node = {
            type: 'cardinality',
            operand: {type: 'id', name: 'foo'}
        };

        var result = this.compiler.compile(node);

        var stmtContext = new JsStmt();

        test.equal(result.renderExpr(stmtContext), "function (val) {if (typeof val === 'string') return val.length;else if (Array.isArray(val)) return val.length;else if (typeof val === 'object') return Object.keys(val).length;}($_foo)");
        test.done();
    }
};

module.exports["complement"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "generates js expression": function (test) {

        var node = {
            type: 'complement',
            operand: {type: 'id', name: 'foo'}
        };

        var result = this.compiler.compile(node);

        var stmtContext = new JsStmt();

        test.equal(result.renderExpr(stmtContext), "!$_foo");
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

        test.equal(result.renderStmt(), 'if ($_foo) {\n    $_bar = 42;\n}');
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

        test.equal(result.renderStmt(), 'if ($_foo) {\n    $_bar = 42;\n}\nelse {\n    $_bar = 32;\n}');
        test.done();
    },

    "with else if": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            positive: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 42}}],
            negative: {
                type: 'conditional',
                predicate: {type: 'id', name: 'bar'},
                positive: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 32}}],
                negative: [{type: 'assign', op: '=', left: {type: 'id', name: 'baz'}, right: {type: 'number', val: 82}}]}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(),
            'if ($_foo) {\n    $_bar = 42;\n}\nelse if ($_bar) {\n    $_bar = 32;\n}\nelse {\n    $_baz = 82;\n}');
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

        test.equal(result.renderStmt(), '$_foo = 57;');
        test.ok(this.compiler.scope.getStatus('foo'));
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

        test.equal(result.renderStmt(), '$_foo[$_bar] = 57;');

        // context isn't modified by this
        test.throws(function () {this.compiler.scope.isReady('foo')});
        test.done();
    },

    "assign ready id to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        this.compiler.scope.define('bar', true);

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), '$_foo = $_bar;');

//        test.ok(this.compiler.scope.getStatus('foo'));
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

        test.equal(result.renderStmt(), 'Q.spread([$_bar()], function (tmp_0) {\n    $_foo = tmp_0;\n}, result.reject);');
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

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), '$_foo[1]');
        test.done();
    }
};

module.exports["sequence"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "basic": function (test) {

        var node = {
            type: 'sequence',
            first: {type: 'number', val: '2'},
            last: {type: 'id', name: 'n'}
        };

        var result = this.compiler.compile(node);

        var stmtContext = new JsStmt();
        test.equal(result.renderExpr(stmtContext), 'tmp_0');

        test.equal(stmtContext.prereqs['tmp_0'].renderExpr(stmtContext),
            'function (first, last, action) {for (var num = first; num <= last; num++) {action(num);}}.bind(null,2,$_n)');
        test.done();
    }
};

module.exports["closure"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "basic": function (test) {

        var node = {
            type: 'closure',
            statements: [
                { type: 'receive', names: [ 'next' ] },
                { type: 'assign',
                    op: '*=',
                    left: { type: 'id', name: 'result' },
                    right: { type: 'id', name: 'next' } } ] };

        var result = this.compiler.compile(node);

        var stmtContext = new JsStmt();

        test.equal(result.renderExpr(stmtContext), 'tmp_0');
        test.equal(stmtContext.prereqs['tmp_0'].renderExpr(stmtContext),
            'function () {var $_next = args[0];\n$_result *= $_next;}');
        test.done();
    }
};

module.exports["connection"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "basic": function (test) {

        var node = {
            type: 'connection',
            connector: '>>',
            source: {type: 'id', name: 'foo'},
            sink: {type: 'id', name: 'bar'}
        };

        var result = this.compiler.compile(node);

        test.equal(result.renderStmt(), '$_foo.call(null,$_bar);');
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

        test.equal(result.renderStmt(), "\nresult.resolve(42);\nreturn result.promise;");
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

        test.equal(result.renderStmt(), "\nresult.reject(42);\nreturn result.promise;");
        test.done();
    }
};