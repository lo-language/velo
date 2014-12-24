/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var compiler = require('../../codegen/Compiler');
var util = require('util');

module.exports["program"] = {

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

        var result = compiler.handlers["program"](node);

        test.equal(node.code, 'function (args, $_recur, $_reply, $_fail) {\n\n$_foo = $_bar\n}\n');
        test.done();
    }
};

module.exports["op"] = {

    "compiles children": function (test) {

        // should create a context
        // should call compile on each statement

        var node = {
            type: 'op',
            op: '+',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        // patch sub nodes?

        var result = compiler.handlers["op"](node);

        test.equal(node.code, '($_foo + $_bar)');
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
            positive: [{type: 'assign', op: '=', left: {type: 'id', name: 'bar'}, right: {type: 'number', val: 42}}]
        };

        // patch sub nodes?

        var result = compiler.handlers["conditional"](node);

        test.equal(node.code, 'if ($_foo) {\n    $_bar = 42;\n}\n');
        test.done();
    }
};

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var context = {};

        var node = {
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var result = compiler.handlers["assign"](node, context);
        test.equal(node.code, '$_foo = 57');
        test.equal(context['$_foo'], true);
        test.equal(Object.keys(context).length, 1);
        test.done();
    },

    "assign literal to expression": function (test) {

        var context = {};

        var node = {
            op: '=',
            left: {type: 'subscript', list: {type: 'id', name: 'foo'}, index: {type: 'id', name: 'bar'}},
            right: {type: 'number', val: '57'}
        };

        var result = compiler.handlers["assign"](node, context);
        test.equal(node.code, '$_foo[$_bar] = 57');
        test.equal(Object.keys(context).length, 0);
        test.done();
    },

    "assign var to id": function (test) {

        var context = {};

        var node = {
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', name: 'bar'}
        };

        var result = compiler.handlers["assign"](node, context);
        test.equal(node.code, '$_foo = $_bar');
        test.equal(context['$_foo'], 'unknown');
        test.equal(Object.keys(context).length, 1);
        test.done();
    },

    "assign request to id": function (test) {

        var context = {};

        var node = {
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'request', to: {type: 'id', name: 'bar'}, message: []}
        };

        var result = compiler.handlers["assign"](node, context);
        test.equal(node.code, '$_foo = $_bar()');
        test.equal(context['$_foo'], 'unknown');
        test.equal(Object.keys(context).length, 2);
        test.done();
    }
};

module.exports["request"] = {

    "recur": function (test) {

        var node = {to: {type: 'id', name: 'recur'}, message: [
            {type: 'number', val: 42}
        ]};

        var result = compiler.handlers["request"](node);

        test.equal(node.code, "$_recur(42)");
        test.done();
    }
};

module.exports["termination"] = {

    "reply": function (test) {

        var node = {channel: 'reply', message: [
            {type: 'number', val: 42}
        ]};

        var result = compiler.handlers["termination"](node);

        test.equal(node.code, "$_reply(42);\nreturn");
        test.done();
    },

    "fail": function (test) {

        var node = {channel: 'fail', message: [
            {type: 'number', val: 42}
        ]};

        var result = compiler.handlers["termination"](node);

        test.equal(node.code, "$_fail(42);\nreturn");
        test.done();
    }
};

module.exports["identifiers"] = {

    "unknown": function (test) {

        var node = {name: 'foo'};
        var context = {};

        var result = compiler.handlers["id"](node, context);

        test.equal(node.code, '$_foo');
        test.equal(node.status, 'undefined');
        test.done();
    },

    "ready": function (test) {

        var node = {name: 'foo'};
        var context = {$_foo: true};

        var result = compiler.handlers["id"](node, context);

        test.equal(node.code, '$_foo');
        test.equal(node.ready, true);
        test.done();
    },

    "unready": function (test) {

        var node = {name: 'foo'};
        var context = {$_foo: false};

        var result = compiler.handlers["id"](node, context);

        test.equal(node.code, '$_foo');
        test.equal(node.ready, false);
        test.done();
    }
};

module.exports["literals"] = {

    "boolean": function (test) {

        var node = {val: true};

        var result = compiler.handlers["boolean"](node);

        test.equal(node.code, true);
        test.equal(node.ready, true);
        test.done();
    },

    "number": function (test) {

        var node = {val: 42};

        var result = compiler.handlers["number"](node);

        test.equal(node.code, "42");
        test.equal(node.ready, true);
        test.done();
    },

    "string": function (test) {

        var node = {val: "turanga leela"};

        var result = compiler.handlers["string"](node);

        test.equal(node.code, "'turanga leela'");
        test.equal(node.ready, true);
        test.done();
    }
};

module.exports["subscript"] = {

    "basic": function (test) {

        var node = {
            list: {type: 'id', name: 'foo'},
            index: {type: 'number', val: 1}
        };

        var result = compiler.handlers["subscript"](node);

        test.equal(node.code, '$_foo[1]');
        test.done();
    }
};