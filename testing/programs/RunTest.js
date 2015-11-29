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

var Loader = require('../../runtime/Loader');
var Harness = require('../Harness');
var util = require('util');

var loader = new Loader(__dirname);

module.exports['iteration'] = {

    // test that uncaught errors are properly escalated out of the program

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'iteration');

        this.harness.setUp(cb);
    },

    "stack doesn't overflow": function (test) {

        //console.log(this.harness.getJs().render(true));
        this.harness.testSuccess(test, [100000], 100000);
    }
};

module.exports['acquire'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'acquire');

        this.harness.setUp(cb);
    },

    'success': function (test) {

//        console.log(util.inspect(this.harness.module.parse(), {depth: null, colors: true}));
        this.harness.testSuccess(test, [5, loader.acquire], 120);
    }
};

module.exports['io'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'helloWorld');

        this.harness.setUp(cb);
    },

    'success': function (test) {

        test.expect(1);

        try {
            this.harness.getJs();
        }
        catch (e) {
            console.error(e.stack);
        }

        this.harness.testSuccess(test, [[], {
            stdout: {
                write: function (task) {
                    console.error("snark");
                    test.ok(true);
                    task.pickupReplies();
                }
            }
        }, {}]);
    }
};

module.exports['reply handling'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'replyHandling');

        this.harness.setUp(cb);
    },

    'success': function (test) {

        test.expect(1);


        try {
            this.harness.getJs();
        }
        catch (e) {
            console.error(e.stack);
        }

        // both functions just reply immediately
        // todo add a test that does this experiment within a reply handler

        this.harness.testSuccess(test, [

            function (task) {
                task.respond("reply");
                task.pickupReplies();
            },

            function (task) {
                task.respond("reply", 42);
                task.pickupReplies();
            }
        ], 42);
    }
};

module.exports['conditionals'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'conditionals');

        this.harness.setUp(cb);
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

        this.harness = new Harness(loader, 'factorial');

        this.harness.setUp(cb);
    },

    'success': function (test) {
        console.log(this.harness.getJs());
        this.harness.testSuccess(test, [10], 3628800);
    },

    'failure': function (test) {
        this.harness.testFailure(test, [-1], 'I pity the fool!');
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'fibonacci');

        this.harness.setUp(cb);
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

        this.harness = new Harness(loader, 'collections');

        this.harness.setUp(cb);
    },

    'all': function (test) {

        this.harness.testSuccess(test);
    }
};

module.exports['procedure'] = {

    "setUp": function (cb) {

        this.harness = new Harness(loader, 'procedure');

        this.harness.setUp(cb);
    },

    'success': function (test) {

        this.harness.testSuccess(test, [], 60);
    }
};

//module.exports['conditional in loop'] = {
//
//    "setUp": function (cb) {
//
//        this.harness = new Harness(loader, 'condInLoop');
//
//        this.harness.setUp(cb);
//    },
//
//    'success': function (test) {
//
//        var logMessages = [];
//
//        this.harness.testSuccess(test, [
//            function (task) {
//
//                logMessages.push(task.args[0]);
//                task.pickupReplies();
//            }
//        ], 5).then(function () {
//
//            test.deepEqual(logMessages, [ 'howdy!\n', 'howdy!\n', 'hello hello!\n', 'ok.\n', 'ok.\n' ]);
//        });
//    }
//};

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

        this.harness = new Harness(loader, 'factorial2');

        this.io = {
            stdout: {
                write: function (task) {
                    task.pickupReplies();
                }
            }
        };

        this.harness.setUp(cb);
    },

    'success': function (test) {

        this.harness.testSuccess(test, [[10], this.io], undefined);
    },

    //'failure': function (test) {
    //
    //    this.harness.testFailure(test, [[-1], this.io]);
    //}
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