/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var Program = require('../../codegen/Program');
var Module = require('../../codegen/Module');
var Q = require('q');

module.exports["include"] = {

    "module with no services": function (test) {

        var module = new Module("foo is 42;");

        var sourcer = {

            acquire: function (ref) {
                test.equal(ref, "Shape");
                return Q(module);
            }
        };

        var p = new Program(sourcer);

        p.include("Shape").then(result => {

            test.equal(result, module);

            test.equal(p.render(), "const M0 = function () {\n\n'use strict';\n\n\n\nreturn {};\n}();");
            test.done();

        }).done();
    },

    "module with one service": function (test) {

        var module = new Module("foo is -> {x = 42;};");

        var sourcer = {

            acquire: function (ref) {
                test.equal(ref, "Shape");
                return Q(module);
            }
        };

        var p = new Program(sourcer);

        p.include("Shape").then(result => {

            test.equal(result, module);

            test.equal(p.render(),
                "const M0 = function () {\n\n'use strict';\n\n" +
                "const $foo = function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\n" +
                'return {"foo": $foo};\n}();');
            test.done();

        }).done();
    }
};

module.exports["run"] = {

    "program with chained modules": function (test) {

        var modules = {
            main: new Module("references:\nfoo <foo>\nmain is -> {x = 42;};"),
            foo: new Module("references:\nbar <bar>\nfoo is -> {x = 42;};"),
            bar: new Module("bar is -> {x = 42;};")
        };

        var sourcer = {

            acquire: function (ref) {
                return Q(modules[ref]);
            }
        };

        var p = new Program(sourcer);

        p.include("main").then(function () {

            // just to make sure loading of main works
            return p.run();

        }).then(function () {
            test.done();
        }).done();
    }
};