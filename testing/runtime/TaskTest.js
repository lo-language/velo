/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 7/23/17.
 */

"use strict";

const Task = require('../../runtime/Task');
const fs = require('fs');

/**
 * we're changing the signature of proc functions from fn(task) to fn(args, succ, fail)?
 */


/*

 1. there's always a task in scope. even a one-way message gets a task.
 2. a handler should thus get its own task? that makes sense
 3. here's the bug: a handler defined in a task attaches its requests to its parent task. bad.
 */


/*

test case:

- we have an async response handler that does a blocking call
- there might be other responses queued when we call that handler
- we need to make sure that they don't get run while the task is blocked!




 */



// immediately succeeds

var foo = function (args, succ, fail) {

    var task = new Task(succ, fail);

    task.succ(args);
};


// do some I/O in this one

var readFile = function (args, succ, fail) {

    var task = new Task();

    fs.readFile('../../' + args[0], args[1], function (err, res) {
        succ(res);
    });
};

// hangs by never calling either continuation

var hang = function (args, succ, fail) {

};

module.exports['responses'] = {

    "reply kills further response": function (test) {

        test.expect(1);

        var task = new Task(
            function (resp) {
                test.deepEqual(resp, ["foo"]);
                test.done();
            }, function (resp) {
                test.fail();
            });

        task.succ(["foo"]);
        task.succ(["boo"]);
        task.fail(["foo"]);
        task.fail(["boo"]);
        task.succ(["foo"]);
    },

    "fail kills further response": function (test) {

        test.expect(1);

        var task = new Task(
            function (resp) {
                test.fail();
            }, function (resp) {
                test.deepEqual(resp, ["foo"]);
                test.done();
            });

        task.fail(["foo"]);
        task.succ(["foo"]);
        task.succ(["boo"]);
        task.fail(["foo"]);
        task.succ(["foo"]);
    },

    "implicit reply on finish with no messages": function (test) {

        /*
         if we hit the end of a procedure and haven't fired off any messages, we need some other way to trigger
         the auto-reply
         */

        test.expect(1);

        var task = new Task(
            function (args) {
                test.ok(args === undefined);
                test.done();
            }, null);

        task.autoReply();
    },

    "no implicit reply after sync reply": function (test) {

        test.expect(1);

        var task = new Task(
            function (resp) {
                test.deepEqual(resp, ["foo"]);
                test.done();
            }, function (resp) {
                test.fail();
            });

        task.succ(["foo"]);
        task.autoReply();
    },

    "no implicit reply after sync fail": function (test) {

        test.expect(1);

        var task = new Task(
            function (resp) {
                test.fail();
            }, function (resp) {
                test.deepEqual(resp, ["boo"]);
                test.done();
            });

        task.fail(["boo"]);
        task.autoReply();
    },

    "no implicit reply while blocked": function (test) {

        var task = new Task(
            function (resp) {
                test.fail();
            }, function (resp) {
                test.fail();
            });

        task.sendAndBlock(hang, ["boo"]);
        task.autoReply();
        test.done();
    }
};


