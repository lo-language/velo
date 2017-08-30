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
const Task = require('../../runtime/Task');
const util = require('util');


module.exports['set operations'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'set-operations');
        cb();
    },

    'success': function (test) {

        this.harness.run([]).then(
            function (resp) {

                test.deepEqual(resp, [{
                    'fiat': true,
                    'lux': true,
                    'bark': true,
                    'hark': true,
                    'lark': true
                }]);

                test.ok(resp[0].__LO_SET);

                test.done();
            }).done();
    }
};

module.exports['exists'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'exists');
        cb();
    },

    'obj exists': function (test) {

        var log = function (args, succ, fail) {
            succ();
        };

        this.harness.testSuccess(test, [log]);
    },

    'obj not exists': function (test) {

        this.harness.testFailure(test, [], 'no log!');
    }
};


module.exports['nestedLoops'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'nestedLoops');
        cb();
    },

    'success': function (test) {

        var log = function (args, succ, fail) {
            succ();
        };

        // this.harness.dumpModules().then(() => {

            this.harness.testSuccess(test, [log], 9);
        // });
    }
};


module.exports['fail'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'fail');
        cb();
    },

    'success': function (test) {

        test.expect(2);

        // this.harness.dumpModules().then(() => {

            this.harness.run([{
                ok: function (args, succ, fail) {
                    test.ok(args[0]);
                    succ();
                }
            }]).then(
                function (res) {
                    test.done();
                }).done();
        // });
    }
};

module.exports['factorial'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'factorial');
        cb();
    },

    'success': function (test) {
        this.harness.testSuccess(test, [10], 3628800);
    },

    'failure': function (test) {
        this.harness.testFailure(test, [-1], 'I pity the fool!');
    },

    'undef failure': function (test) {
        this.harness.testFailure(test, [], "c'mon!");
    }
};

module.exports['factorial2'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'factorial2');
        cb();
    },

    'success': function (test) {

        var io = {
            stdout: {
                write: function (args, succ, fail) {
                    test.equal(args[0], '3628800\n');
                    succ();
                }
            }
        };

        this.harness.testSuccess(test, [[10], io]);
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

module.exports['helloWorld'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'helloWorld');
        cb();
    },

    'success': function (test) {

        test.expect(2);

        var system = {
            out: {
                write: function (args, succ, fail) {
                    console.log(args);
                    test.equal(args[0], "hello, world!");
                    succ();
                }
            }
        };

        this.harness.dumpModules().then(() => {

            this.harness.testSuccess(test, [[], system, {}]);
        });
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

module.exports['iteration'] = {

    // test that uncaught errors are properly escalated out of the program

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'iteration');
        cb();
    },

    "stack doesn't overflow": function (test) {

        this.harness.testSuccess(test, [100000], 100000).done();
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

        this.harness.run([

            function (args, succ, fail) {
                logMessages.push(args[0]);
                succ();
            }
        ]).then(function (resp) {

            test.equal(resp, 5);

            // give the async calls a chance to get through
            setImmediate(function () {

                test.deepEqual(logMessages, [ 'howdy!\n', 'howdy!\n', 'hello hello!\n', 'ok.\n', 'ok.\n' ]);
                test.done();
            });
        });
    }
};

module.exports['reply arity'] = {

    "setUp": function (cb) {

        this.harness = new Harness(__dirname, 'replyArity');
        cb();
    },

    'success': function (test) {

        test.expect(1);

        // both functions just reply immediately
        // todo add a test that does this experiment within a reply handler

        this.harness.run([{
            equal: function (args, succ, fail) {

                test.deepEqual(args[0], args[1]);
                succ();
            }
        }]).then(
            function (res) {
                test.done();
            }).done();
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

        // this.harness.dumpModules().then(() => {

            this.harness.run([
                function (args, succ, fail) {
                    succ([]);
                },
                function (args, succ, fail) {
                    setImmediate(succ, [42]);
                }
            ]).then(
                function (res) {
                    test.equal(res, 42);
                    test.done();
                });
        // });
    }
};


module.exports['built-ins'] = {

   "setUp": function (cb) {

       this.harness = new Harness(__dirname, 'built-ins');
       cb();
   },

   'success': function (test) {

       this.harness.testSuccess(test, [], -1);
   }
};


module.exports['fibonacci2'] = {

   "setUp": function (cb) {

       this.harness = new Harness(__dirname, 'fibonacci2');
       cb();
   },

   'success': function (test) {

       this.harness.testSuccess(test, [10], 55);
   },

   'failure': function (test) {

       this.harness.testFailure(test, [-1], "Whatsamatta, you?");
   }
};





// module.exports['futures'] = {
//
//     // test that uncaught errors are properly escalated out of the program
//
//     "setUp": function (cb) {
//
//         this.harness = new Harness(__dirname, 'futures');
//         cb();
//     },
//
//     "run in parallel": function (test) {
//
//         var foo = function (task) {
//             test.ok(true);
//             task.respond("reply", 21);
//         };
//
//         var bar = function (task) {
//             test.ok(true);
//             task.respond("reply", 42);
//         };
//
//         this.harness.testSuccess(test, [foo, bar], "bar wins");
//     }
// };

// module.exports['futures2'] = {
//
//     // test that uncaught errors are properly escalated out of the program
//
//     "setUp": function (cb) {
//
//         this.harness = new Harness(__dirname, 'futures2');
//         cb();
//     },
//
//     "run in parallel": function (test) {
//
//         //test.expect(5);
//
//         var httpGet = function (task) {
//             test.ok(true);
//             setTimeout(task.doAsync(function () {
//                 task.respond("reply", [{statusCode: 200}, "this is a response"]);
//             }), 50);
//         };
//
//         var writeLine = function (task) {
//             test.ok(true);
//             //console.log('write:', task.args);
//             task.respond("reply"); // todo this is now superfluous
//         };
//
//         this.harness.testSuccess(test, [httpGet, writeLine], 18);
//     }
// };
