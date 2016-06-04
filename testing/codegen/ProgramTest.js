/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var Program = require('../../codegen/Program');
var Module = require('../../codegen/Module');
var Q = require('q');

module.exports["compilation"] = {

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