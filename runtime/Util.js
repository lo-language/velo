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

__.add = function (left, right) {

    if (typeof left == 'number' && typeof right == 'number') {
        return left + right;
    }

    // see if left is a set

    if (typeof left == 'object' && left.__LO_SET) {

        var result = {};
        Object.defineProperty(result, '__LO_SET', {value: true});

        // copy left into result
        for (var i in left) {
            result[i] = left[i];
        }

        // see if right is also a set

        if (typeof right == 'object' && right.__LO_SET) {

            for (var j in right) {
                result[j] = right[j];
            }

            return result;
        }

        // see if right is an array

        if (Array.isArray(right)) {

            // plug the array into the set
            right.forEach(function (item) {
                result[item] = true;
            });

            return result;
        }
    }

    return left + right;
};

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
    // scan is sugar; should we just desugar it in Lo space and be done with it?
    // or does the different handling of arrays and maps indicate it's not sugar?
    // or can this method just take a cont arg?

    // scan items >> proc
    //
    // var i = 0;
    // while (i < itemCount) {
    //   proc(items[]);
    // }

    // todo we probably need to make this async-safe by waiting for each task to complete
    // and registering each call with our bookkeeping
    // we need to make the proc blocking...

    // the way to handle this without altering the target proc is to create a custom
    // reply handler for the proc?

    return Array.isArray(collection) ?
        collection.forEach(function (elem) {
            return handler([elem]);
        }) :
        Object.keys(collection).forEach(function (key) {
            return handler([key, collection[key]]);
        });
};


module.exports = __;