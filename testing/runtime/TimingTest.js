/**
 * Exercises the timing behavior of the runtime.
 *
 * Created by spurcell on 12/5/15.
 */

const Module = require('../../codegen/Module');
const Loader = require('.././Loader');
const util = require('util');

module.exports['basics'] = {

    "baseline": function (test) {

        test.expect(1);

        var module = new Module('x is -> {reply "hullo!";};').compile();
        var loader = new Loader(module);

        loader.run().then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            },
            function () {
                test.fail();
            });
    },

    // "simple sync": function (test) {
    //
    //     test.expect(1);
    //
    //     var mod = new Module(
    //         'sayHello = -> {\n' +
    //         '    reply "hullo!";\n};\n' +
    //         'reply sayHello();\n');
    //
    //     var service = mod.makeService();
    //
    //     Task.sendRootRequest(service, null,
    //         function (res) {
    //             test.equal(res, "hullo!");
    //             test.done();
    //         },
    //         function () {
    //             test.fail();
    //         });
    // },
    //
    // "sync message, default reply": function (test) {
    //
    //     var mod = new Module(
    //         'sayHello = -> {\n' +
    //         '    reply "hullo!";\n};\n' +
    //         'sayHello();\n');
    //
    //     var service = mod.makeService();
    //
    //     Task.sendRootRequest(service, null,
    //         function (res) {
    //             test.equal(res, undefined);
    //             test.done();
    //         },
    //         function () {
    //             test.fail();
    //         });
    // },
    //
    // "sync message, explicit reply": function (test) {
    //
    //     test.expect(1);
    //
    //     var mod = new Module(
    //         'sayHello = -> {\n' +
    //         '    reply "hullo!";\n};\n' +
    //         'sayHello(); reply "howdy!";\n');
    //
    //     var service = mod.makeService();
    //
    //     Task.sendRootRequest(service, null,
    //         function (res) {
    //             test.equal(res, "howdy!");
    //             test.done();
    //         },
    //         function () {
    //             test.fail();
    //         });
    // },
    //
    // "simple dispatch": function (test) {
    //
    //     test.expect(1);
    //
    //     var write = function (task) {
    //         test.equal(task.args[0], "hi there!");
    //         task.respond("reply");
    //     };
    //
    //     var mod = new Module(
    //         'receive write;\n' +
    //         '@write("hi there!");\n');
    //
    //     var service = mod.makeService();
    //
    //     Task.sendRootRequest(service, [write],
    //         function (res) {
    //             setImmediate(test.done.bind(test));
    //         },
    //         function () {
    //             test.fail();
    //         });
    // }
};
