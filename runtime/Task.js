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


/**
 * Models an Exa task, either for processing a request or a response, to handle the bookkeeping.
 *
 * Both request tasks and response tasks can have subtasks, but a request task must be at the root.
 * This creates a structure similar to a call stack, but as a tree.
 *
 * Takes a reply handler and a fail handler.
 *
 * @return {*}
 */
var __ = function (onReply, onFail) {

    this.subtasks = 0;
    this.onReply = onReply;
    this.onFail = onFail;
};

/**
 * Sends a reply to the requestor.
 *
 * @param args
 */
__.prototype.reply = function (args) {

    if (this.onReply !== null && typeof this.onReply !== "undefined") {

        // send the reply message
        process.nextTick(this.onReply.bind(null, args));

        // destroy our ability to respond again
        this.onFail = this.onReply = null;
    }
};

/**
 * Sends a failure message to the requestor.
 *
 * @param args
 */
__.prototype.fail = function (args) {

    if (this.onFail !== null && typeof this.onFail !== "undefined") {

        // send the fail message
        process.nextTick(this.onFail.bind(null, args));

        // destroy our ability to respond again
        this.onReply = this.onFail = null;
    }
};

/**
 * Tries to close this task - it will close unless there are open subtasks. Close in this case is the bookkeeping
 * sense.
 *
 * We shouldn't need to track the closed state separately since that's just subtasks == 0
 */
__.prototype.tryClose = function () {

    // make sure there aren't any open subtasks
    if (this.subtasks > 0) {
        return;
    }

    if (this.parent) {
        this.parent.completeSubtask();
    }
    else {
        // this is a root task; issue the implicit reply
        this.reply();
    }
};

/**
 * Marks a subtask complete for bookkeeping. We don't care about which subtask.
 */
__.prototype.completeSubtask = function () {

    this.subtasks--;
    this.tryClose();
};

/**
 * Sends a message and makes note of a subtask for this task, since we can't consider our task complete
 * if there are still child tasks kicking around for which we're expecting a response.
 *
 * @param address   address where the message should be sent
 * @param args      args for the message
 * @param onReply   callback for success response
 * @param onFail    callback for failure response
 */
__.prototype.sendMessage = function (address, args, onReply, onFail) {

    var subtask = new __();

    // todo don't increment if there's no response handlers provided
    this.subtasks++;

    subtask.parent = this;

    // we bind the subtask to make it available to the handlers as 'this'
    // specifically so we can call sendMessage and tryClose on it

    // todo where do we create the implicit fail handler?

    // send the message

    process.nextTick(
        function () {
            address(args, address, onReply ? onReply.bind(subtask) : undefined, onFail ? onFail.bind(subtask) : undefined);
        }
    );

    // we could actually just create a new root Task object here and pass that instead of onReply & onFail...
    // and then the request handler wouldn't have to create that task as the first thing it does
    // will also need to pass connect
    // we could call target and bind the root Task to it, so it could use 'this' like a handler
};

module.exports = __;