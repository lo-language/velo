"use strict";

// Exa Messages are implemented in JS as closures bound to the single argument that is the message body.
// So they're basically little self-contained capsules of logic that just need to be executed at the right time.

// A task has two states: busy and waiting
// busy is when the task is operating; waiting is when it's waiting for replies
// it flips between them based on its activity

// Exa closures (handlers & nested services) are implemented directly as JS closures for now.

// The Task Tree grows bread-first, except for sync messages, that are explored depth-first.
// is the Task Tree created *breadth-first*, or does it explore down depth first but not wait for replies?
// we could actually have a run-time switch to set the task-processing strategy, and thus test a program for
// dangerous assumptions

const util = require('util');
const EventEmitter = require('events');
const LOG_ENABLE = false;

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
var __ = function (name, service, args) {

    EventEmitter.call(this);

    this.name = name;
    this.service = service;
    this.args = args;

    this.hasResponded = false;

    this.sentMessages = 0;
    this.outstandingRequests = 0;
    this.pendingReplies = [];
    this.busy = true;

    this.log = LOG_ENABLE ? console.error : function () {};
};

util.inherits(__, EventEmitter);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Emits a response, provided we haven't already responded.
 *
 * @param type  "reply" or "fail"
 * @param args
 */
__.prototype.respond = function (type, args) {

    // todo this method is so simple we should probably inline it in codegen

    if (this.hasResponded) {
        // todo throw a warning
        return;
    }

    this.hasResponded = true;
    this.emit(type, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Sends a message after creating a subrequest under this request, since we can't consider our task complete
 * if there are still child tasks kicking around for which we're expecting a response.
 *
 * @param service   target Exa service (JS function that takes a task)
 * @param args      array of args for the function
 * @param onReply   callback for success response
 * @param onFail    callback for failure response
 * @param doSync    message is synchronous; skip the replies queue
 */
__.prototype.sendMessage = function (service, args, onReply, onFail, doSync) {

    var task = new __('xx', service, args);

    var requestId = this.sentMessages++;

    var _this = this;

    if (onReply) {

        task.on('reply', function (args) {

            _this.log(["received REPLY for request " + requestId, args]);

            if (doSync) {

                // skip the queue!
                onReply(args);
            }
            else {
                _this.acceptResponse(onReply.bind(null, args));
            }
        });
    }

    if (onFail) {

        task.on('fail', function (args) {

            _this.log(["received FAIL for request " + requestId, args]);

            if (doSync) {

                // skip the queue!
                onFail(args);
            }
            else {
                _this.acceptResponse(onFail.bind(null, args));
            }
        });
    }

    if (onFail || onReply) {
        this.log(["sending request " + requestId, task]);

        if (!doSync) {

            // record the outstanding request in our ledger
            this.outstandingRequests++;
        }
    }
    else {
        this.log(["dispatching message " + requestId, task]);
        // we make no record of a message dispatched without the ability to respond
    }

    // send the message
    service(task);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enqueue the response.
 */
__.prototype.acceptResponse = function (handler) {

    // debit the outstanding requests account
    this.outstandingRequests--;

    // credit the pending replies account
    this.pendingReplies.push(handler);

    if (this.busy == false) {
        setImmediate(this.processReplies.bind(this));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Changes state to start processing replies.
 */
__.prototype.pickupReplies = function () {

    this.busy = false;
    this.log(['picking up replies', this]);

    // see if our work is already complete

    if (this.outstandingRequests == 0 &&
        this.pendingReplies.length == 0) {

        // issue a default reply
        this.log(['emmitting default reply']);
        this.respond("reply");
        return;
    }

    // process any replies we've already received
    this.processReplies();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Process all enqueued replies.
 */
__.prototype.processReplies = function () {

    if (this.pendingReplies.length == 0) {
        return;
    }

    this.log(['processing replies']);

    // we're busy when we're in a response handler
    this.busy = true;

    this.pendingReplies.forEach(function (responseHandler) {

        // a pending reply is a handler closure bound to the reply body so we just have to execute it
        responseHandler();
    });

    this.pendingReplies = [];

    // ok, we're not busy anymore - go back to waiting
    this.pickupReplies();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Process the given reply
 *
 * @param reply
 */
__.prototype.processReply = function (responseHandler) {

    this.log(['processing reply', reply]);

    // we're busy when we're in a response handler
    this.busy = true;
    responseHandler();

    // see if our work is now done

    if (this.outstandingRequests == 0 &&
        this.pendingReplies.length == 0) {

        // issue a default reply
        this.log(['emmitting default reply']);
        this.respond("reply");
        return;
    }

    // ok, we're not busy anymore - go back to waiting
    this.pickupReplies();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and sends a root request with the given args.
 *
 * @param service   an Exa service function (takes a task)
 * @param args      request args
 * @param onReply
 * @param onFail
 */
__.sendRootRequest = function (service, args, onReply, onFail) {

    // create the root task

    var task = new __('root', service, args);

    task.on("reply", onReply);
    task.on("fail", onFail);

    // kick it off
    service(task);
};

module.exports = __;