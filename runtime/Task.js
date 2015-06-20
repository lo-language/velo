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
 * Both request tasks and response tasks can have subtasks, but a request task is always the root
 * and only a request task can only be the root. This creates a structure similar to a call stack,
 * but not a call stack.
 *
 * @return {*}
 */

var __ = function (onReply, onFail) {

    this.subtasks = 0;
    this.onReply = onReply;
    this.onFail = onFail;
};

__.prototype.reply = function (args) {

    if (this.onReply !== null) {

        // send the reply message
        process.nextTick(this.onReply.bind(null, args));

        // self-destruct
        this.onFail = this.onReply = null;
    }
};

__.prototype.fail = function (args) {

    if (this.onFail !== null) {

        // send the fail message
        process.nextTick(this.onFail.bind(null, args));

        // self-destruct
        this.onReply = this.onFail = null;
    }
};

__.prototype.createSubtask = function () {

    this.subtasks++;

    var subtask = new __();

    subtask.parent = this;

    return subtask;
};

/**
 * Tries to close this task - which means close it unless there are open subtasks.
 *
 * We shouldn't need to track the closed state since that's just subtasks == 0
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

__.prototype.completeSubtask = function () {

    this.subtasks--;
    this.tryClose();
};

__.prototype.sendMessage = function (target, args, onReply, onFail) {

    var subtask = new __();

    this.subtasks++;

    subtask.parent = this;

    // we bind the subtask to make it available to the handlers as 'this'
    // specifically so we can call sendMessage and tryClose on it

    // todo where do we create the implicit fail handler?

    // send the message
    // might want to nexttick this...
    target(args, target, onReply ? onReply.bind(subtask) : undefined, onFail ? onFail.bind(subtask) : undefined);
};

module.exports = __;