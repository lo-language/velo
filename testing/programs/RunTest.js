/**
 * compiles and runs simple programs to test the compiler
 *
 * could alternatively load a bunch of modules in at the top and then just hit them in tests
 * or have sets of expected input -> expected output mappings and automate it
 *
 * Created by: spurcell
 * 12/24/14
 */

"use strict";

const Harness = require('../Harness');
const util = require('util');

module.exports['iteration'] = {

    // test that uncaught errors are properly escalated out of the program

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'iteration');
        cb();
    },

    "stack doesn't overflow": function (test) {

        //console.log(this.harness.getJs().render(true));
        this.harness.testSuccess(test, [100000], 100000);
    }
};

//module.exports['acquire'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(__dirname, 'acquire');
//        cb();
//    },
//
//    'success': function (test) {
//
////        console.log(util.inspect(this.harness.module.parse(), {depth: null, colors: true}));
//        this.harness.testSuccess(test, [5, loader.acquire], 120);
//    }
//};

module.exports['io'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'helloWorld');
        cb();
    },

    'success': function (test) {

        test.expect(1);

        var io = {
            stdout: {
                write: function (task) {
                    test.ok(true);
                    task.respond("reply");
                }
            }
        };

        this.harness.testSuccess(test, [[], io, {}]);
    }
};

module.exports['reply handling'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'replyHandling');
        cb();
    },

    'success': function (test) {

        test.expect(1);

        // both functions just reply immediately
        // todo add a test that does this experiment within a reply handler

        this.harness.run([

            function (task) {
                task.respond("reply");
            },

            function (task) {
                task.respond("reply", 42);
            }
        ]).then(
            function (res) {
                test.equal(res, 42);
                test.done();
            });
    }
};

module.exports['conditionals'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'conditionals');
        cb();
    },

    'neg': function (test) {
        this.harness.testSuccess(test, [-1], 'negative');
    },

    'zero': function (test) {
        this.harness.testSuccess(test, [0], 'zero!');
    },

    'pos': function (test) {
        this.harness.testSuccess(test, [1], 'positive');
    }
};

module.exports['factorial'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'factorial');
        cb();
    },

    'success': function (test) {
        //console.log(this.harness.getJs());
        this.harness.testSuccess(test, [10], 3628800);
    },

    'failure': function (test) {
        this.harness.testFailure(test, [-1], 'I pity the fool!');
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'fibonacci');
        cb();
    },

    'success': function (test) {
        this.harness.testSuccess(test, [10], 55);
    },

    'failure': function (test) {
        this.harness.testFailure(test, [-1], 'Whatsamatta, you?');
    }
};

module.exports['collections'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'collections');
        cb();
    },

    'all': function (test) {

        this.harness.testSuccess(test);
    }
};

module.exports['procedure'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'procedure');
        cb();
    },

    'success': function (test) {

        this.harness.testSuccess(test, [], 60);
    }
};

module.exports['conditional in loop'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'condInLoop');
        cb();
    },

    'success': function (test) {

        var logMessages = [];

        this.harness.testSuccess(test, [
            function (task) {

                logMessages.push(task.args[0]);
                task.respond("reply");
            }
        ], 5).then(function () {

            test.deepEqual(logMessages, [ 'howdy!\n', 'howdy!\n', 'hello hello!\n', 'ok.\n', 'ok.\n' ]);
        });
    }
};

//module.exports['recovery'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(loader, 'recovery');
//
//        this.harness.setUp(cb);
//    },
//
//    'success': function (test) {
//
//        console.log(util.inspect(this.harness.parse(), {depth: null, colors: true}));
////        console.log(this.harness.getJs().render(true));
//        this.harness.testSuccess(test, [], "oh no!");
//    }
//};

module.exports['factorial2'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'factorial2');
        cb();
    },

    'success': function (test) {

        var io = {
            stdout: {
                write: function (task) {
                    test.equal(task.args[0], '3628800\n');
                    task.respond("reply");
                }
            }
        };

        this.harness.testSuccess(test, [[10], io]);
    }
};

//module.exports['fibonacci2'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(loader, 'fibonacci2');
//
//        this.harness.setUp(cb);
//    },
//
//    'success': function (test) {
//
//        this.harness.testSuccess(test, 10, 55);
//    },
//
//    'failure': function (test) {
//
//        this.harness.testFailure(test, -1, "Whatsamatta, you?");
//    }
//};