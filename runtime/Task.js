"use strict";
/**
 * How this works:
 *
 * When you send a message, if you care about receiving a response to it, you make a note.
 *
 * If the message is synchronous, you don't make a note because you just sit there waiting until you
 * get the response back, then you execute the appropriate handler and move on.
 *
 * If responses to async messages come in while you're waiting on a sync message, you
 * paper-clip those responses to their respective notes to be processed later; when you're available,
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
 * Both request handlers and response handlers can create subTasks, but all subTasks are
 * attached to a parent request.
 *
 * This creates a request tree which serves a similar purpose to a call stack.
 *
 * @param service   the service performing this task - we only need this to support recur()
 * @param args      the args for this task
 * @param onReply
 * @param onFail
 * @param blocking
 */
var __ = function (service, args, onReply, onFail, blocking) {

    this.service = service;
    this.args = args;
    this.onReply = onReply;
    this.onFail = onFail;
    this.blocking = blocking || false;
    this.gotResponse = false;
    this.parent = null;

    this.blocked = false;
    this.pendingSubtasks = 0;
    this.responseQueue = [];
    this.isAsync = false;   // guilty till proven innocent

    this.log = LOG_ENABLE ? console.error : function () {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a response, or queues one to be sent, provided we haven't already responded.
 *
 * @param type  "reply" or "fail"
 * @param args
 */
__.prototype.respond = function (type, args) {

    // disregard redundant responses
    if (this.gotResponse) {
        // ??? throw a warning here?
        return;
    }

    this.gotResponse = true;

    if (this.blocking) {

        // the parent task is blocking on this subtask
        // unblock the parent
        this.parent && (this.parent.blocked = false);

        // fire the handler pronto
        (type == 'reply' ? this.onReply : this.onFail)(args);
    }
    else if (this.parent) {
        this.parent.enqueueResponse((type == 'reply' ? this.onReply : this.onFail).bind(null, args));

        if (this.isAsync) {
            this.parent.processResponses();
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.enqueueResponse = function (event) {

    this.responseQueue.push(event);
    this.pendingSubtasks--;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a message after creating a subtask under this task. We can't consider our task complete
 * if there are still child tasks kicking around for which we're expecting a response.
 *
 * @param service       target Exa service (JS function that takes a task)
 * @param args          array of args for the function
 * @param replyHandler  callback for success response
 * @param failHandler   callback for failure response
 * @param block         block on this message
 */
__.prototype.sendMessage = function (service, args, replyHandler, failHandler, block) {

    var subtask = new __(service, args, replyHandler, failHandler, block);

    if (replyHandler || failHandler) {
        this.log(["sending request ", subtask]);

        subtask.parent = this;

        if (block) {
            this.blocked = true;
        }
        else {
            this.pendingSubtasks++;
        }
    }
    else {
        this.log(["dispatching message ", subtask]);
        // we make no record of a message dispatched without the ability to respond
    }

    // send the message
    service(subtask);

    // we can look at subtask.gotResponse to see if it's synchronous here
    //if (subtask.gotResponse) {
    //    console.log('sync! I got you!');
    //}
    //else {
    //    console.log('async! nice1');
    //}
    // NOW enable the message to after it enqueues
    // this ensures any *synchronous* service won't have its handlers run
    subtask.isAsync = true;

    // return the subtask for use as a future
    return subtask;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Changes state to start processing replies.
 */
__.prototype.processResponses = function () {

    if (this.blocked) {
        return;
    }

    this.log(['processing queued responses', this]);

    // see if our work is already complete


    // pull each task off as we enable handlers - then he's on his own
    // how do we process tasks added by a handler?
    // it's all sync, right? can we make this fn auto called after return of service method?

    // todo - will this pick up subtasks added in processing an existing one??
    //this.subtasks = this.subtasks.reduce(function (accum, task) {

        // rename to processReply()?
        // rename subtasks to outstandingsubtasks
        // can see if the subtask has a response here
        // if we call enablehandlers and there *isn't* a response, we need to subscribe
        // so that the parent task is then informed when it gets a response - it enters listen mode
        // and it needs to call the handler *first* before checking its state
        // and when it's informed, it'll remove something from a list and see if it's all done
        // maybe the listener is this function? so as a response comes into a waiting task,
        // we execute its handlers (which may add subtasks here) and the call processResponses again?
        // what if we're waiting on a nested sync call,
        // and the response to an earlier async call comes in, because it's already been activated??
        // should that be allowed? can that happen?
        // i suspect we should disallow that, so nothing else can happen in a service while it's waiting
        // maybe we overwrite the subtask's onreply?

        // when we send an async message, we write to our journal
        // so: go through subtasks, if has response, pop off and process
        // if no response, say call me when a response comes in, after you run your handler

        // maybe when we're waiting on responses, only one can be picked up at once,
        // rather than enabling them all - it's whoever comes back first
        // and a future changes modes, so it's waiting on *just that one*

        // handlers are never enabled to fire by themselves? tasks just collect their responses
        // if we're going through the journal and there are tasks that don't have responses yet,
        // wire them up so that when they receive a response, they just call back to this function
        // rather than calling onReply();
        // this is the function that calls all handlers! they're never called independently
        // we scan our journal of tasks, and pull off and process any with responses pending
        // and any without responses pending we just have call back here when they get one!
        // except in the case of futures and sync calls - those change modes

    //
    //    if (task.hasResponse) {
    //
    //        // fire the appropriate handler
    //
    //        if (task.response.success) {
    //            task.onReply(task.response.message);
    //        }
    //        else {
    //            task.onFail(this.response.message);
    //        }
    //
    //        // drop the task from the journal
    //        return accum;
    //    }
    //    else {
    //
    //        // tell the task to report back here when its response comes in
    //        task.listener = _this.pickupReplies.bind(_this);
    //
    //        return accum.shift(task);
    //    }
    //
    //}, []);

    // process all the queued events
    while (this.responseQueue.length > 0) {
        this.responseQueue.shift()();
    }

    // the second condition is here in case some events were added in the loop above
    // not sure if that's possible, though
    if (this.pendingSubtasks == 0 && this.responseQueue.length == 0) {

        // issue a default reply
        this.log(['emmitting default reply']);
        this.respond("reply");
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Waits on this task to complete, then calls the given function.
 *
 * @param cb    function to call
 */
__.prototype.wait = function (cb) {

    // todo we want to effectively block all other responses to the parent task now -
    // how do we do that??

    // could separate task and request, and a sync call generates a request (passed to service)
    // but not a task?

    //console.log("wait called");

    //this.parent.blocked = true;

    if (this.gotResponse) {
        cb();
    }
    else {
        this.blocking = true;
    }

    if (this.onReply == null) {
        this.onReply = cb;
    }
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