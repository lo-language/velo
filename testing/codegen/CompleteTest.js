/**
 * Created by: spurcell
 * 2/15/15
 */

"use strict";

var Compiler = require('../../codegen/Compiler');
var Complete = require('../../codegen/Complete');
var Scope = require('../../codegen/Scope');


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
                {type: 'number', val: '42'}
            ]};

        var result = this.compiler.compile(node);

        test.equal(result.render(), '$_foo($_foo,[42])');
        test.done();
    },

    "with nested requests": function (test) {

        var node = {
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
            }]};

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.render(),
            'Q.spread([$_foo($_foo,[]),$_bar($_bar,[])], function (tmp_0,tmp_1) {\n$_baz($_baz,[(tmp_0 - tmp_1)]);\n}, result.reject);');
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
                }]}]};

        // patch sub nodes?

        var result = this.compiler.compile(node);

        test.equal(result.render(),
            'Q.spread([$_foo($_foo,[]),$_bar($_bar,[])], function (tmp_0,tmp_1) {\nQ.spread([$_baz($_baz,[(tmp_0 - tmp_1)])], function (tmp_0) {\n$_quux($_quux,[tmp_0]);\n}, result.reject);\n}, result.reject);');
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

        var result = this.compiler.compile(node);

        test.equal(result.render(), '$_foo($_foo,[])');
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

        test.equal(result.render(), '$_foo($_foo,[42])');
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

        test.equal(result.render(), "$_foo($_foo,[42,'hi there'])");
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

        test.equal(result.render(), "Q.spread([$_foo($_foo,[]),$_bar($_bar,[])], function (tmp_0,tmp_1) {\n$_baz($_baz,[tmp_0,tmp_1]);\n}, result.reject);");
        test.done();
    }
}

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

        test.equal(result.render(), '(1 * 2)');
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

        test.equal(result.render(), 'Q.spread([$_foo($_foo,[])], function (tmp_0) {\n(1 * tmp_0);\n}, result.reject);');
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

        test.equal(result.render(), 'Q.spread([$_foo($_foo,[]),$_bar($_bar,[])], function (tmp_0,tmp_1) {\n(tmp_0 * tmp_1);\n}, result.reject);');
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

        test.equal(result.render(), '((1 && 2) || 3)');
        test.done();
    }
};

module.exports["identifiers"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "ready value": function (test) {

        var node = {type: 'id', name: 'foo'};

        var scope = new Scope();

        scope.define('foo', true);

        var result = this.compiler.compile(node);

        test.equal(result, '$_foo');
        test.done();
    }
};

module.exports["literals"] = {

    "setUp": function (cb) {
        this.compiler = new Compiler();
        cb();
    },

    "boolean": function (test) {

        var node = {type: 'boolean', val: true};

        var result = this.compiler.compile(node);

        test.equal(result, 'true');
        test.done();
    },

    "number": function (test) {

        var node = {type: 'number', val: 42};

        var result = this.compiler.compile(node);

        test.equal(result, '42');
        test.done();
    },

    "string": function (test) {

        var node = {type: 'string', val: "turanga leela"};

        var result = this.compiler.compile(node);

        test.equal(result, "'turanga leela'");
        test.done();
    }
};

//module.exports["basics"] = {
//
//    "setUp": function (cb) {
//        this.compiler = new Compiler();
//        cb();
//    },
//
//    "receive": function (test) {
//
//        var node =
//            { type: 'stmt_list',
//                head:
//                { type: 'receive',
//                    names: [ 'args', 'io', 'sys' ] },
//                tail:
//                { type: 'request',
//                    to: { type: 'id', name: 'createPawn' },
//                    args: [] } };
//
//        var scope = new Scope();
//
//        var result = this.compiler.compile(node, scope);
//
//        console.log(result.renderStmt());
//
//        test.done();
//    },
//
//    "complete": function (test) {
//
//        var node =
//        { type: 'stmt_list',
//            head:
//            { type: 'complete',
//                promises: [{ type: 'id', name: 'zebu' }] },
//            tail:
//            { type: 'request',
//                to: { type: 'id', name: 'createPawn' },
//                args: [] } };
//
//        var scope = new Scope();
//
//        var result = this.compiler.compile(node, scope);
//
//        console.log(result.renderStmt());
//
//        test.done();
//    }
//};