/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Scope = require('../../codegen/Scope');
var util = require('util');

module.exports["statement lists"] = {

    "independent": function (test) {

        var node = {
            type: "stmt_list",
            head: {
                type: 'assign',
                op: '=',
                left: {type: 'id', name: 'foo'},
                right: {type: 'number', val: '42'}
            },
            tail: {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'bar'},
                    right: {type: 'number', val: '57'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(), '$foo = 42;$bar = 57;');
        test.done();
    },

    "dependent": function (test) {

        var node = {
            type: "stmt_list",
            head: {
                type: "assign",
                op: '=',
                left: {type: 'id', name: 'foo'},
                right: {
                    type: 'request',
                    to: {type: 'id', name: 'bar'},
                    args: [
                        {type: 'number', val: '42'}
                    ]}
            },
            tail: {
                type: "stmt_list",
                head: {
                    type: 'assign',
                    op: '=',
                    left: {type: 'id', name: 'baz'},
                    right: {type: 'number', val: '57'}
                },
                tail: null
            }
        };

        test.equal(Compiler.compile(node).render(), 'return $bar($bar,[42]).then(function (x1) {$foo = x1;}).then(function () {$baz = 57;})');
        test.done();
    }
};

module.exports["literals"] = {

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        test.equal(Compiler.compile(node), 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: '42'};

        test.equal(Compiler.compile(node), '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        test.equal(Compiler.compile(node), "'turanga leela'");
        test.done();
    },

    "list": function (test) {

        var node = {
            type: 'list',
            elements:
                [ { type: 'string', val: 'foo' },
                    { type: 'string', val: 'mani' },
                    { type: 'string', val: 'padme' },
                    { type: 'string', val: 'hum' } ] };

        test.equal(Compiler.compile(node).render(), "['foo','mani','padme','hum']");
        test.done();
    },

    "set": function (test) {

        var node = { type: 'set',
            members:
                [ { type: 'dyad',
                    key: { type: 'symbol', name: 'zaphod' },
                    value: { type: 'boolean', val: true } },
                    { type: 'dyad',
                        key: { type: 'symbol', name: 'ford' },
                        value: { type: 'boolean', val: true } },
                    { type: 'dyad',
                        key: { type: 'symbol', name: 'arthur' },
                        value: { type: 'boolean', val: true } },
                    { type: 'dyad',
                        key: { type: 'symbol', name: 'ford' },
                        value: { type: 'boolean', val: true } } ] };

        test.equal(Compiler.compile(node).render(), "{'<zaphod>':true,'<ford>':true,'<arthur>':true,'<ford>':true}");
        test.done();
    }
};

module.exports["identifiers"] = {

    "symbol": function (test) {

        var node = {type: 'symbol', name: 'cymbal'};

        test.equal(Compiler.compile(node), "'<cymbal>'");
        test.done();
    },

//    "undefined": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        var result = Compiler.compile(node);
//
//        test.throws(result.getExpr, Error, "undefined value");
//        test.done();
//    },

    "ready value": function (test) {

        var node = {type: 'id', name: 'foo'};

        var scope = new Scope();

        scope.define('foo', true);

        test.equal(Compiler.compile(node), '$foo');
        test.done();
    },

//    "defined promise": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        Compiler.context.definePromise('foo');
//
//        var result = Compiler.compile(node);
//
//        test.deepEqual(result.renderExpr(), '$val_foo');
//        test.done();
//    }
};

module.exports["request"] = {

    "no args": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: []
        };

        test.equal(Compiler.compile(node).render(), '$foo($foo,[])');
        test.done();
    },

    "one arg": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'}
            ]
        };

        test.equal(Compiler.compile(node).render(), '$foo($foo,[42])');
        test.done();
    },

    "two args": function (test) {

        var node = {
            type: 'request',
            to: {type: 'id', name: 'foo'},
            args: [
                {type: 'number', val: '42'},
                {type: 'string', val: 'hi there'}
            ]
        };

        test.equal(Compiler.compile(node).render(), "$foo($foo,[42,'hi there'])");
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

        test.equal(Compiler.compile(node).render(), "Q.spread([$foo($foo,[]),$bar($bar,[])], function (x1, x2) {return $baz($baz,[x1,x2]);})");
        test.done();
    }
};

module.exports["op"] = {

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

        test.equal(Compiler.compile(node).render(), '(1 * 2)');
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

        test.equal(Compiler.compile(node).render(), '((1 && 2) || 3)');
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

        test.equal(Compiler.compile(node).render(), "function (left, right) {if (Array.isArray(left) || Array.isArray(right)) {return left.concat(right);} else return left + right;}($foo,$bar)");
        test.done();
    },

    "in operator": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'in',
            left: { type: 'string', val: 'trillian' },
            right: { type: 'id', name: 'dudes' } };

        // patch sub nodes?

        test.equal(Compiler.compile(node).render(), "function (item, collection) {if (Array.isArray(collection)) return collection.indexOf(item) >= 0;else if (typeof val === 'object') return collection.hasOwnProperty(item);}('trillian',$dudes)");
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

        test.equal(Compiler.compile(node).render(), '$foo($foo,[42]);');
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

        test.equal(Compiler.compile(node).render(),
            'Q.spread([$foo($foo,[]),$bar($bar,[])], function (x1, x2) {return (x1 - x2);}).then(function (x1) {return $baz($baz,[x1]);});');
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

        test.equal(Compiler.compile(node).render(),
            'Q.spread([$foo($foo,[]),$bar($bar,[])], function (x1, x2) {return (x1 - x2);}).then(function (x1) {return $baz($baz,[x1]);}).then(function (x1) {return $quux($quux,[x1]);});');
        test.done();
    }
};

