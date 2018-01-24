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

const Program = require('../../Program');
const Task = require('../../runtime/Task');
const util = require('util');


module.exports['localModules'] = {

    "setUp": function (cb) {

        this.program = new Program('localModules.lo', __dirname);
        cb();
    },

    'success': function (test) {

        // this.program.compile().then(() => {
        //     this.program.dump();
        // });

        this.program.run([]).then(function (result) {
            test.deepEqual(result, [3628800]);
            test.done();
        });
    }
};

module.exports['yields'] = {

    "setUp": function (cb) {

        this.program = new Program('yields.lo', __dirname);
        cb();
    },

    'success': function (test) {

        var name = "Jean-Baptiste Emmanual Zorg";

        var helper = function (args, succ, fail) {
            succ([name]);
        };

        this.program.run([helper]).then(function (result) {
            test.deepEqual(result, [name]);
            test.done();
        });
    }
};

module.exports['set operations'] = {

    "setUp": function (cb) {

        this.program = new Program('set-operations.lo', __dirname);
        cb();
    },

    'success': function (test) {

        this.program.run().then(
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
            });
    }
};

module.exports['binding'] = {

    "setUp": function (cb) {

        this.program = new Program('binding.lo', __dirname);
        cb();
    },

    'obj bound': function (test) {

        test.expect(1);

        var log = function (args, succ, fail) {

            test.deepEqual(args, ['hooray!']);
            succ();
        };

        this.program.run([log]).then(function (result) {
            test.done();
        });
    },

    'obj unbound': function (test) {

        this.program.run().catch(function (result) {

            test.deepEqual(result, ['no log!']);
            test.done();
        });
    }
};


module.exports['nestedLoops'] = {

    "setUp": function (cb) {

        this.program = new Program('nestedLoops.lo', __dirname);
        cb();
    },

    'success': function (test) {

        var log = function (args, succ, fail) {
            succ();
        };

        this.program.run([log]).then(function (result) {
            test.deepEqual(result, [9]);
            test.done();
        });
    }
};

module.exports['fail'] = {

    "setUp": function (cb) {

        this.program = new Program('fail.lo', __dirname);
        cb();
    },

    'success': function (test) {

        test.expect(2);

        this.program.run([{
            ok: function (args, succ, fail) {
                test.ok(args[0]);
                succ();
            }
        }]).then(
            function (result) {
                test.done();
            });
    }
};

module.exports['factorial'] = {

    "setUp": function (cb) {

        this.program = new Program('factorial.lo', __dirname);
        cb();
    },

    'success': function (test) {

        this.program.run([10]).then(function (result) {
            test.deepEqual(result, [3628800]);
            test.done();
        });
    },

    'failure': function (test) {
        this.program.run([-1]).catch(function (result) {
            test.deepEqual(result, ["I pity the fool!"]);
            test.done();
        });
    },

    'undef failure': function (test) {
        this.program.run().catch(function (result) {
            test.deepEqual(result, ["c'mon!"]);
            test.done();
        });
    }
};

module.exports['factorial2'] = {

    "setUp": function (cb) {

        this.program = new Program('factorial2.lo', __dirname);
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

        this.program.run([[10], io]).then(function (result) {
            test.done();
        });
    }
};

module.exports['collections'] = {

    "setUp": function (cb) {

        this.program = new Program('collections.lo', __dirname);
        cb();
    },

    'all': function (test) {

        this.program.run().then(function (result) {
            test.done();
        });
    }
};

module.exports['helloWorld'] = {

    "setUp": function (cb) {

        this.program = new Program('helloWorld.lo', __dirname);
        cb();
    },

    'success': function (test) {

        test.expect(2);

        // one call to write is sync, one is async, so there's a race between the async call
        // and the test completion
        var system = {
            out: {
                write: function (args, succ, fail) {
                    // console.log('here');
                    test.equal(args[0], "hello, world!");
                    succ();
                }
            }
        };

        this.program.run([[], system, {}]).then(function (result) {
            test.done();
        }).catch(err => {
            console.log(err);
        });
    }
};

