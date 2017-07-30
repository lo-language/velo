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

// utility methods, probably shouldn't be in here but rather somewhere else in runtime

__.concat = function (left, right) {

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

__.cardinality = function (val) {

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

__.in = function (item, collection) {

    if (Array.isArray(collection)) {
        return collection.indexOf(item) >= 0;
    }
    else if (typeof collection === 'object') {
        return collection.hasOwnProperty(item);
    }
};

__.scan = function (collection, handler) {

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


module.exports = __;