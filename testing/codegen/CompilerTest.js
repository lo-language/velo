/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Scope = require('../../codegen/Scope');
var Resolver = require('../../codegen/Resolver');
var JsWrapper = require('../../codegen/JsWrapper');
var util = require('util');


//module.exports["statement lists"] = {
//
//    setUp: function (cb) {
//
//        this.compiler = new Compiler();
//        cb();
//    },
//
//    "with continue": function (test) {
//
//        var node = {
//            type: "expr_stmt",
//            expr: {
//                type: 'request',
//                to: {type: 'id', name: 'foo'},
//                args: [
//                    {type: 'number', val: '42'}
//                ]}
//        };
//
//        var result = this.compiler.compile(node);
//
//        test.equal(result.continue(new JsWrapper('snork;')).render(), '$foo($foo,[42]);\nsnork;');
//        test.done();
//    }
//};

module.exports["literals"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        test.equal(this.compiler.compile(node), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: '42'};

        test.equal(this.compiler.compile(node), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        test.equal(this.compiler.compile(node), "'turanga leela'");
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

        var scope = new Scope();

        scope.define('foo', true);

        test.equal(this.compiler.compile(node), '$foo');
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

        test.equal(result.render(new Resolver()), '$foo($foo,[])');
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.render(new Resolver()), '$foo($foo,[42])');
        test.done();
    },

    "two args": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: 'hi there'}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.render(new Resolver()), "$foo($foo,[42,'hi there'])");
        test.done();
    },

    "as statement, with nested requests": function (test) {

        var node = {
            type: 'expr_stmt',
            expr: {
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
            }};

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.render(), "Q.spread([$foo($foo,[]),$bar($bar,[])], function (ph0,ph1) {\n$baz($baz,[ph0,ph1]);\n}, result.reject);");
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
            op: '*',
            left: {type: 'number', val: '1'},
            right: {type: 'number', val: '2'}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(new Resolver(result).render(), '(1 * 2)');
        test.done();
    },

    "with request": function (test) {

        var node = {
            type: 'op',
            op: '*',
            left: {type: 'number', val: '1'},
            right: {
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: []
            }
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(new Resolver(result).render(), 'Q.spread([$foo($foo,[])], function (ph0) {\n(1 * ph0)\n}, result.reject);');
        test.done();
    },

    "with two requests": function (test) {

        var node = {
            type: 'op',
            op: '*',
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

        test.equal(new Resolver(result).render(), 'Q.spread([$foo($foo,[]),$bar($bar,[])], function (ph0,ph1) {\n(ph0 * ph1)\n}, result.reject);');
        test.done();
    },

    "translates and/or": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: 'or',
            left:{
                type: 'op',
                op: 'and',
                left: {type: 'number', val: '1'},
                right: {type: 'number', val: '2'}
            },
            right: {type: 'number', val: '3'}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(new Resolver(result).render(), '((1 && 2) || 3)');
        test.done();
    },

    "addition handles lists": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: '+',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(new Resolver(result).render(), "function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {return left.concat(right);} else return left + right;}($foo,$bar)");
        test.done();
    }

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
};

module.exports["request statements"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "request with one arg": function (test) {

        var node = {
            type: 'expr_stmt',
            expr: {
                type: 'request',
                to: {type: 'id', name: 'foo'},
                args: [
                    {type: 'number', val: '42'}
                ]}
        };

        var result = this.compiler.compile(node);

        test.equal(result.render(), '$foo($foo,[42]);');
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
            type: 'expr_stmt',
            expr: {
                type: 'request',
                to: {type: 'id', name: 'baz'},
                args: [{
                    type: 'op',
                    op: '-',
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
                }]}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.render(),
            'Q.spread([$foo($foo,[]),$bar($bar,[])], function (ph0,ph1) {\n$baz($baz,[(ph0 - ph1)]);\n}, result.reject);');
        test.done();
    },

    "several nested requests": function (test) {

        var node = {
            type: 'expr_stmt',
            expr: {
                type: 'request',
                to: {type: 'id', name: 'quux'},
                args: [{
                    type: 'request',
                    to: {type: 'id', name: 'baz'},
                    args: [{
                        type: 'op',
                        op: '-',
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
                    }]}]}
        };

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.render(),
            'Q.spread([$foo($foo,[]),$bar($bar,[])], function (ph0,ph1) {\nQ.spread([$baz($baz,[(ph0 - ph1)])], function (ph0) {\n$quux($quux,[ph0]);\n}, result.reject);\n}, result.reject);');
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

        var result = this.compiler.compile(node, new Scope());

        test.equal(result.render(), 'var $foo = args.shift(),\n$mani = args.shift(),\n$padme = args.shift(),\n$hum = args.shift();');
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

        test.equal(new Resolver(result).render(), "function (val) {if (typeof val === 'string') return val.length;else if (Array.isArray(val)) return val.length;else if (typeof val === 'object') return Object.keys(val).length;}($foo)");
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

        test.equal(new Resolver(result).render(), "!$foo");
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
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(result.render(), 'if ($foo) {\n$bar = 42;\n}');
//        test.ok(scope.getStatus('bar'));
        test.done();
    },

    "positive and negative blocks": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null},
            otherwise: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '32'}}, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(result.render(), 'if ($foo) {\n$bar = 42;\n}\nelse {\n$bar = 32;\n}');
