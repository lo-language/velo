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

const Task = require('../../runtime/Task2');
const fs = require('fs');


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

var bar = function (args, succ, fail) {

    var task = new Task();

    fs.readFile('../../' + args[0], args[1], function (err, res) {
        succ(res);
    });
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

        test.expect(1);

        var task = new Task(
            function (args) {
                test.ok(args === undefined);
                test.done();
            }, null);


    },
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

        root.sendAsync(bar, [".travis.yml", 'utf8'], function (result) {
            order = order.concat('C');
        });

        root.sendAndBlock(bar, ["vancleve.png", ''], function (result) {
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