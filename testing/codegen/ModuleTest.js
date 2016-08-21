/**
 * Created by: spurcell
 * 12/30/14
 */

"use strict";

const Module = require('../../codegen/Module');
const Program = require('../../codegen/Program');
const JS = require('../../codegen/JsPrimitives');
const JsStmt = require('../../codegen/JsStmt');
const Q = require('q');

module.exports["basics"] = {

    "getExports": function (test) {

        var module = new Module();

        test.deepEqual(module.getExports(), []);

        module.define("foo", "$foo", true);
        test.deepEqual(module.getExports(), { "foo": '$foo' });

        module.define("bar", "$bar", true);
        test.deepEqual(module.getExports(), { "foo": '$foo', "bar": '$bar' });

        test.done();
    },

    "resolve to global": function (test) {

        var module = new Module();

        module.id = "M0";

        module.define("pi", 3);
        module.define("foo", "$foo", true);

        test.equal(module.resolveToGlobal("pi"), 3);
        test.equal(module.resolveToGlobal("foo"), "M0.foo");

        test.done();
    },

    "resolve success": function (test) {

        var module = new Module();

        module.define("pi", 3);
        module.define("foo", "$foo", true);

        test.equal(module.resolve("pi"), 3);
        test.equal(module.resolve("foo"), "$foo");

        test.done();
    },

    "resolve failure": function (test) {

        var module = new Module();

        try {
            test.equal(module.resolve("pi"), 3);
            test.fail();
        }
        catch (err) {
            test.equal(err.message, "pi is not a defined constant");
            test.done();
        }
    },

    "declare fails": function (test) {

        var module = new Module();

        test.deepEqual(module.getExports(), []);

        try {
            module.declare("foo");
            test.fail();
        }
        catch (err) {
            test.equal(err.message.indexOf("can't declare a variable"), 0);
            test.done();
        }
    },

    "createInner": function (test) {

        var module = new Module();

        var child = module.createInner();

        test.equal(child.parent, module);
        test.done();
    }
};

module.exports["resolveExternal"] = {

    "failure": function (test) {

        var mod = new Module("foo is 47;");

        try {
            mod.resolveExternal("PI", "Math");
            test.fail();
        }
        catch (err) {
            test.equal(err.message, "couldn't find module Math when resolving Math:PI");
            test.done();
        }
    },

    "success": function (test) {

        var mod = new Module("foo is 47;");
        var dep = new Module();

        dep.id = "XX";

        dep.define("PI", 3);
        dep.define("cos", "function () {}", true);

        mod.deps["Bar"] = dep;

        test.equal(mod.resolveExternal("PI", "Bar"), 3);
        test.equal(mod.resolveExternal("cos", "Bar"), "XX.cos");
        test.done();
    }
};