module.exports['fibonacci'] = {

    "setUp": function (cb) {

        this.program = new Program('fibonacci.lo', __dirname);
        cb();
    },

    'success': function (test) {

        this.program.run([10]).then(function (result) {
            test.deepEqual(result, [55]);
            test.done();
        });
    },

    'failure': function (test) {

        this.program.run([-1]).catch(function (result) {
            test.deepEqual(result, ['Whatsamatta, you?']);
            test.done();
        });
    }
};

module.exports['conditionals'] = {

    "setUp": function (cb) {

        this.program = new Program('conditionals.lo', __dirname);
        cb();
    },

    'neg': function (test) {

        this.program.run([-1]).then(function (result) {
            test.deepEqual(result, ['negative']);
            test.done();
        });
    },

    'zero': function (test) {
        this.program.run([0]).then(function (result) {
            test.deepEqual(result, ['zero!']);
            test.done();
        });
    },

    'pos': function (test) {

        this.program.run([1]).then(function (result) {
            test.deepEqual(result, ['positive']);
            test.done();
        });
    }
};

module.exports['iteration'] = {

    "setUp": function (cb) {

        this.program = new Program('iteration.lo', __dirname);
        cb();
    },

    "stack doesn't overflow": function (test) {

        // todo not a relevant test without a req in the loop!

        this.program.run([100000]).then(function (result) {
            test.deepEqual(result, [100000]);
            test.done();
        });
    }
};

module.exports['procedure'] = {

    "setUp": function (cb) {

        this.program = new Program('procedure.lo', __dirname);
        cb();
    },

    'success': function (test) {

        this.program.run([]).then(function (result) {
            test.deepEqual(result, [60]);
            test.done();
        });
    }
};

module.exports['conditional in loop'] = {

    "setUp": function (cb) {

        this.program = new Program('condInLoop.lo', __dirname);
        cb();
    },

    'success': function (test) {

        var logMessages = [];

        this.program.run([

            function (args, succ, fail) {
                logMessages.push(args[0]);
                succ();
            }
        ]).then(function (result) {

            test.deepEqual(result, [5]);

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

        this.program = new Program('replyArity.lo', __dirname);
        cb();
    },

    'success': function (test) {

        test.expect(1);

        // both functions just reply immediately
        // todo add a test that does this experiment within a reply handler

        this.program.run([{
            equal: function (args, succ, fail) {

                test.deepEqual(args[0], args[1]);
                succ();
            }
        }]).then(
            function (result) {
                test.done();
            });
    }
};

module.exports['reply handling'] = {

    "setUp": function (cb) {

        this.program = new Program('replyHandling.lo', __dirname);
        cb();
    },

    'success': function (test) {

        test.expect(1);

        // both functions just reply immediately
        // todo add a test that does this experiment within a reply handler

        this.program.run([
            function (args, succ, fail) {
                succ([27]);
            },
            function (args, succ, fail) {
                setImmediate(succ, [42]);
            }
        ]).then(
            function (result) {
                test.deepEqual(result, [42]);
                test.done();
            });
    }
};


module.exports['built-ins'] = {

   "setUp": function (cb) {

       this.program = new Program('built-ins.lo', __dirname);
       cb();
   },

   'success': function (test) {

       this.program.run().then(function (result) {
           test.deepEqual(result, [-1]);
           test.done();
       });
   }
};


module.exports['fibonacci2'] = {

   "setUp": function (cb) {

       this.program = new Program('fibonacci2.lo', __dirname);
       cb();
   },

   'success': function (test) {

       this.program.run([10]).then(function (result) {
           test.deepEqual(result, [55]);
           test.done();
       });
   },

   'failure': function (test) {

       this.program.run([-1]).catch(function (result) {
           test.deepEqual(result, ["Whatsamatta, you?"]);
           test.done();
       });
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
