/**
 * Exercises the timing behavior of the runtime.
 *
 * Created by spurcell on 12/5/15.
 */

const Module = require('../../runtime/Module');
const util = require('util');

module.exports['basics'] = {

    "baseline": function (test) {

        test.expect(1);

        var mod = new Module('reply "hullo!";');

        mod.run().then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            }
        ).done();
    },

    "simple sync": function (test) {

        test.expect(1);

        var mod = new Module(
            'sayHello = >>:\n' +
            '    reply "hullo!";\n;\n' +
            'reply sayHello();\n');

        mod.run().then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            }
        ).done();
    },

    "sync message, default reply": function (test) {

        var mod = new Module(
            'sayHello = >>:\n' +
            '    reply "hullo!";\n;\n' +
            'sayHello();\n');

        mod.run().then(
            function (res) {
                test.done();
            }
        ).done();
    },

    "sync message, explicit reply": function (test) {

        test.expect(1);

        var mod = new Module(
            'sayHello = >>:\n' +
            '    reply "hullo!";\n;\n' +
            'sayHello(); reply "howdy!";\n');

        mod.run().then(
            function (res) {
                test.equal(res, "howdy!");
                test.done();
            }
        ).done();
    },

    "simple dispatch": function (test) {

        test.expect(1);

        var write = function (task) {
            test.equal(task.args[0], "hi there!");
            task.respond("reply");
        };

        var mod = new Module(
            'receive write;\n' +
            'write ~ "hi there!";\n');

        mod.run([write]).then(
            function (res) {
                setImmediate(test.done.bind(test));
            }
        ).done();
    }
};
