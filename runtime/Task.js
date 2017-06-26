/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

var __ = function (service, args, onReply, onFail) {

    this.service = service;
    this.args = args;
    this.onReply = onReply;
    this.onFail = onFail;

    this.active = true;
    this.hasResponded = false;
    this.pendingRequests = 0;
};

__.prototype.respond = function (channel, args) {

    if (this.hasResponded) {
        return;
    }

    this.hasResponded = true;
    this.response = {channel: channel, args: args};

    (channel == 'reply' ? this.onReply : this.onFail).call(null, args);
};

__.prototype.await = function (cont) {

    // can only happen on success

    if (this.hasResponded) {
        cont(this.response.args);
    }
    else {
        // we want the listener to fire *after* the handler does its thing
        this.listener = cont;
    }
};

__.prototype.sendMessage = function (service, args, replyHandler, failHandler) {

    // wrap replyHandler and failHandler to do some bookkeeping
    // we do this even if there aren't handlers because a future listener might
    // be attached later

    var _this = this;

    var task = new __(service, args,
        function (reply) {
            var savedState = _this.active;
            _this.active = true;
            _this.pendingRequests--;
            replyHandler && replyHandler(reply);
            task.listener && task.listener(reply);
            _this.active = savedState;
            _this.checkFinished();
        }, function (reason) {
            _this.pendingRequests--;
            failHandler && failHandler(reason);
            _this.checkFinished();
        });

    // send the message

    this.pendingRequests++;
    service(task);
    task.deactivate();

    return task;
};

__.prototype.deactivate = function () {

    this.active = false;
    this.checkFinished();
};

__.prototype.checkFinished = function () {

    if (this.active == false && this.pendingRequests == 0) {

        // issue default response
        this.respond("reply");
    }
};

/**
 * Registers an async call with this Task and returns a wrapped callback to take care
 * of the bookkeeping.
 *
 * @param cb    callback
 * @returns {function()}
 */
__.prototype.doAsync = function (cb) {

    this.pendingRequests++;

    var t = this;

    return function () {
        t.pendingRequests--;
        cb();
    };
};

// utility methods, probably shouldn't be in here but rather somewhere else in runtime

__.prototype.concat = function (left, right) {

    if (typeof left == 'string' && typeof right == 'string') {
        return left + right;
    }

    if (Array.isArray(left)) {
        return left.concat(right);
    }

    if (Array.isArray(right)) {
        return [left].concat(right);
    }

    return [left, right];
};

__.prototype.cardinality = function (val) {

    if (typeof val === 'string') {
        return val.length;
    }
    else if (Array.isArray(val)) {
        return val.length;
    }
    else if (typeof val === 'object') {
        return Object.keys(val).length;
    }
};

__.prototype.in = function (item, collection) {

    if (Array.isArray(collection)) {
        return collection.indexOf(item) >= 0;
    }
    else if (typeof collection === 'object') {
        return collection.hasOwnProperty(item);
    }
};

__.prototype.scan = function (collection, handler) {

    // handler is a proc fn that takes an args array

    // todo we probably need to make this async-safe by waiting for each task to complete
    // and registering each call with our bookkeeping

    return Array.isArray(collection) ?
        collection.forEach(function (elem) {
            return handler([elem]);
        }) :
        Object.keys(collection).forEach(function (key) {
            return handler([key, collection[key]]);
        });
};

__.sendRootRequest = function (service, args, onReply, onFail) {

    var root = new __(service, args, onReply, onFail);

    service(root);
    root.deactivate();
};

module.exports = __;