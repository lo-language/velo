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
 * Models an Exa request to handle the bookkeeping.
 *
 * Both request handlers and response handlers can send subrequests, but a request task must be at the root.
 * This creates a structure similar to a call stack, but as a tree.
 *
 * Takes a reply handler and a fail handler.
 *
 * @return {*}
 */
var __ = function (onReply, onFail) {

    // todo should we take the target fn and args in this constructor?

    // todo inherit parent's onReply and onFail??

    // should recur be part of the request, not an arg?

    this.subRequests = 0;
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
        process.nextTick(this.onReply.bind(this, args));

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
        process.nextTick(this.onFail.bind(this, args));

        // destroy our ability to respond again
        this.onReply = this.onFail = null;
    }
};

/**
 * Tries to close this task - it will close unless there are open subrequests. Close in this case is the bookkeeping
 * sense.
 *
 * We shouldn't need to track the closed state separately since that's just subtasks == 0
 */
__.prototype.tryClose = function () {

    // make sure there aren't any open subrequests
    if (this.subRequests > 0) {
        return;
    }

    if (this.parent) {
        this.parent.completeSubrequest();
    }
    else {
        // this is a root task; issue the implicit reply
        this.reply();
    }
};

/**
 * Marks a subtask complete for bookkeeping. We don't care about which subtask.
 */
__.prototype.completeSubrequest = function () {

    this.subRequests--;
    this.tryClose();
};

/**
 * Sends a message after creating a subrequest under this request, since we can't consider our task complete
 * if there are still child tasks kicking around for which we're expecting a response.
 *
 * @param fn        function to be called for this request
 * @param args      array of args for the function
 * @param onReply   callback for success response
 * @param onFail    callback for failure response
 */
__.prototype.sendMessage = function (fn, args, onReply, onFail) {

    // create the subrequest

    var request = new __(onReply, onFail);

    // todo don't track this request if no response handlers were provided

    request.parent = this;
    this.subRequests++;

    // send the message by calling the JS function for the procedure with 'this' bound to this Request
    // we also bind the subtask to the handlers so they can call sendMessage and tryClose via 'this'

    process.nextTick(fn.bind(request, fn, args));
};

/**
 * Creates and sends a root request.
 *
 * @param fn
 * @param args
 * @param onReply
 * @param onFail
 */
__.sendRootRequest = function (fn, args, onReply, onFail) {

    var request = new __(onReply, onFail);

    process.nextTick(fn.bind(request, fn, args));
};

module.exports = __;