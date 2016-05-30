/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

var Module = require('../../codegen/Module');
var Q = require('q');


module.exports["resolveExternal"] = {

    "failure": function (test) {

        var mod = new Module("foo is 47;");

        try {
            mod.resolve("PI", "Math");
            test.fail();
        }
        catch (err) {
            test.equal(err.message, "couldn't resolve Math:PI");
            test.done();
        }
    },

    "success": function (test) {

        test.expect(2);

        var mod = new Module("foo is 47;");

        mod.deps["Bar"] = {
            resolve: function (name) {
                test.equal(name, "PI");
                return 3;
            }
        };

        test.equal(mod.resolve("PI", "Bar"), 3);
        test.done();
    }
};

module.exports["compile with no deps"] = {

    "compilation with no services": function (test) {

        var mod = new Module("foo is 42;");

        mod.compileSelf().then(function (result) {

            test.equal(result.render(),
                "function () {\n\n'use strict';\n\n\n\nreturn [];\n}");

            test.done();
        }).done();
    },

    "compilation with one service": function (test) {

        var mod = new Module("foo is -> {x = 42;};");

        mod.compileSelf().then(function (result) {

            test.equal(result.render(),
                "function () {\n\n'use strict';\n\nconst $foo = " +
                "function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\nreturn [$foo];\n}");

            test.done();
        }).done();
    },

    "compilation with two services": function (test) {

        var mod = new Module("foo is -> {x = 42;};\n\nbar is -> {a = 57;};\n");

        mod.compileSelf().then(function (result) {

            test.equal(result.render(),
                "function () {\n\n'use strict';\n\n" +
                "const $foo = function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\n" +
                "const $bar = function (task) {var $recur = task.service;\nvar $a;\n\n\n$a = 57;\n};\n\n" +
                "return [$foo, $bar];\n}");

            test.done();
        }).done();
    }
};

module.exports["with deps"] = {

    "compilation with no services": function (test) {

        test.expect(2);

        var mod = new Module("references:\n\nTrig <Math/Trig>\nfoo is 42;");

        var program = {
            compile: function (modRef) {

                test.equal(modRef, "Math/Trig");
                return Q();
            }
        };

        mod.compileSelf(program).then(function (result) {

            test.equal(result.render(),
                "function () {\n\n'use strict';\n\n\n\nreturn [];\n}");

            test.done();
        }).done();
    },

    // "compilation with one service": function (test) {
    //
    //     var mod = new Module("foo is -> {x = 42;};");
    //
    //     mod.compile().then(function (result) {
    //
    //         test.equal(result.render(),
    //             "function () {\n\n'use strict';\n\nconst $foo = " +
    //             "function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\nreturn [$foo];\n}");
    //
    //         test.done();
    //     }).done();
    // },
    //
    // "compilation with two services": function (test) {
    //
    //     var mod = new Module("foo is -> {x = 42;};\n\nbar is -> {a = 57;};\n");
    //
    //     mod.compile().then(function (result) {
    //
    //         test.equal(result.render(),
    //             "function () {\n\n'use strict';\n\n" +
    //             "const $foo = function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\n" +
    //             "const $bar = function (task) {var $recur = task.service;\nvar $a;\n\n\n$a = 57;\n};\n\n" +
    //             "return [$foo, $bar];\n}");
    //
    //         test.done();
    //     }).done();
    // }
};
