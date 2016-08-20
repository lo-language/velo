/**
 * Exercises the timing behavior of the runtime.
 *
 * Created by spurcell on 12/5/15.
 */

const Program = require('../../codegen/Program');
const Module = require('../../codegen/Module');
const Q = require('q');
const util = require('util');

module.exports['basics'] = {

    "baseline": function (test) {

        test.expect(2);

        var sourcer = {

            acquire: function (modRef) {
                test.equal(modRef, 'foo');
                return Q(new Module('main is -> {reply "hullo!";};'));
            }
        };

        var program = new Program(sourcer);

        program.include('foo').then(function () {
            return program.run();
        }).then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            }
        ).done();
    },

    "simple sync": function (test) {

        test.expect(1);

        var sourcer = {

            acquire: function (modRef) {
                return Q(new Module(
                    'sayHello is -> {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is -> {\n' +
                    '    reply sayHello();\n};\n'));
            }
        };

        var p = new Program(sourcer);

        p.include("foo").then(function () {
            return p.run();
        }).then(
            function (res) {
                test.equal(res, "hullo!");
                test.done();
            }).done();
    },

    "sync message, default reply": function (test) {

        test.expect(1);

        var sourcer = {

            acquire: function (modRef) {
                return Q(new Module(
                    'sayHello is -> {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is -> {\n' +
                    '    sayHello();\n};\n'));
            }
        };

        var p = new Program(sourcer);

        p.include("foo").then(function () {
            return p.run();
        }).then(
            function (res) {
                test.equal(res, undefined);
                test.done();
            },
            function () {
                test.fail();
            });
    },

    "sync message, explicit reply": function (test) {

        test.expect(1);

        var sourcer = {

            acquire: function (modRef) {
                return Q(new Module(
                    'sayHello is -> {\n' +
                    '    reply "hullo!";\n};\n' +
                    'main is -> {\n' +
                    '    sayHello();\n' +
                    '    reply "howdy!";\n};\n'));
            }
        };

        var p = new Program(sourcer);

        p.include("foo").then(function () {
            return p.run();
        }).then(
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

        var sourcer = {

            acquire: function (modRef) {
                return Q(new Module(
                    'main is -> (write) {\n' +
                    '@write("hi there!");\n};\n'));
            }
        };

        var p = new Program(sourcer);

        p.include("foo").then(function () {
            return p.run([write]);
        }).then(
            function (res) {
                setImmediate(test.done.bind(test));
            }).done();
    }
};
