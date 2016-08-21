/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var Module = require('../../../codegen/Module');
const JS = require('../../../codegen/JsPrimitives');
var util = require('util');

module.exports["identifiers"] = {

//    "undefined usage": function (test) {
//
//        var node = {type: 'id', name: 'foo'};
//
//        var result = Compiler.compile(node);
//
//        test.throws(result.getExpr, Error, "undefined value");
//        test.done();
//    },

    "normal var": function (test) {

        var node = {type: 'id', name: 'foo'};

        test.deepEqual(new Context().compile(node).renderTree(), JS.ID('$foo').renderTree());
        test.done();
    },

    "constant": function (test) {

        var node = {type: 'id', name: 'foo'};

        var context = new Context();

        // define the constant
        context.compile({type: 'constant', name: 'foo', value: {type: 'number', val: '42'}});

        test.deepEqual(context.compile(node).renderTree(), JS.num('42').renderTree());
        test.done();
    },

    "external ID": function (test) {

        var node = {type: 'id', scope: 'HTTP', name: 'foo'};

        var context = new Context({

            resolveExternal: function (name, ref) {
                test.equal(ref, 'HTTP');
                return "M0.foo";
            }
        });

        test.deepEqual(context.compile(node), 'M0.foo');
        test.done();
    },

    "external ID with local counterpart": function (test) {

        // should resolve to external, not local def

        var node = {type: 'id', scope: 'HTTP', name: 'foo'};

        var context = new Context({

            has: function () {
                return false;
            },
            
            resolveExternal: function (name, ref) {
                test.equal(ref, 'HTTP');
                return "M0.foo";
            }
        });

        context.define("foo", 42);

        test.deepEqual(context.compile(node), 'M0.foo');
        test.done();
    }
};
