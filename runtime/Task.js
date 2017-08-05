/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Models a Lo task
 *
 * open questions: what happens to pending responses after a task responds?
 *
 * @param succ  success continuation
 * @param fail  failure continuation
 */
var __ = function (succ, fail) {

    this.successCont = succ;
    this.failureCont = fail;

    this.blocked = false;   // queuing async responses?
    this.pendingReqs = 0;   // count of pending async requests (no response yet)
    this.responses = [];    // queued responses
    this.hasResponded = false;
};


__.prototype.sendOneWay = function (address, args) {

    // todo

    // also todo - trigger auto-respond from a service that makes no requests
};

/**
 * Send a non-blocking message.
 *
 * @param address
 * @param args
 * @param succ
 * @param fail
 */
__.prototype.sendAsync = function (address, args, succ, fail) {

    this.pendingReqs++;

    // we use nextTick to make sure it doesn't respond before we've even had a chance to
    // register following blocking calls

    process.nextTick(address, args,

        // we wrap the continuations in bookkeeping and queueing logic
        // to implement our message handling semantics

        (resp) => {

            this.pendingReqs--;

            if (this.blocked) {
                this.responses.push(succ.bind(null, resp));
            }
            else {
                if (succ) succ(resp);

                // see if we've now completed and should auto-respond; not factored out for perf
                if (this.pendingReqs == 0 && this.responses.length == 0 && this.hasResponded == false) {
                    this.succ();
                }
            }
        },

        (resp) => {

            this.pendingReqs--;

            if (this.blocked) {
                this.responses.push(fail.bind(null, resp));
            }
            else {
                if (fail) fail(resp);

                // see if we've now completed and should auto-respond; not factored out for perf
                if (this.pendingReqs == 0 && this.responses.length == 0 && this.hasResponded == false) {
                    this.succ();
                }
            }
        });
};

/**
 * Send a blocking message.
 *
 * @param address
 * @param args
 * @param succ
 * @param fail
 */
__.prototype.sendAndBlock = function (address, args, succ, fail) {

    // enable queuing of responses
    this.blocked = true;

    // we need to process the response queue here because this may be our
    // last opportunity to do so
    address(args,

        (resp) => {

            this.blocked = false;
            if (succ) succ(resp);
            this.processResponses();
        },

        (resp) => {

            this.blocked = false;
            if (fail) fail(resp);
            this.processResponses();
        });
};

/**
 * Drains the response queue.
 * Iterates via recursion so as not to improperly ignore blocking calls spawned in a loop.
 */
__.prototype.processResponses = function () {

    if (this.blocked || this.responses.length == 0) {
        return;
    }

    // pull off a response and run it
    this.responses.shift().call();

    // see if we've now completed and should auto-respond; not factored out for perf
    if (this.pendingReqs == 0 && this.responses.length == 0 && this.hasResponded == false) {
        this.succ();
    }

    // iterate and hopefully don't break the stack...
    if (this.responses.length > 0) {
        this.processResponses();
    }
};

/**
 * Signal success to caller.
 *
 * @param resp
 */
__.prototype.succ = function (resp) {

    // prevent multiple responses
    if (this.hasResponded) {
        return;
    }

    this.hasResponded = true;
    this.successCont(resp);
};

/**
 * Signal failure to caller.
 *
 * @param resp
 */
__.prototype.fail = function (resp) {

    // prevent multiple responses
    if (this.hasResponded) {
        return;
    }

    this.hasResponded = true;
    this.failureCont(resp);
};


/**
 * On exit from a procedure function we call this to see if we need to auto-reply.
 *
 * This would be a perfect job for a scope guard destructor.
 *
 * todo rename this checkStatus? autoReply? better yet, inline it
 */
__.prototype.deactivate = function () {

    // make sure there are zero outstanding requests

    if (this.blocked == false && this.pendingReqs == 0 && this.hasResponded == false) {
        this.succ();
    }
};

/**
 * Attaches an external async call to this task and returns a wrapped callback to take care
 * of the bookkeeping.
 *
 * Produces a callback that handles the bookkeeping.
 * Weaves a request into this task.
 *
 * todo how does this interact with blocking/non-blocking calls/auto-reply?
 *
 * todo rename attach? await? waitFor? register? callAndWait? weave? insert?
 *
 * @param cb    callback
 * @returns {function()}
 */
__.prototype.doAsync = function (cb) {

    this.pendingReqs++;

    var t = this;

    return function () {
        t.pendingRequests--;
        cb();
    };
};


__.sendRootRequest = function (service, args, succ, fail) {

    service(args, succ, fail);
};

module.exports = __;