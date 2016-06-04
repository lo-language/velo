/**
 * Created by: spurcell
 * 12/23/14
 */

"use strict";

var Compiler = require('../../../codegen/Compiler');
var Context = require('../../../codegen/Context');
var Module = require('../../../codegen/Module');
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

        test.equal(new Context().compile(node), '$foo');
        test.done();
    },

    "constant": function (test) {

        var node = {type: 'id', name: 'foo'};

        var context = new Context();

        context.define('foo', "42");

        test.equal(context.compile(node), '42');
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

        test.equal(context.compile(node), 'M0.foo');
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

        test.equal(context.compile(node), 'M0.foo');
        test.done();
    }
};