module.exports['finishing'] = {

    "finish waits for one message": function (test) {

        test.expect(6);

        var collector = '';

        // create an async service
        var service = function (args, succ, fail) {

            var task = new Task(succ, fail);

            test.equal(args, 'foo');
            test.equal(collector, '');
            collector += args;

            setImmediate(task.doAsync(function () {
                succ(['bar']);
            }));
        };

        Task.sendRootRequest(function (args, succ, fail) {

            var task = new Task(succ, fail);

            task.sendAsync(service, 'foo', function (result) {

                test.deepEqual(result, ["bar"]);
                test.equal(collector, 'foo');
                collector += result;
            });

        }, null, function (resp) {
            test.equal(resp, undefined); // implicit reply sends no args
            test.equal(collector, 'foobar');
            test.done();
        }, function () {
            test.fail();
        });
    },

    "finish doesn't wait for message with no handlers": function (test) {

        // model the message receiver
        var service = function (args, succ, fail) {

            var task = new Task(succ, fail);

            // send a message from this task
            task.sendAsync(function (args, succ, fail) {

                succ([]);

            }, ['foo'], null, null);
        };

        // todo send a root task
        Task.sendRootRequest(service, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "empty async reply still gets handled": function (test) {

        // there was a bug where an async reply of undefined wouldn't trigger its handler
        // this test is kind of obsolete since I've done away with the diff between
        // blocking and non-blocking messages

        // model the message receiver
        var service = function (args, succ, fail) {

            var task = new Task(succ, fail);

            // send a non-blocking message from this task
            task.sendAsync(args[0], null,
                function (args) {

                    task.succ([42]);

                }, null);

            // send a blocking message from this task
            task.sendAndBlock(args[1], null,
                function (args) {

                }, null);
        };

        Task.sendRootRequest(service, [
                function (args, succ, fail) {
                    succ([]);
                },
                function (args, succ, fail) {
                    succ([33]);
                }
            ],
            function (resp) {
                test.deepEqual(resp, [42]);
                test.done();
            }, function () {
                test.fail();
            });
    },

    "implicit reply waits for multiple subtasks": function (test) {

        test.expect(7);

        var expected = ['foo', 'bar', 'baz'];
        var replies = ['boo', 'zar', 'maz'];

        var transmogrify = function (args, succ, fail) {

            test.equal(args, expected.shift());
            succ([replies.shift()]);
        };

        var main = function (args, succ, fail) {

            var task = new Task(succ, fail);

            task.sendAsync(transmogrify, 'foo', function (args) {
                test.deepEqual(args, ["boo"]);
            });

            task.sendAsync(transmogrify, 'bar', function (args) {
                test.deepEqual(args, ["zar"]);
            });

            task.sendAsync(transmogrify, 'baz', function (args) {
                test.deepEqual(args, ["maz"]);
            });
        };


        Task.sendRootRequest(main, null,
            function (resp) {
                test.equal(expected.length, 0);
                test.done();
            }, function (resp) {
                test.fail();
            });
    },

    "finish waits for subtasks": function (test) {

        // traces a path through a few tasks

        // this is a lazy test becaause it imposes a total ordering on a sequence of async events for which
        // we only have a partial ordering, so there are multiple valid sequences, but we just assert against
        // the particular valid sequence we're expecting. so the test is over-specific.

        test.expect(1);

        var results = [];

        var passTheBuck = function (args, succ, fail) {

            //console.error('task handler B for ' + task.name);

            // send a submessage

            results.push(args[0] + ':pre');

            var task = new Task(succ, fail);

            // send a message from this task - root:child2:child1
            task.sendAsync(buckStopsHere, [args + ':subcall'], function (response) {

                //console.error('response handler Z for ' + task.name);
                results.push(response + ':handler');

                task.succ(args);
            });

            results.push(args[0] + ':post');

            // this is a weird and tricky case! because we're scheduling a reply before we hear back
            // from the message we just sent, but which has a handler!!
//            this.reply(args);
        };

        var buckStopsHere = function (args, succ, fail) {

            var task = new Task(succ, fail);

            results.push(args[0]);

            task.succ(args);
        };

        var main = function (args, succ, fail) {

            var task = new Task(succ, fail);

            // send a message from this task - root:child1
            task.sendAsync(buckStopsHere, ['call1'], function (result) {

                //console.error('response handler X for ' + task.name);
                results.push(result + ':handler');
            });

            // send a message from this task - root:child2
            task.sendAsync(passTheBuck, ['call2'], function (result) {

                //console.error('response handler Y for ' + task.name);
                results.push(result + ':handler');
            });

            // send a message from this task
            task.sendAsync(passTheBuck, ['call3'], function (result) {

                results.push(result + ':handler');
            });

            // send a message from this task
            task.sendAsync(buckStopsHere, ['call4'], function (result) {

                results.push(result + ':handler');
            });
        };

        Task.sendRootRequest(main, [],
            function (args, succ, fail) {

                test.deepEqual(results, [
                    "call1",
                    "call1:handler",
                    "call2:pre",
                    "call2:post",
                    "call3:pre",
                    "call3:post",
                    "call4",
                    "call4:handler",
                    "call2:subcall",
                    "call2:subcall:handler",
                    "call2:handler",
                    "call3:subcall",
                    "call3:subcall:handler",
                    "call3:handler"
                ]);

                test.done();
            }, function (args) {
                test.fail();
            }, true);
    },

    "mockup of implicit reply with subtasks and failure": function (test) {

        // mock up a task handler - this would be generated by the compiler

        var service = function (args, succ, fail) {

            var task = new Task(succ, fail);

            task.sendAsync(foo, args, function (result) { // a response handler doesn't need an envelope

                // make another task - with no reply handler

                task.sendAsync(bar, result, null, function () {  // an error handler

                    //console.log("what?! a failure?!");
                });

                // send a message with an empty handler
                task.sendAsync(baz, result, function () {  // a response handler doesn't need an envelope
                });
            });

            // another task at this level could just overwrite subtask - we're done with that value
            // or we could do something where creating a subtask takes the handlers and binds them itself...
        };

        // set up some stub services for our task handler to send messages to

        var foo = function (args, succ, fail) {
            //console.log("i am foo");
            succ([]);
        };

        var bar = function (args, succ, fail) {
            //console.log("i am bar!");
            fail([]);
        };

        var baz = function (args, succ, fail) {
            //console.log("I am a BANANA!");
            succ([]);
        };

        Task.sendRootRequest(service, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },


    "implicit reply with nested sync calls": function (test) {

        test.expect(1);

        var main = function (args, succ, fail) {

            var task = new Task(succ, fail);

            // bug was: task is autoReplyd after sending this request
            // so when the response comes back and the sync sendMessage fires,
            // it erroneously sees no more work left to do and fires a default reply

            task.sendAndBlock(foo, 'foo', function (result) {

                task.sendAndBlock(foo);

                task.succ(["leeloo"]);
            });

            task.autoReply();
        };

        Task.sendRootRequest(main, null,
            function (result) {
                test.equal(result, "leeloo");
                test.done();
            }, function (reason) {
                test.fail();
            });
    },

    "implicit reply with mixed sync async": function (test) {

        var asyncService = function (args, succ, fail) {

            var task = new Task(succ, fail);

            setImmediate(task.doAsync(function () {
                task.succ([]);
            }));
        };

        var main = function (args, succ, fail) {

            var task = new Task(succ, fail);

            // task is autoReplyd after sending this request
            // so when the response comes back and the sync sendMessage fires,
            // it erroneously sees no more work left to do and fires a default reply
            task.sendAsync(asyncService, 'foo', function (result) {

                task.sendAndBlock(foo);

                task.succ(["leeloo"]);
            });
        };

        Task.sendRootRequest(main, null,
            function (result) {
                test.equal(result, "leeloo");
                test.done();
            }, function (reason) {
                test.fail();
            });
    }
};

// experiment 1
// send async, send sync, verify sync is handled before async response

// send a async message
// does it matter when the targets actually *run*? or just the order their responses are handled in?
// because we can't make any guarantees about when the targets get their messages, it's a race
// so we could run the async function to completion and then queue up its response

module.exports['sequencing'] = {

    "correctly sequences async and sync responses": function (test) {


        var order = '';

        var root = new Task(function () {

            // valid orderings: BDAC, BDCA

            test.equal(order, 'BDAC');
            test.done();

        }, function () {
            test.fail();
        });

        root.sendAsync(foo, ["42"], function () {
            order = order.concat('A');
        });

        root.sendAndBlock(foo, ["57"], function () {
            order = order.concat('B');
        });

        root.sendAsync(readFile, [".travis.yml", 'utf8'], function (result) {
            order = order.concat('C');
        });

        root.sendAndBlock(readFile, ["vancleve.png", ''], function (result) {
            order = order.concat('D');
        });
    }
};



// experiment 2
// send async, send sync, verify sync is handled before async response
// but now they include I/O!

// this one doesn't work, there's some race in it because the
// IO system loses the priority signal; we need some way to enforce order
// of response handling




/*

 so when you send an async message:

 the message should be put on the queue of its service
 we implement this by using setImmediate()


 when you send a sync message:

 the message should take priority; we implement this using nextTick()


 we need to make sure this works with IO!

 experiments/tests:

 send async
 send sync
 verify sync is handled before async response


 send async with IO
 send sync
 verify sync is handled before async response


 send async
 send sync with IO
 verify sync is handled before async response


 send async with IO
 send sync with IO
 verify sync is handled before async response


 so sendAsync calls setImmediate() AND registers the pending response,
 whereas sendSync calls nextTick()

 */


// tests for futures

// module.exports['await'] = {
//
//     "await before response, no handler": function (test) {
//
//         test.expect(1);
//
//         var main = function (task) {
//
//             var future = task.sendMessage(function (task) {
//
//                 setImmediate(task.doAsync(function () {
//                     task.respond("reply", ["snooks"]);
//                 }));
//             });
//
//             future.await(function (result) {
//                 test.equal(result, "snooks");
//             });
//         };
//
//         Task.sendRootRequest(main, [], function () {
//             test.done();
//         }, function () {
//             test.fail();
//         });
//     },
//
//     "await after response, no handler": function (test) {
//
//         test.expect(1);
//
//         var main = function (task) {
//
//             var future = task.sendMessage(function (task) {
//                 task.respond("reply", ["snooks"]);
//             });
//
//             future.await(function (result) {
//                 test.equal(result, "snooks");
//             });
//         };
//
//         Task.sendRootRequest(main, [], function () {
//             test.done();
//         }, function () {
//             test.fail();
//         });
//     },
//
//     "await before response, runs after handler": function (test) {
//
//         test.expect(2);
//
//         var gotR = false;
//
//         var main = function (task) {
//
//             var future = task.sendMessage(function (task) {
//
//                 setImmediate(task.doAsync(function () {
//                     task.respond("reply", ["snooks"]);
//                 }));
//             }, [], function (reply) {
//                 gotR = true;
//             });
//
//             future.await(function (result) {
//                 test.equal(result, "snooks");
//                 test.ok(gotR);
//             });
//         };
//
//         Task.sendRootRequest(main, [], function () {
//             test.done();
//         }, function () {
//             test.fail();
//         });
//     },
//
//     "await after response, runs after handler": function (test) {
//
//         // this test is a bit silly since we're attaching the listener
//         // after the response, it damn well *better* run after the handler!
//
//         test.expect(2);
//
//         var gotR = false;
//
//         var main = function (task) {
//
//             var future = task.sendMessage(function (task) {
//                 task.respond("reply", ["snooks"]);
//             }, [], function (reply) {
//                 gotR = true;
//             });
//
//             future.await(function (result) {
//                 test.equal(result, "snooks");
//                 test.ok(gotR);
//             });
//         };
//
//         Task.sendRootRequest(main, [], function () {
//             test.done();
//         }, function () {
//             test.fail();
//         });
//     }
// };