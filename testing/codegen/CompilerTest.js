/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var compiler = require('../../codegen/Compiler');

module.exports["assignment"] = {

    "assign literal to id": function (test) {

        var context = {};

        var node = {
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'number', val: '57'}
        };

        var result = compiler.handlers["assign"](node, context);
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
        test.equal(Object.keys(context).length, 0);
        test.done();
    },

    "assign var to id": function (test) {

        var context = {};

        var node = {
            op: '=',
            left: {type: 'id', name: 'foo'},
            right: {type: 'id', val: 'bar'}
        };

        var result = compiler.handlers["assign"](node, context);
        test.equal(context['$_foo'], 'unknown');
        test.equal(Object.keys(context).length, 1);
        test.done();
    },
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