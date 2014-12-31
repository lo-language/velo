/**
 * Tracks usages of a promise.
 *
 * Created by: spurcell
 * 12/31/14
 */

"use strict";

var Q = require('q');

/**
 * Initializes the value.
 *
 * @param val
 * @private
 */
var __ = function (val) {

    this.val = val;

    this.d = Q.defer();
    this.promise = this.d.promise;
};

/**
 * Adds a promise to the chain.
 *
 * @param promise
 * @param handler
 */
__.prototype.use = function (promise, handler) {

    // add the promise to the chain
    // preserves order

    this.promise = this.promise.then(handler.bind(this));
};

/**
 * Returns the promise for this tracker.
 */
__.prototype.getPromise = function () {

    return this.promise;
};

//__.prototype.then = function (resolve, reject) {
//    return this.promise.then(resolve, reject);
//};