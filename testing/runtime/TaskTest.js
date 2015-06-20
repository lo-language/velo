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

        var sequence = 0;

        var task = new Task(function (args) {
            test.equal(sequence, 3);
            test.done();
        }, function (args) {
            test.fail();
        });

        // model the message receiver
        var requestHandler = function (args, recur, onReply, onFail) {

            test.equal(args, 42);
            test.equal(sequence, 0);
            sequence++;

            var task = new Task(onReply, onFail);

            task.reply('foo');

            task.tryClose();
        };

        // send a message from this task
        task.sendMessage(requestHandler, 42, function (args) {

            test.equal(args, 'foo');
            test.equal(sequence, 1);
            sequence++;

            // handlers need to close their subtasks
            this.tryClose();
        });

        // shouldn't fire implicit reply
        task.tryClose();

        process.nextTick(function () {

            test.equal(sequence, 2);
            sequence++;
        });
    },

    "close waits for multiple subtasks": function (test) {

        test.expect(1);

        var expecting = false;

        var task = new Task(function (args) {
            test.ok(expecting);
            test.done();
        }, function (args) {
            test.fail();
        });

        var subtask = task.createSubtask();
        var subtask2 = task.createSubtask();
        var subtask3 = task.createSubtask();

        // shouldn't fire implicit reply
        task.tryClose();

        process.nextTick(function () {

            // this shouldn't close it
            subtask.tryClose();
            subtask2.tryClose();

            process.nextTick(function () {

                // open a new subtask, why not?
                var subtask4 = task.createSubtask();

                // this shouldn't close it now
                subtask3.tryClose();

                process.nextTick(function () {

                    expecting = true;

                    // ok, this should close it now
                    subtask4.tryClose();
                });
            });
        });
    },

    "close waits for multiple levels of subtasks": function (test) {

        test.expect(1);

        var expecting = false;

        var task = new Task(function (args) {
            test.ok(expecting);
            test.done();
        }, function (args) {
            test.fail();
        });

        var subtask = task.createSubtask();

        var subtask2 = subtask.createSubtask();
        var subtask3 = subtask.createSubtask();
        var subtask4 = subtask2.createSubtask();

        subtask.tryClose();
        subtask2.tryClose();
        subtask3.tryClose();

        process.nextTick(function () {

            expecting = true;

            // this should close them all up now
            subtask4.tryClose();
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