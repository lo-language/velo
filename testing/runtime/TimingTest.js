/**
 * Exercises the timing behavior of the runtime.
 *
 * Created by spurcell on 12/5/15.
 */

const Program = require('../../Program');
const LoModule = require('../../LoModule');
const util = require('util');


module.exports['basics'] = {

    "baseline": function (test) {

        test.expect(1);

        var program = new Program(new LoModule('main').parse('main is () { reply "hullo!"; };'));

        program.run().then(function (result) {
            test.deepEqual(result, ["hullo!"]);
            test.done();
        });
    },

    "simple sync": function (test) {

        test.expect(1);

        var program = new Program(new LoModule('main').parse(
                    'sayHello is () {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is () {\n' +
                    '    reply sayHello();\n};\n'));

        program.run().then(function (result) {
            test.deepEqual(result, ["hullo!"]);
            test.done();
        });
    },

    "sync message, default reply": function (test) {

        test.expect(1);

        var program = new Program(new LoModule('main').parse(
                    'sayHello is () {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is () {\n' +
                    '    sayHello <-;\n};\n'));

        program.run().then(function (result) {
            test.deepEqual(result, undefined);
            test.done();
        });
    },

    "sync message, explicit reply": function (test) {

        test.expect(1);

        var program = new Program(new LoModule('main').parse(
                    'sayHello is () {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is () {\n' +
                    '    sayHello <- 4;\n' +
                    '    reply "howdy!";\n};\n'));

        program.run().then(function (result) {
            test.deepEqual(result, ['howdy!']);
            test.done();
        });
    },

    "simple dispatch": function (test) {

        test.expect(1);

        var write = function (args, succ, fail) {
            test.equal(args[0], "hi there!");
            succ();
        };

        var program = new Program(new LoModule('main').parse(
                    'main is (write) {\n' +
                    'write <- "hi there!";\n};\n'));

        program.run([write]).then(function (result) {
            setImmediate(test.done.bind(test));
        });
    }
};
