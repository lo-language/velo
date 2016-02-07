"use strict";
/**
 * How this works:
 *
 * When you send a message, if you care about receiving a response to it, you make a note.
 *
 * If the message is synchronous, you don't make a note because you just sit there waiting until you
 * get the response back, then you execute the appropriate handler and move on.
 *
 * If responses to earlier async messages came in while you were waiting on a sync message, you've
 * paper-clipped those responses to their respective notes to be processed later; when you're available,
 * you go through your list of notes, and for any with a response clipped to it, you execute its handler,
 * then discard it. Note that its handler could result in more messages being sent, and more notes being created.
 *
 * If there are any notes without responses, and there's nothing to do at the moment, you relax - when
 * a response comes in, you process the handler then discard the note.
 *
 * If you reach a point when you're done executing handlers and there are no more receipts, you're done -
 * you can send a default reply.
 */

// Exa Messages are implemented in JS as closures bound to the single argument that is the message body.
// So they're basically little self-contained capsules of logic that just need to be executed at the right time.

// Exa closures (handlers & nested services) are implemented directly as JS closures for now.

// The Task Tree grows breadth-first, except for sync messages, which are explored depth-first.

// is the Task Tree created *breadth-first*, or does it explore down depth first but not wait for replies?
// we could actually have a run-time switch to set the task-processing strategy, and thus test a program for
// dangerous assumptions

const util = require('util');
const LOG_ENABLE = false;

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Models an Exa task to handle the bookkeeping.
 *
 * Both request handlers and response handlers can send subTasks,
 * but all subTasks are attached to a parent request.
 * This creates a request tree which serves a similar purpose to a call stack.
 *
 * Takes a reply handler and a fail handler.
 *
 * @param service   the service performing this task - we only need this to support recur()
 * @param args      the args for this task
 * @param onReply
 * @param onFail
 * @param isSync
 */
var __ = function (service, args, onReply, onFail, isSync) {

    this.service = service;
    this.args = args;
    this.onReply = onReply;
    this.onFail = onFail;

    // pre-enable for sync requests so responses are handled immediately
    // rather than waiting for the procedure to complete
    this.handlersEnabled = isSync || false;

    this.subTasks = [];

    this.hasResponded = false;

    this.log = LOG_ENABLE ? console.error : function () {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Emits a response, provided we haven't already responded.
 *
 * @param type  "reply" or "fail"
 * @param args
 */
__.prototype.respond = function (type, args) {

    if (this.hasResponded) {
        // todo throw a warning
        return;
    }

    this.hasResponded = true;

    // like emitting an event that will wait for a listener to be attached

    if (type == 'reply') {

        if (this.handlersEnabled) {
            this.onReply(args);
        }
        else {
            this.response = {success: true, message: args};
        }
    }
    else if (type == 'fail') {

        //this.log(["received FAIL for request " + requestId, args]);

        if (this.handlersEnabled) {
            this.onFail(args);
        }
        else {
            this.response = {success: false, message: args};
        }
    }
    else {
        throw new Error("unknown response type: " + type);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enable handlers to fire as soon as a response is received for this task, or immediately if a
 * response has already been received.
 */
__.prototype.enableHandlers = function () {

    this.handlersEnabled = true;

    // todo make this idempotent?

    if (this.response) {

        if (this.response.success) {
            this.onReply(this.response.message);
        }
        else {
            this.onFail(this.response.message);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a message after creating a subrequest under this request, since we can't consider our task complete
 * if there are still child tasks kicking around for which we're expecting a response.
 *
 * @param service       target Exa service (JS function that takes a task)
 * @param args          array of args for the function
 * @param replyHandler  callback for success response
 * @param failHandler   callback for failure response
 * @param doSync        message is synchronous; skip the replies queue
 */
__.prototype.sendMessage = function (service, args, replyHandler, failHandler, doSync) {

    var subTask = new __(service, args, replyHandler, failHandler, doSync);

    if (replyHandler || failHandler) {
        this.log(["sending request ", subTask]);

        // save a note
        if (!doSync) {
            this.subTasks.push(subTask);
        }
    }
    else {
        this.log(["dispatching message ", subTask]);
        // we make no record of a message dispatched without the ability to respond
    }

    // send the message
    service(subTask);

    // return the subtask for use as a future
    return subTask;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Changes state to start processing replies.
 *
 * todo rename processResponses
 */
__.prototype.pickupReplies = function () {

    this.log(['picking up replies', this]);

    // see if our work is already complete

    //if (this.outstandingRequests == 0 &&
    //    this.pendingReplies.length == 0) {
    //
    //    // issue a default reply
    //    this.log(['emmitting default reply']);
    //    this.respond("reply");
    //    return;
    //}

    // pull each task off as we enable handlers - then he's on his own
    // how do we process tasks added by a handler?
    // it's all sync, right? can we make this fn auto called after return of service method?

    while(this.subTasks.length > 0) {
        this.subTasks.shift().enableHandlers();
    }

    // issue a default reply
    this.log(['emmitting default reply']);
    this.respond("reply");
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and sends a root request with the given args.
 *
 * @param service   an Exa service function (takes a task)
 * @param args      request args
 * @param onReply
 * @param onFail
 */
__.sendRootRequest = function (service, args, onReply, onFail) {

    // create a root task with handlers enabled
    var task = new __(service, args, onReply, onFail, true);

    // kick it off
    service(task);
};

module.exports = __;