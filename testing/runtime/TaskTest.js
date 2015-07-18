/*
 * Copyright (C) 2015 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 * 6/20/15
 */


"use strict";

var Task = require('../../runtime/Task');

module.exports = {

    "reply kills further response": function (test) {

        test.expect(1);

        var task = new Task(function (args) {
            test.equal(args, "foo");
            test.done();
        }, function (args) {
            test.fail();
        });

        task.reply("foo");
        task.reply("boo");
        task.fail("boo");
        task.fail("foo");
        task.reply("foo");
    },

    "fail kills further response": function (test) {

        test.expect(1);

        var task = new Task(function (args) {
            test.fail();
        }, function (args) {
            test.equal(args, "foo");
            test.done();
        });

        task.fail("foo");
        task.reply("foo");
        task.reply("boo");
        task.fail("foo");
        task.reply("foo");
    },

    "implicit reply on close": function (test) {

        test.expect(1);

        var task = new Task(function (args) {
            test.equal(args, undefined);
            test.done();
        }, function (args) {
            test.fail();
        });

        task.tryClose();
    },

    "no implicit reply after reply": function (test) {

        test.expect(1);

        var task = new Task(function (args) {
            test.equal(args, "foo");
            test.done();
        }, function (args) {
            test.fail();
        });

        task.reply("foo");
        task.tryClose();
    },

    "no implicit reply after fail": function (test) {

        test.expect(1);

        var task = new Task(function (args) {
            test.fail();
        }, function (args) {
            test.equal(args, "boo");
            test.done();
        });

        task.fail("boo");
        task.tryClose();
    },

    "close waits for one message": function (test) {

        test.expect(6);

        var collector = '';

        var task = new Task(function (args) {
            test.equal(args, undefined); // implicit reply sends no args
            test.equal(collector, 'foobar');
            test.done();
        }, function (args) {
            test.fail();
        });

        // model the message receiver
        var requestHandler = function (args, recur, onReply, onFail) {

            test.equal(args, 'foo');
            test.equal(collector, '');
            collector += args;

            var task = new Task(onReply, onFail);

            task.reply('bar');

            task.tryClose();
        };

        // send a message from this task
        task.sendMessage(requestHandler, 'foo', function (args) {

            test.equal(args, 'bar');
            test.equal(collector, 'foo');
            collector += args;

            // handlers need to close their subtasks
            this.tryClose();
        });

        // shouldn't fire implicit reply until the message has been processed
        task.tryClose();
    },

    "close waits for multiple subtasks": function (test) {

        test.expect(7);

        var task = new Task(function (args) {
            test.equal(expected.length, 0);
            test.done();
        }, function (args) {
            test.fail();
        });

        var expected = ['foo', 'bar', 'baz'];
        var replies = ['boo', 'zar', 'maz'];

        // model a message receiver
        var transmogrify = function (args, recur, onReply, onFail) {

            var task = new Task(onReply, onFail);

            test.equal(args, expected.shift());
            task.reply(replies.shift());

            task.tryClose();
        };

        // send a message from this task
        task.sendMessage(transmogrify, 'foo', function (args) {

            test.equal(args, 'boo');

            // handlers need to close their subtasks
            this.tryClose();
        });

        // send a message from this task
        task.sendMessage(transmogrify, 'bar', function (args) {

            test.equal(args, 'zar');

            // handlers need to close their subtasks
            this.tryClose();
        });

        // send a message from this task
        task.sendMessage(transmogrify, 'baz', function (args) {

            test.equal(args, 'maz');

            // handlers need to close their subtasks
            this.tryClose();
        });

        // shouldn't fire implicit reply
        task.tryClose();
    },

    "close waits for nested subtasks": function (test) {

//        test.expect(1);

        var results = [];

        var task = new Task(function (args) {
            test.deepEqual(results, [
                'call1',
                'call2:pre',
                'call2:post',
                'call3:pre',
                'call3:post',
                'call4',
                'call1:handler',
                'call2:subcall',
                'call2:handler',
                'call3:subcall',
                'call3:handler',
                'call4:handler',
                'call2:subcall:handler',
                'call3:subcall:handler' ]);
            test.done();
        }, function (args) {
            test.fail();
        });

        var passTheBuck = function (args, recur, onReply, onFail) {

            var task = new Task(onReply, onFail);

            // send a submessage

            results.push(args + ':pre');

            // send a message from this task
            task.sendMessage(buckStopsHere, args + ':subcall', function (args) {

                results.push(args + ':handler');

                // handlers need to close their subtasks
                this.tryClose();
            });

            results.push(args + ':post');

            task.reply(args);

            task.tryClose();
        };

        var buckStopsHere = function (args, recur, onReply, onFail) {

            var task = new Task(onReply, onFail);

            results.push(args);

            task.reply(args);

            task.tryClose();
        };

        // send a message from this task
        task.sendMessage(buckStopsHere, 'call1', function (args) {

            results.push(args + ':handler');

            // handlers need to close their subtasks
            this.tryClose();
        });

        // send a message from this task
        task.sendMessage(passTheBuck, 'call2', function (args) {

            results.push(args + ':handler');

            // handlers need to close their subtasks
            this.tryClose();
        });

        // send a message from this task
        task.sendMessage(passTheBuck, 'call3', function (args) {

            results.push(args + ':handler');

            // handlers need to close their subtasks
            this.tryClose();
        });

        // send a message from this task
        task.sendMessage(buckStopsHere, 'call4', function (args) {

            results.push(args + ':handler');

            // handlers need to close their subtasks
            this.tryClose();
        });
    },

    "implicit fail handler": function (test) {

        // todo
        test.done();
    },

    "mockup of implicit reply with subtasks and failure": function (test) {

        // mock up a request handler - this would be generated by the compiler

        var requestHandler = function (args, recur, onReply, onFail) {

            // creates a new root task
            var task = new Task(onReply, onFail);

            // can now call task.reply() and task.fail()

            // here's how we make a request

            task.sendMessage(foo, args, function (args) { // a response handler doesn't need an envelope

                // make another request - with no reply handler

                this.sendMessage(bar, args, null, function (args) {  // an error handler

                    console.log("what?! a failure?!");

                    // eventually we'll get to a leaf task like this, and calling complete will actually complete the subtask in the parent
                    this.tryClose();
                });

                this.sendMessage(baz, args, function (args) {  // a response handler doesn't need an envelope

                    // eventually we'll get to a leaf task like this, where calling tryClose will succeed in closing the task
                    this.tryClose();

                });

                this.tryClose();

            });

            // another request at this level could just overwrite subtask - we're done with that value
            // or we could do something where creating a subtask takes the handlers and binds them itself...

            task.tryClose();
        };

        // set up some stubs for our request handler to send messages to

        var foo = function (args, recur, reply, fail) {
            console.log("i am foo");
            process.nextTick(reply);
        };

        var bar = function (args, recur, reply, fail) {
            console.log("i am bar!");
            process.nextTick(fail);
        };

        var baz = function (args, recur, reply, fail) {
            console.log("I am a BANANA!");
            process.nextTick(reply);
        };

        requestHandler([], requestHandler, function () {
            test.done();
        }, function () {
            test.fail();
        });
    }
};