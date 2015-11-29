/*
 * Author: Seth Purcell
 * 6/20/15
 */


"use strict";

var Task = require('../../runtime/Task');
var util = require('util');

module.exports['replies'] = {

    "new reply not processed in working state": function (test) {

        var task = new Task('root');

        test.equal(task.outstandingRequests, 0);
        test.done();
    },

    //"new reply processed in waiting state": function (test) {
    //
    //    var task = new Task('root', null, null, function (args) {
    //        test.equal(args, "foo");
    //        test.done();
    //    }, function (args) {
    //        test.fail();
    //    });
    //
    //    test.equal(task.pendingReplies.length, 0);
    //    task.enqueueReply('snork');
    //
    //    test.equal(task.pendingReplies.length, 1);
    //
    //    test.done();
    //}
};

module.exports['basics'] = {

    "reply kills further response": function (test) {

        test.expect(1);

        var task = new Task('root');

        task.on("reply", function (args) {
            test.equal(args, "foo");
            test.done();
        });

        task.on("fail", function (args) {
            test.fail();
        });

        task.respond("reply", "foo");
        task.respond("reply", "boo");
        task.respond("fail", "boo");
        task.respond("fail", "foo");
        task.respond("reply", "foo");
    },

    "fail kills further response": function (test) {

        test.expect(1);

        var task = new Task('root');

        task.on("reply", function (args) {
            test.fail();
        });

        task.on("fail", function (args) {
            test.equal(args, "foo");
            test.done();
        });

        task.respond("fail", "foo");
        task.respond("reply", "foo");
        task.respond("reply", "boo");
        task.respond("fail", "foo");
        task.respond("reply", "foo");
    },

    "implicit reply on close": function (test) {

        test.expect(1);

        var task = new Task('root');

        task.on("reply", function (args) {
            test.equal(args, undefined);
            test.done();
        });

        task.pickupReplies();
    },

    "no implicit reply after reply": function (test) {

        test.expect(1);

        var task = new Task('root');

        task.on("reply", function (args) {
            test.equal(args, "foo");
            test.done();
        });

        task.on("fail", function (args) {
            test.fail();
        });

        task.respond("reply", "foo");
        task.pickupReplies();
    },

    "no implicit reply after fail": function (test) {

        test.expect(1);

        var task = new Task('root');

        task.on("reply", function (args) {
            test.fail();
        });

        task.on("fail", function (args) {
            test.equal(args, "boo");
            test.done();
        });

        task.respond("fail", "boo");
        task.pickupReplies();
    },

    "close waits for one message": function (test) {

        test.expect(6);

        var collector = '';

        // create a root task
        var task = new Task('root');

        task.on("reply", function (args) {
            test.equal(args, undefined); // implicit reply sends no args
            test.equal(collector, 'foobar');
            test.done();
        });

        task.on("fail", function (args) {
            test.fail();
        });

        // create an ersatz service
        var service = function (task) {

            test.equal(task.args, 'foo');
            test.equal(collector, '');
            collector += task.args;

            task.respond("reply", 'bar');
            task.pickupReplies();
        };

        // send a message from our root task
        task.sendMessage(service, 'foo', function (result) {

            test.equal(result, 'bar');
            test.equal(collector, 'foo');
            collector += result;
        });

        // shouldn't fire implicit reply until the message has been processed
        task.pickupReplies();
    },

    "close doesn't wait for message with no handlers": function (test) {

        // model the message receiver
        var service = function (task) {

            // send a message from this task
            task.sendMessage(function (args) {
                // do nothing
                //console.error(args);

            }, 'foo', null, null);

            // should succeed because we didn't attach handlers to that message
            task.pickupReplies();
        };

        // todo send a root task
        Task.sendRootRequest(service, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "implicit reply waits for multiple subtasks": function (test) {

        test.expect(7);

        var task = new Task('root');

        task.on("reply", function (args) {
            test.equal(expected.length, 0);
            test.done();
        });

        task.on("fail", function (args) {
            test.fail();
        });

        var expected = ['foo', 'bar', 'baz'];
        var replies = ['boo', 'zar', 'maz'];

        // model a service

        var transmogrify = function (task) {

            test.equal(task.args, expected.shift());
            task.respond("reply", replies.shift());

            task.pickupReplies();
        };

        task.sendMessage(transmogrify, 'foo', function (result) {
            test.equal(result, 'boo');
        });

        task.sendMessage(transmogrify, 'bar', function (result) {
            test.equal(result, 'zar');
        });

        task.sendMessage(transmogrify, 'baz', function (result) {
            test.equal(result, 'maz');
        });

        // shouldn't fire implicit reply
        task.pickupReplies();
    },

    "close waits for subtasks": function (test) {

        test.expect(1);

        var results = [];

        // create the root task
        //console.error("create root");
        var task = new Task('root');

        task.on("reply", function (args) {

            // there are actually *several* valid orderings of the tasks in this test because
            // the calls are all supposed to be concurrent - but I'm enforcing a BFS ordering for now;
            // a previously-valid ordering is commented out below

            test.deepEqual(results, [
                'call1',
                'call2:pre',
                'call2:post',
                'call3:pre',
                'call3:post',
                'call4',
                'call1:handler',
                'call4:handler',
                'call2:subcall',
                'call3:subcall',
                'call2:subcall:handler',
                'call3:subcall:handler',
                'call2:handler',
                'call3:handler']);

            //test.deepEqual(results, [
            //    'call1',
            //    'call2:pre',
            //    'call2:post',
            //    'call3:pre',
            //    'call3:post',
            //    'call4',
            //    'call1:handler',
            //    'call2:subcall',
            //    'call3:subcall',
            //    'call4:handler',
            //    'call2:subcall:handler',
            //    'call3:subcall:handler',
            //    'call2:handler',
            //    'call3:handler'
            //]);

            test.done();
        });

        task.on("fail", function (args) {
            test.fail();
        });

        var passTheBuck = function (task) {

            //console.error('task handler B for ' + task.name);

            // send a submessage

            results.push(task.args + ':pre');

            // send a message from this task - root:child2:child1
            task.sendMessage(buckStopsHere, task.args + ':subcall', function (response) {

                //console.error('response handler Z for ' + task.name);
                results.push(response + ':handler');

                task.respond("reply", task.args);
            });

            results.push(task.args + ':post');

            // this is a weird and tricky case! because we're scheduling a reply before we hear back
            // from the message we just sent, but which has a handler!!
//            this.reply(args);
            task.pickupReplies();
        };

        var buckStopsHere = function (task) {

            //console.error('task handler A for ' + task.name);

            results.push(task.args);

            task.respond("reply", task.args);
            task.pickupReplies();
        };

        // send a message from this task - root:child1
        task.sendMessage(buckStopsHere, 'call1', function (result) {

            //console.error('response handler X for ' + task.name);
            results.push(result + ':handler');
        });

        // send a message from this task - root:child2
        task.sendMessage(passTheBuck, 'call2', function (result) {

            //console.error('response handler Y for ' + task.name);
            results.push(result + ':handler');
        });

        // send a message from this task
        task.sendMessage(passTheBuck, 'call3', function (result) {

            results.push(result + ':handler');
        });

        // send a message from this task
        task.sendMessage(buckStopsHere, 'call4', function (result) {

            results.push(result + ':handler');
        });

        task.pickupReplies();
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

                    console.log("what?! a failure?!");
                });

                // send a message with an empty handler
                task.sendMessage(baz, result, function () {  // a response handler doesn't need an envelope
                });
            });

            // another task at this level could just overwrite subtask - we're done with that value
            // or we could do something where creating a subtask takes the handlers and binds them itself...

            task.pickupReplies();
        };

        // set up some stub services for our task handler to send messages to

        var foo = function (task) {
            console.log("i am foo");
            task.respond("reply");
        };

        var bar = function (task) {
            console.log("i am bar!");
            task.respond("fail");
        };

        var baz = function (task) {
            console.log("I am a BANANA!");
            task.respond("reply");
        };

        // todo send a root task
        Task.sendRootRequest(service, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    }
};