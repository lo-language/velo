"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Models an Exa task to handle the bookkeeping.
 *
 * Both request handlers and response handlers can send subTasks, but all subTasks are attached to a parent request.
 * This creates a request tree which serves a similar purpose to a call stack.
 *
 * Takes a reply handler and a fail handler.
 *
 * @return {*}
 */
var __ = function (onReply, onFail, onComplete) {

    // todo should we take the target fn and args in this constructor?

    // todo inherit parent's onReply and onFail??

    // should recur be part of the request, not an arg?
    // proc sig should be function (args, task) or we can try to make a task in each proc?
    // where task has reply, fail, etc.

    this.subTasks = 0;
    this.onReply = onReply; // already bound to parent request
    this.onFail = onFail;   // ditto
    this.onComplete = onComplete;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a reply to the requestor, provided we haven't already responded.
 *
 * @param args
 */
__.prototype.reply = function (args) {

    if (this.onReply !== null && typeof this.onReply !== "undefined") {

//        console.error("scheduling reply for " + this.name);

        // send the reply message

        var response = this.onReply;
        var t = this;

        setImmediate(function () {
            response(args);

//            console.error("signaling completion of: " + t.name);

            // report back to the parent request that we've completed
            // onComplete is actually bound to the parent, despite how we're calling it
            t.onComplete && t.onComplete();
        });

        // immediately destroy our ability to respond again
        this.onFail = this.onReply = null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a failure message to the requestor, provided we haven't already responded.
 *
 * @param args
 */
__.prototype.fail = function (args) {

    if (this.onFail !== null && typeof this.onFail !== "undefined") {

        // send the fail message, with this bound to the *parent* request
        var response = this.onFail.bind(this, args);
        var t = this;
        setImmediate(function () {
            response();

//            console.error("signaling completion of: " + t.name);

            // report back to the parent request that we've completed
            // onComplete is actually bound to the parent, despite how we're calling it
            t.onComplete && t.onComplete();
        });

        // immediately destroy our ability to respond again
        this.onReply = this.onFail = null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Tries to close this task - it will close unless there are open subTasks.
 * Close in this case is the bookkeeping sense.
 * When we close, we trigger a default reply.
 *
 * We shouldn't need to track the closed state separately since that's just subtasks == 0
 */
__.prototype.tryClose = function (name) {

//    console.error("trying to close " + this.name);

    // make sure there aren't any open subTasks
    if (this.subTasks > 0) {
//        console.error("... but has " + this.subTasks + " pending subTasks");
        return;
    }

//    console.error("closing with default reply");
    this.onReply && this.reply();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Marks a subtask complete for bookkeeping. We don't care about which subtask.
 */
__.prototype.checkOff = function () {

//    console.error("checking off subtask of: " + this.name);
    this.subTasks--;
    this.tryClose();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a message after creating a subrequest under this request, since we can't consider our task complete
 * if there are still child tasks kicking around for which we're expecting a response.
 *
 * @param fn        target Exa service (JS function that takes a task)
 * @param args      array of args for the function
 * @param onReply   callback for success response
 * @param onFail    callback for failure response
 */
__.prototype.sendMessage = function (fn, args, onReply, onFail) {

    // todo don't track this request if no reply handlers were provided


    this.children = this.children || 1;

    // create the subrequest and if it has handlers, wire it up to check itself off when it responds
    // also wire up onReply and onFail to this (parent) task
    // todo - clean this up - not sure this is the best place to bind to parent request

    var task = new __(onReply ? onReply.bind(this) : null, onFail ? onFail.bind(this) : null, this.checkOff.bind(this));
    task.name = this.name + ':child' + this.children++;
    task.recur = fn;
    task.args = args;

    if (onReply || onFail) {
        this.subTasks++;
    }

    // send the message by calling the JS function for the procedure with 'this' bound to this Request
    // we also bind the subtask to the handlers so they can call sendMessage and tryClose via 'this'
//console.error("scheduling request: " + request.name + " (" + args + ")");
    setImmediate(fn.bind(null, args, task));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and sends a root request with the given args.
 *
 * @param fn        an Exa service function (takes a task)
 * @param args
 * @param onReply
 * @param onFail
 */
__.sendRootRequest = function (fn, args, onReply, onFail) {

    // create the root task

    var task = new __(onReply, onFail);

    task.name = 'root';
    task.recur = fn;
    task.args = args;

    // maybe a request is something you can call send on?
    // and that calls setimmediate?
    //request.send();

    // or maybe a request is something you can call setImmediate on?
    // so it's the target fn bound to its args?
    //setImmediate(request);

    // should a proc get both a request and a task?
    // calls reply/fail on request and sendmessage/tryclose on task?
    // or should a task have the request built into it?

    setImmediate(fn.bind(null, args, task));
};

module.exports = __;