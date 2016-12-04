/**
 * Created by: spurcell
 * 4/3/15
 */

"use strict";

const Program = require('../../codegen/Program');
const Lo = require('../../constructs');
const util = require('util');
const Q = require('q');

module.exports["basics"] = {

    "constructor": function (test) {

        test.expect(1);

        var mod = {
            load: function () {

                test.ok(true);

                return {
                    $main: "snarf"
                };
            }
        };

        var program = new Program(mod, {});

        test.done();
    },

    "loadModule hits cache first": function (test) {

        var exports = {
            $main: "snarf"
        };

        var mod = {
            load: function () {

                return exports;
            }
        };

        var program = new Program(mod, {
            acquire: function () {

                // shouldn't get here!
                test.fail();
                return Q();
            }
        });

        program.exports["math"] = exports;

        program.loadModule("math").then(
            function (exported) {
                test.equal(exported, exports);
                test.done();
            }
        ).done();
    },

    "loadModule loads and caches": function (test) {

        test.expect(3);

        var exports = {
            $main: "snarf"
        };

        var mod = {

            load: function () {
                return exports;
            },

            loadDeps: function () {
                return Q();
            }
        };

        var program = new Program(mod, {
            acquire: function (ref) {

                test.equal(ref, 'math');
                return Q(mod);
            }
        });

        program.loadModule("math").then(
            function (exported) {

                test.equal(exported, exports);
                test.equal(program.exports["math"], exports);
                test.done();
            }
        ).done();
    },

    // "load": function (test) {
    //
    //     var sourcer = new Sourcer('testing/programs');
    //
    //     sourcer.acquire("fail").then(
    //         function (main) {
    //
    //             // console.log(util.inspect(main.getAst(), {depth: null}));
    //
    //             var program = new Program(main);
    //
    //             console.log(main.compile().renderJs());
    //
    //             return program.run([{
    //                 ok: function (task) {
    //
    //                 }
    //             }]);
    //         }
    //     ).then(
    //         function (res) {
    //
    //             console.log(res);
    //
    //             test.done();
    //         }
    //     ).done();
    // }
};