module.exports["compile with no deps"] = {

    "compilation with no services": function (test) {

        var mod = new Module("foo is 42;");

        mod.compileSelf().then(function (result) {

            test.deepEqual(result.renderTree(),
                [ 'function',
                    null,
                    [],
                    [ 'stmtList',
                        [ 'use-strict' ],
                        [ 'stmtList', [ 'return', [ 'objLiteral', [] ] ] ] ] ]);

            test.done();
        }).done();
    },

    "compilation with one service": function (test) {

        var mod = new Module("foo is -> {x = 42;};");

        mod.compileSelf().then(function (result) {

            test.deepEqual(result.renderTree(), [ 'function',
                null,
                [],
                [ 'stmtList',
                    [ 'use-strict' ],
                    [ 'stmtList',
                        [ 'const',
                            '$foo',
                            [ 'function',
                                null,
                                [ 'task' ],
                                [ 'stmtList',
                                    [ 'var', '$x' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$x' ], [ 'num', '42' ] ] ] ] ] ] ],
                        [ 'stmtList',
                            [ 'return',
                                [ 'objLiteral', [ [ [ 'string', 'foo' ], [ 'id', '$foo' ] ] ] ] ] ] ] ] ]);

            // test.equal(result.renderJs(),
            //     "function () {\n\n'use strict';\n\nconst $foo = " +
            //     "function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\nreturn {\"foo\": \$foo\};\n}");

            test.done();
        }).done();
    },

    "compilation with two services": function (test) {

        var mod = new Module("foo is -> {x = 42;};\n\nbar is -> {a = 57;};\n");

        mod.compileSelf().then(function (result) {

            test.deepEqual(result.renderTree(), [ 'function',
                null,
                [],
                [ 'stmtList',
                    [ 'use-strict' ],
                    [ 'stmtList',
                        [ 'const',
                            '$foo',
                            [ 'function',
                                null,
                                [ 'task' ],
                                [ 'stmtList',
                                    [ 'var', '$x' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$x' ], [ 'num', '42' ] ] ] ] ] ] ],
                        [ 'stmtList',
                            [ 'const',
                                '$bar',
                                [ 'function',
                                    null,
                                    [ 'task' ],
                                    [ 'stmtList',
                                        [ 'var', '$a' ],
                                        [ 'stmtList',
                                            [ 'expr-stmt', [ 'assign', [ 'id', '$a' ], [ 'num', '57' ] ] ] ] ] ] ],
                            [ 'stmtList',
                                [ 'return',
                                    [ 'objLiteral',
                                        [ [ [ 'string', 'foo' ], [ 'id', '$foo' ] ],
                                            [ [ 'string', 'bar' ], [ 'id', '$bar' ] ] ] ] ] ] ] ] ] ]);

            // test.equal(result.renderJs(),
            //     "function () {\n\n'use strict';\n\n" +
            //     "const $foo = function (task) {var $recur = task.service;\nvar $x;\n\n\n$x = 42;\n};\n\n" +
            //     "const $bar = function (task) {var $recur = task.service;\nvar $a;\n\n\n$a = 57;\n};\n\n" +
            //     'return {"foo": $foo, "bar": $bar};\n}');

            test.done();
        }).done();
    }
};

module.exports["compile with deps"] = {

    "compilation with no services": function (test) {

        test.expect(2);


        var mod = new Module("references:\n\nTrig <Math/Trig>\nfoo is 42;");

        var program = {
            include: function (modRef) {

                test.equal(modRef, "Math/Trig");
                return Q();
            }
        };

        mod.compileSelf(program).then(function (result) {

            test.deepEqual(result.renderTree(),
                [ 'function',
                null,
                [],
                [ 'stmtList',
                    [ 'use-strict' ],
                    [ 'stmtList', [ 'return', [ 'objLiteral', [] ] ] ] ] ]);

            // test.equal(result.renderJs(),
            //     "function () {\n\n'use strict';\n\n\n\nreturn {};\n}");

            test.done();
        }).done();
    },

    "compilation with one service": function (test) {

        test.expect(2);

        var mod = new Module("references:\n\nTrig <Math/Trig>\nfoo is -> {x = 42;};");

        var program = {
            include: function (modRef) {

                test.equal(modRef, "Math/Trig");
                return Q();
            }
        };

        mod.compileSelf(program).then(function (result) {

            test.deepEqual(result.renderTree(),
                [ 'function',
                null,
                [],
                [ 'stmtList',
                    [ 'use-strict' ],
                    [ 'stmtList',
                        [ 'const',
                            '$foo',
                            [ 'function',
                                null,
                                [ 'task' ],
                                [ 'stmtList',
                                    [ 'var', '$x' ],
                                    [ 'stmtList',
                                        [ 'expr-stmt', [ 'assign', [ 'id', '$x' ], [ 'num', '42' ] ] ] ] ] ] ],
                        [ 'stmtList',
                            [ 'return',
                                [ 'objLiteral', [ [ [ 'string', 'foo' ], [ 'id', '$foo' ] ] ] ] ] ] ] ] ]);

            // test.equal(result.renderJs(),
            //     "function () {\n\n'use strict';\n\n" +
            //     "const $foo = function (task) {var $recur = task.service;\n" +
            //     "var $x;\n\n\n$x = 42;\n};\n\n" +
            //     'return {"foo": $foo};\n}');

            test.done();
        }).done();
    }
};