//        test.ok(scope.getStatus('bar'));
        test.done();
    },

    "with else if": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'conditional',
            predicate: {type: 'id', name: 'foo'},
            consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '42'}}, tail: null},
            otherwise: {type: 'stmt_list', head: {
                type: 'conditional',
                predicate: {type: 'id', name: 'bar'},
                consequent: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: '32'}}, tail: null},
                otherwise: {type: 'stmt_list', head: {type: 'assign', op: '=', left: {type: 'id', name: 'baz'}, right: {type: 'number', val: '82'}}, tail: null},
            }, tail: null}
        };

        // patch sub nodes?

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(result.render(),
            'if ($foo) {\n$bar = 42;\n}\nelse {\nif ($bar) {\n$bar = 32;\n}\nelse {\n$baz = 82;\n}\n}');
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

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(result.render(), '$foo = 57;');
//        test.ok(scope.getStatus('foo'));
        test.done();
    },

    "assign literal to expression": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(result.render(), '$foo[$bar] = 57;');

        // context isn't modified by this
        test.throws(function () {scope.getStatus('foo')});
        test.done();
    },

    "assign ready id to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        scope.define('bar', true);

        test.equal(result.render(), '$foo = $bar;');
        test.done();
    },

    "assign request to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'request', to: {type: 'id', name: 'bar'}, args: []}
        };

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(result.render(), 'Q.spread([$bar($bar,[])], function (ph0) {\n$foo = ph0;\n}, result.reject);');
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
            index: {type: 'number', val: '1'}
        };

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(new Resolver(result).render(), '$foo[1]');
        test.done();
    },

    "last element shortcut": function (test) {

        var node = {
            type: 'subscript',
            list: { type: 'id', name: 'foo' },
            index: undefined };

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(new Resolver(result).render(), '$foo[$foo.length - 1]');
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

        test.equal(new Resolver(result).render(), 'function (first, last, action) {\nfor (var num = first; num <= last; num++) { action(num); }}.bind(null,2,$n)');
        test.done();
    }
};

module.exports["procedure"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "basic": function (test) {

        var node = {
            type: 'procedure',
            body: {
                type: 'stmt_list',
                head:
                    { type: 'receive', names: [ 'next' ] }, tail: { type: 'stmt_list', head:
                    { type: 'assign',
                        op: '*=',
                        left: { type: 'id', name: 'result' },
                        right: { type: 'id', name: 'next' } },
                tail: null}
            }
        };

        var scope = new Scope();
        var result = this.compiler.compile(node, scope);

        test.equal(new Resolver(result).render(),
            "function ($recur, args) {\n\n    var result = Q.defer();\n\n    var $next = args.shift();\n$result *= $next;return result.promise;\n}");
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

        test.equal(new Resolver(result).render(), '$foo.call(null,$bar)');
        test.done();
    }
};

module.exports["result"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "reply": function (test) {

        var node = {
            type: 'result',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.render(), "result.resolve(42);\nreturn result.promise;");
        test.done();
    },

    "fail": function (test) {

        var node = {
            type: 'result',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.render(), "result.reject(42);\nreturn result.promise;");
        test.done();
    }
};