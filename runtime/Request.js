"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Models an Exa request to handle the bookkeeping.
 *
 * Both request handlers and response handlers can send subrequests, but all subrequests are attached to a parent request.
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

    this.subRequests = 0;
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

        // send the reply message, with this bound to this request
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
 * Tries to close this task - it will close unless there are open subrequests.
 * Close in this case is the bookkeeping sense.
 * When we close, we trigger a default reply.
 *
 * We shouldn't need to track the closed state separately since that's just subtasks == 0
 */
__.prototype.tryClose = function (name) {

//    console.error("trying to close " + this.name);

    // make sure there aren't any open subrequests
    if (this.subRequests > 0) {
//        console.error("... but has " + this.subRequests + " pending subrequests");
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

//    console.error("checking off subrequest of: " + this.name);
    this.subRequests--;
    this.tryClose();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    // todo don't track this request if no response handlers were provided


    this.children = this.children || 1;

    // create the subrequest and if it has handlers, wire it up to check itself off when it responds
    // also wire up onReply and onFail to this (parent) request
    // todo - clean this up - not sure this is the best place to bind to parent request

    var request = new __(onReply ? onReply.bind(this) : null, onFail ? onFail.bind(this) : null, this.checkOff.bind(this));
    request.name = this.name + ':child' + this.children++;

    if (onReply || onFail) {
        this.subRequests++;
    }

    // send the message by calling the JS function for the procedure with 'this' bound to this Request
    // we also bind the subtask to the handlers so they can call sendMessage and tryClose via 'this'
//console.error("scheduling request: " + request.name + " (" + args + ")");
    setImmediate(fn.bind(request, fn, args));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and sends a root request with the given args.
 *
 * @param fn
 * @param args
 * @param onReply
 * @param onFail
 */
__.sendRootRequest = function (fn, args, onReply, onFail) {

    var request = new __(onReply, onFail);

    request.name = 'root';

    setImmediate(fn.bind(request, fn, args));
};

module.exports = __;