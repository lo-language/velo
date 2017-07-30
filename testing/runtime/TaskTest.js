/*
 * Author: Seth Purcell
 * 6/20/15
 */


"use strict";

var Task = require('../../runtime/Task');
var util = require('util');

// todo make sure all these tests work with setImmediate in here

module.exports['responses'] = {

    "reply kills further response": function (test) {

        test.expect(1);

        var task = new Task(null, null,
            function (args) {
                test.deepEqual(args, ["foo"]);
                test.done();
            }, function (args) {
                test.fail();
            });

        task.respond("reply", ["foo"]);
        task.respond("reply", ["boo"]);
        task.respond("fail", ["boo"]);
        task.respond("fail", ["foo"]);
        task.respond("reply", ["foo"]);
    },

    "fail kills further response": function (test) {

        test.expect(1);

        var task = new Task(null, null,
            function (args) {
                test.fail();
            }, function (args) {
                test.deepEqual(args, ["foo"]);
                test.done();
            });

        task.respond("fail", ["foo"]);
        task.respond("reply", ["foo"]);
        task.respond("reply", ["boo"]);
        task.respond("fail", ["foo"]);
        task.respond("reply", ["foo"]);
    },

    "implicit reply on finish": function (test) {

        test.expect(1);

        var task = new Task(null, null,
            function (args) {
                test.ok(args === undefined);
                test.done();
            }, null);

        task.deactivate();
    },

    "no implicit reply after reply": function (test) {

        test.expect(1);

        var task = new Task(null, null,
            function (args) {
                test.deepEqual(args, ["foo"]);
                test.done();
            }, function (args) {
                test.fail();
            });

        task.respond("reply", ["foo"]);
        task.deactivate();
    },

    "no implicit reply after fail": function (test) {

        test.expect(1);

        var task = new Task(null, null,
            function (args) {
                test.fail();
            }, function (args) {
                test.deepEqual(args, ["boo"]);
                test.done();
            });

        task.respond("fail", ["boo"]);
        task.deactivate();
    }
};

