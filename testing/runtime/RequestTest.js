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

var Request = require('../../runtime/Request');
var util = require('util');

module.exports = {

    "reply kills further response": function (test) {

        test.expect(1);

        var request = new Request(function (args) {
            test.equal(args, "foo");
            test.done();
        }, function (args) {
            test.fail();
        });

        request.reply("foo");
        request.reply("boo");
        request.fail("boo");
        request.fail("foo");
        request.reply("foo");
    },

    "fail kills further response": function (test) {

        test.expect(1);

        var request = new Request(function (args) {
            test.fail();
        }, function (args) {
            test.equal(args, "foo");
            test.done();
        });

        request.fail("foo");
        request.reply("foo");
        request.reply("boo");
        request.fail("foo");
        request.reply("foo");
    },

    "implicit reply on close": function (test) {

        test.expect(1);

        var request = new Request(function (args) {
            test.equal(args, undefined);
            test.done();
        }, function (args) {
            test.fail();
        });

        request.tryClose();
    },

    "no implicit reply after reply": function (test) {

        test.expect(1);

        var request = new Request(function (args) {
            test.equal(args, "foo");
            test.done();
        }, function (args) {
            test.fail();
        });

        request.reply("foo");
        request.tryClose();
    },

    "no implicit reply after fail": function (test) {

        test.expect(1);

        var request = new Request(function (args) {
            test.fail();
        }, function (args) {
            test.equal(args, "boo");
            test.done();
        });

        request.fail("boo");
        request.tryClose();
    },

    "close waits for one message": function (test) {

        test.expect(6);

        var collector = '';

        var request = new Request(function (args) {
            test.equal(args, undefined); // implicit reply sends no args
            test.equal(collector, 'foobar');
            test.done();
        }, function (args) {
            test.fail();
        });

        // model the message receiver
        var requestHandler = function (recur, args) {

            test.equal(args, 'foo');
            test.equal(collector, '');
            collector += args;

            this.reply('bar');
            this.tryClose();
        };

        // send a message from this request
        request.sendMessage(requestHandler, 'foo', function (args) {

            test.equal(args, 'bar');
            test.equal(collector, 'foo');
            collector += args;

            // handlers need to close their subrequests
            this.tryClose();
        });

        // shouldn't fire implicit reply until the message has been processed
        request.tryClose();
    },

    "close doesn't wait for message with no handlers": function (test) {

        // model the message receiver
        var requestHandler = function (recur, args) {

            // send a message from this request
            this.sendMessage(function (recur, args) {
                // do nothing
                console.error(args);

            }, 'foo', null, null);

            // should succeed because we didn't attach handlers to that message
            this.tryClose();
        };

        // todo send a root request
        Request.sendRootRequest(requestHandler, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    },

    "close waits for multiple subrequests": function (test) {

        test.expect(7);

        var request = new Request(function (args) {
            test.equal(expected.length, 0);
            test.done();
        }, function (args) {
            test.fail();
        });

        var expected = ['foo', 'bar', 'baz'];
        var replies = ['boo', 'zar', 'maz'];

        // model a message receiver
        var transmogrify = function (recur, args) {

            test.equal(args, expected.shift());
            this.reply(replies.shift());

            this.tryClose();
        };

        // send a message from this request
        request.sendMessage(transmogrify, 'foo', function (args) {

            test.equal(args, 'boo');

            // handlers need to close their subrequests
            this.tryClose();
        });

        // send a message from this request
        request.sendMessage(transmogrify, 'bar', function (args) {

            test.equal(args, 'zar');

            // handlers need to close their subrequests
            this.tryClose();
        });

        // send a message from this request
        request.sendMessage(transmogrify, 'baz', function (args) {

            test.equal(args, 'maz');

            // handlers need to close their subrequests
            this.tryClose();
        });

        // shouldn't fire implicit reply
        request.tryClose();
    },

    "close waits for nested subrequests": function (test) {

        test.expect(1);

        var results = [];

        // create the root request
        console.error("create root");
        var request = new Request(function (args) {

            console.error('response handler for ' + this.name);

            test.deepEqual(results, [
                'call1',
                'call2:pre',
                'call2:post',
                'call3:pre',
                'call3:post',
                'call4',
                'call1:handler',
                'call2:subcall',
                'call3:subcall',
                'call4:handler',
                'call2:subcall:handler',
                'call3:subcall:handler',
                'call2:handler',
                'call3:handler'
            ]);

            test.done();
        }, function (args) {
            test.fail();
        });

        request.name = 'root';

        var passTheBuck = function (recur, args) {

            console.error('request handler B for ' + this.name);

            // send a submessage

            results.push(args + ':pre');

            var outer = this;

            // send a message from this request - root:child2:child1
            this.sendMessage(buckStopsHere, args + ':subcall', function (response) {

                console.error('response handler Z for ' + this.name);
                results.push(response + ':handler');

                // could inherit parent reply?
                outer.reply(args);
            });

            results.push(args + ':post');

            // this is a weird and tricky case! because we're scheduling a reply before we hear back
            // from the message we just sent, but which has a handler!!
//            this.reply(args);
            this.tryClose();
        };

        var buckStopsHere = function (recur, args) {

            console.error('request handler A for ' + this.name);

            results.push(args);

            this.reply(args);
            this.tryClose();
        };

        // send a message from this request - root:child1
        request.sendMessage(buckStopsHere, 'call1', function (args) {

            console.error('response handler X for ' + this.name);
            results.push(args + ':handler');
        });

        // send a message from this request - root:child2
        request.sendMessage(passTheBuck, 'call2', function (args) {

            console.error('response handler Y for ' + this.name);
            results.push(args + ':handler');
        });

        // send a message from this request
        request.sendMessage(passTheBuck, 'call3', function (args) {

            results.push(args + ':handler');
        });

        // send a message from this request
        request.sendMessage(buckStopsHere, 'call4', function (args) {

            results.push(args + ':handler');
        });

        request.tryClose('c');
    },

    "implicit fail handler": function (test) {

        // todo
        test.done();
    },

    "mockup of implicit reply with subrequests and failure": function (test) {

        // mock up a request handler - this would be generated by the compiler

        var requestHandler = function (recur, args) {

            // here's how we make a request

            this.sendMessage(foo, args, function (args) { // a response handler doesn't need an envelope

                // make another request - with no reply handler

                this.sendMessage(bar, args, null, function (args) {  // an error handler

                    console.log("what?! a failure?!");

                    // eventually we'll get to a leaf request like this, and calling complete will actually complete the subrequest in the parent
                    this.tryClose();
                });

                this.sendMessage(baz, args, function (args) {  // a response handler doesn't need an envelope

                    // eventually we'll get to a leaf request like this, where calling tryClose will succeed in closing the request
                    this.tryClose();

                });

                this.tryClose();

            });

            // another request at this level could just overwrite subrequest - we're done with that value
            // or we could do something where creating a subrequest takes the handlers and binds them itself...

            this.tryClose();
        };

        // set up some stubs for our request handler to send messages to

        var foo = function (recur, args, reply, fail) {
            console.log("i am foo");
            this.reply();
        };

        var bar = function (recur, args, reply, fail) {
            console.log("i am bar!");
            this.fail();
        };

        var baz = function (recur, args, reply, fail) {
            console.log("I am a BANANA!");
            this.reply();
        };

        // todo send a root request
        Request.sendRootRequest(requestHandler, [], function () {
            test.done();
        }, function () {
            test.fail();
        });
    }
};