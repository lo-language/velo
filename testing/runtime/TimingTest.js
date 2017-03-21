/**
 * Exercises the timing behavior of the runtime.
 *
 * Created by spurcell on 12/5/15.
 */

const Program = require('../../pipeline/LoadAndGo');
const MockModuleSpace = require('../MockModuleSpace');
const util = require('util');


module.exports['basics'] = {

    "baseline": function (test) {

        test.expect(1);

        var modSpace = new MockModuleSpace('main is <-> {reply "hullo!";};');

        var program = new Program(modSpace, 'ROOT');

        program.run().then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            }
        ).done();
    },

    "simple sync": function (test) {

        test.expect(1);

        var modSpace = new MockModuleSpace(
                    'sayHello is <-> {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is <-> {\n' +
                    '    reply sayHello();\n};\n');

        var program = new Program(modSpace, 'ROOT');

        program.run().then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            }).done();
    },

    "sync message, default reply": function (test) {

        test.expect(1);

        var modSpace = new MockModuleSpace(
                    'sayHello is <-> {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is <-> {\n' +
                    '    sayHello();\n};\n');

        var program = new Program(modSpace, 'ROOT');

        program.run().then(
            function (res) {
                test.equal(res, undefined);
                test.done();
            }).done();
    },

    "sync message, explicit reply": function (test) {

        test.expect(1);

        var modSpace = new MockModuleSpace(
                    'sayHello is <-> {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is <-> {\n' +
                    '    sayHello();\n' +
                    '    reply "howdy!";\n};\n');

        var program = new Program(modSpace, 'ROOT');

        program.run().then(
            function (res) {
                test.equal(res, "howdy!");
                test.done();
            },
            function () {
                test.fail();
            });
    },

    "simple dispatch": function (test) {

        test.expect(1);

        var write = function (task) {
            test.equal(task.args[0], "hi there!");
            task.respond("reply");
        };

        var modSpace = new MockModuleSpace(
                    'main is <-> (write) {\n' +
                    '@write("hi there!");\n};\n');

        var program = new Program(modSpace, 'ROOT');

        program.run([write]).then(
            function (res) {
                setImmediate(test.done.bind(test));
            }).done();
    }
};