module.exports['finishing'] = {

    "finish waits for one message": function (test) {

        test.expect(6);

        var collector = '';

        // create an async service
        var service = function (task) {

            test.equal(task.args, 'foo');
            test.equal(collector, '');
            collector += task.args;

            setImmediate(task.doAsync(function () {
                task.respond("reply", ['bar']);
            }));
        };

        Task.sendRootRequest(function (task) {

            task.sendMessage(service, 'foo', function (result) {

                test.deepEqual(result, ["bar"]);
                test.equal(collector, 'foo');
                collector += result;
            });

        }, null, function (args) {
            test.equal(args, undefined); // implicit reply sends no args
            test.equal(collector, 'foobar');
            test.done();
        }, function () {
            test.fail();
        });
    },

    "finish doesn't wait for message with no handlers": function (test) {

        // model the message receiver
        var service = function (task) {

            // send a message from this task
            task.sendMessage(function (task) {

                task.respond("reply", []);

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
        var service = function (task) {

            // send a non-blocking message from this task
            task.sendMessage(task.args[0], null,
                function (args) {

                    task.respond("reply", [42]);

                }, null);

            // send a blocking message from this task
            task.sendMessage(task.args[1], null,
                function (args) {

                }, null);
        };

        Task.sendRootRequest(service, [
            function (task) {
                task.respond("reply", []);
            },
            function (task) {
                task.respond("reply", [33]);
            }
        ],
        function (res) {
            test.deepEqual(res, [42]);
            test.done();
        }, function () {
            test.fail();
        });
    },

    "implicit reply waits for multiple subtasks": function (test) {

        test.expect(7);

        var expected = ['foo', 'bar', 'baz'];
        var replies = ['boo', 'zar', 'maz'];

        var transmogrify = function (task) {

            test.equal(task.args, expected.shift());
            task.respond("reply", [replies.shift()]);
        };

        var main = function (task) {

            task.sendMessage(transmogrify, 'foo', function (args) {
                test.deepEqual(args, ["boo"]);
            });

            task.sendMessage(transmogrify, 'bar', function (args) {
                test.deepEqual(args, ["zar"]);
            });

            task.sendMessage(transmogrify, 'baz', function (args) {
                test.deepEqual(args, ["maz"]);
            });
        };


        Task.sendRootRequest(main, null,
            function (args) {
                test.equal(expected.length, 0);
                test.done();
            }, function (args) {
                test.fail();
            });
    },

    "finish waits for subtasks": function (test) {

        test.expect(1);

        var results = [];

        var passTheBuck = function (task) {

            //console.error('task handler B for ' + task.name);

            // send a submessage

            results.push(task.args[0] + ':pre');

            // send a message from this task - root:child2:child1
            task.sendMessage(buckStopsHere, [task.args + ':subcall'], function (response) {

                //console.error('response handler Z for ' + task.name);
                results.push(response + ':handler');

                task.respond("reply", task.args);
            });

            results.push(task.args[0] + ':post');

            // this is a weird and tricky case! because we're scheduling a reply before we hear back
            // from the message we just sent, but which has a handler!!
//            this.reply(args);
        };

        var buckStopsHere = function (task) {

            //console.error('task handler A for ' + task.name);

            results.push(task.args[0]);

            task.respond("reply", task.args);
        };

        var main = function (task) {

            // send a message from this task - root:child1
            task.sendMessage(buckStopsHere, ['call1'], function (result) {

                //console.error('response handler X for ' + task.name);
                results.push(result + ':handler');
            });

            // send a message from this task - root:child2
            task.sendMessage(passTheBuck, ['call2'], function (result) {

                //console.error('response handler Y for ' + task.name);
                results.push(result + ':handler');
            });

            // send a message from this task
            task.sendMessage(passTheBuck, ['call3'], function (result) {

                results.push(result + ':handler');
            });

            // send a message from this task
            task.sendMessage(buckStopsHere, ['call4'], function (result) {

                results.push(result + ':handler');
            });
        };

        Task.sendRootRequest(main, [],
            function (args) {

                // this test enforces a particular (expected) ordering of tasks, but
                // there are actually *several* valid orderings of the tasks in this test because
                // the calls are all supposed to be concurrent
                // an also-valid, previously-expected ordering is commented out below

                test.deepEqual(results, [
                    'call1',
                    'call1:handler',
                    'call2:pre',
                    'call2:subcall',
                    'call2:subcall:handler',
                    'call2:handler',
                    'call2:post',
                    'call3:pre',
                    'call3:subcall',
                    'call3:subcall:handler',
                    'call3:handler',
                    'call3:post',
                    'call4',
                    'call4:handler' ]);

                test.done();
            }, function (args) {
                test.fail();
            }, true);
    },

    "implicit fail handler": function (test) {

        // todo
        test.done();
    },

    "mockup of implicit reply with subtasks and failure": function (test) {

        // mock up a task handler - this would be generated by the compiler

        var service = function (task) {

            // here's how we make a task

            task.sendMessage(foo, task.args, function (result) { // a response handler doesn't need an envelope

                // make another task - with no reply handler

                task.sendMessage(bar, result, null, function () {  // an error handler

                    //console.log("what?! a failure?!");
                });

                // send a message with an empty handler
                task.sendMessage(baz, result, function () {  // a response handler doesn't need an envelope
                });
            });

            // another task at this level could just overwrite subtask - we're done with that value
            // or we could do something where creating a subtask takes the handlers and binds them itself...
        };

        // set up some stub services for our task handler to send messages to

        var foo = function (task) {
            //console.log("i am foo");
            task.respond("reply", []);
        };

        var bar = function (task) {
            //console.log("i am bar!");
            task.respond("fail", []);
        };

        var baz = function (task) {
            //console.log("I am a BANANA!");
            task.respond("reply", []);
        };

        Task.sendRootRequest(service, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "implicit reply with nested sync calls": function (test) {

        test.expect(1);

        var syncService = function (task) {
            // don't do much
        };

        var main = function (task) {

            // task is deactivated after sending this request
            // so when the response comes back and the sync sendMessage fires,
            // it erroneously sees no more work left to do and fires a default reply
            task.sendMessage(syncService, 'foo', function (result) {

                task.sendMessage(syncService);

                task.respond("reply", ["leeloo"]);
            });
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

        var asyncService = function (task) {

            setImmediate(task.doAsync(function () {
                task.respond("reply", []);
            }));
        };

        var syncService = function (task) {
            // don't do much
        };

        var main = function (task) {

            // task is deactivated after sending this request
            // so when the response comes back and the sync sendMessage fires,
            // it erroneously sees no more work left to do and fires a default reply
            task.sendMessage(asyncService, 'foo', function (result) {

                task.sendMessage(syncService);

                task.respond("reply", ["leeloo"]);
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


module.exports['await'] = {

    "await before response, no handler": function (test) {

        test.expect(1);

        var main = function (task) {

            var future = task.sendMessage(function (task) {

                setImmediate(task.doAsync(function () {
                    task.respond("reply", ["snooks"]);
                }));
            });

            future.await(function (result) {
                test.equal(result, "snooks");
            });
        };

        Task.sendRootRequest(main, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "await after response, no handler": function (test) {

        test.expect(1);

        var main = function (task) {

            var future = task.sendMessage(function (task) {
                task.respond("reply", ["snooks"]);
            });

            future.await(function (result) {
                test.equal(result, "snooks");
            });
        };

        Task.sendRootRequest(main, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "await before response, runs after handler": function (test) {

        test.expect(2);

        var gotR = false;

        var main = function (task) {

            var future = task.sendMessage(function (task) {

                setImmediate(task.doAsync(function () {
                    task.respond("reply", ["snooks"]);
                }));
            }, [], function (reply) {
                gotR = true;
            });

            future.await(function (result) {
                test.equal(result, "snooks");
                test.ok(gotR);
            });
        };

        Task.sendRootRequest(main, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "await after response, runs after handler": function (test) {

        // this test is a bit silly since we're attaching the listener
        // after the response, it damn well *better* run after the handler!

        test.expect(2);

        var gotR = false;

        var main = function (task) {

            var future = task.sendMessage(function (task) {
                task.respond("reply", ["snooks"]);
            }, [], function (reply) {
                gotR = true;
            });

            future.await(function (result) {
                test.equal(result, "snooks");
                test.ok(gotR);
            });
        };

        Task.sendRootRequest(main, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    }
};