module.exports["receive"] = {

    "generates js statements": function (test) {

        var node = {
            type: 'receive',
            names: ['foo', 'mani', 'padme', 'hum']
        };

        test.equal(Compiler.compile(node).render(), 'var $foo = args.shift(),\n$mani = args.shift(),\n$padme = args.shift(),\n$hum = args.shift();');
        test.done();
    }
};

module.exports["cardinality"] = {

    "generates js expression": function (test) {

        var node = {
            type: 'cardinality',
            operand: {type: 'id', name: 'foo'}
        };

        test.equal(Compiler.compile(node).render(), "function (val) {if (typeof val === 'string') return val.length;else if (Array.isArray(val)) return val.length;else if (typeof val === 'object') return Object.keys(val).length;}($foo)");
        test.done();
    }
};

module.exports["complement"] = {

    "generates js expression": function (test) {

        var node = {
            type: 'complement',
            operand: {type: 'id', name: 'foo'}
        };

        test.equal(Compiler.compile(node).render(), "!$foo");
        test.done();
    }
};

module.exports["conditional"] = {

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

        test.equal(Compiler.compile(node).render(), 'if ($foo) {\n$bar = 42;\n}');
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

        test.equal(Compiler.compile(node).render(), 'if ($foo) {\n$bar = 42;\n}\nelse {\n$bar = 32;\n}');
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

        test.equal(Compiler.compile(node).render(),
            'if ($foo) {\n$bar = 42;\n}\nelse {\nif ($bar) {\n$bar = 32;\n}\nelse {\n$baz = 82;\n}\n}');
        test.done();
    }
};

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var node = {
            type: 'assign',
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var scope = new Scope();
        var result = Compiler.compile(node, scope);

        test.equal(Compiler.compile(node).render(), '$foo = 57;');
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

        test.equal(Compiler.compile(node).render(), '$foo[$bar] = 57;');

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

        scope.define('bar', true);

        test.equal(Compiler.compile(node).render(), '$foo = $bar;');
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

        test.equal(Compiler.compile(node).render(), '$bar($bar,[]).then(function (x1) {$foo = x1;})');
        test.done();
    }
};

module.exports["subscript"] = {

    "basic": function (test) {

        var node = {
            type: 'subscript',
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: '1'}
        };

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), '$foo[1]');
        test.done();
    },

    "last element shortcut": function (test) {

        var node = {
            type: 'subscript',
            list: { type: 'id', name: 'foo' },
            index: undefined };

        var scope = new Scope();

        test.equal(Compiler.compile(node).render(), '$foo[$foo.length - 1]');
        test.done();
    }
};

module.exports["sequence"] = {

    "basic": function (test) {

        var node = {
            type: 'sequence',
            first: {type: 'number', val: '2'},
            last: {type: 'id', name: 'n'}
        };

        test.equal(Compiler.compile(node).render(), 'function (first, last, action) {\nfor (var num = first; num <= last; num++) { action(num); }}.bind(null,2,$n)');
        test.done();
    }
};

module.exports["procedure"] = {

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
                        right: {
                            type: 'request',
                            to: {type: 'id', name: 'bar'},
                            args: [
                                {type: 'number', val: '42'}
                            ]} },
                tail: null}
            }
        };

        var obj = Compiler.compile(node);

        // important! - procedures are never async objects, regardless of whether they contain async statements
        test.equal(obj.isAsync(), false);
        test.equal(obj.render(),
            "function ($recur, args) {\n\n    var $next = args.shift();$bar($bar,[42]).then(function (x1) {$result *= x1;})}");
        test.done();
    }
};

module.exports["connection"] = {

    "basic": function (test) {

        var node = {
            type: 'connection',
            connector: '>>',
            source: {type: 'id', name: 'foo'},
            sink: {type: 'id', name: 'bar'}
        };

        test.equal(Compiler.compile(node).render(), '$foo.call(null,$bar)');
        test.done();
    }
};

module.exports["result"] = {

    "reply": function (test) {

        var node = {
            type: 'result',
            channel: 'reply',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(Compiler.compile(node).render(), "return Q(42);");
        test.done();
    },

    "fail": function (test) {

        var node = {
            type: 'result',
            channel: 'fail',
            args: [
                {type: 'number', val: '42'}
            ]};

        test.equal(Compiler.compile(node).render(), "return Q.reject(42);");
        test.done();
    }
};