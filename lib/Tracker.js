/**
 * Tracks usages of a value by async code, resolving itself when they've all run.
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
 * Registers a usage to the chain.
 *
 * @param promise
 * @param handler
 */
__.prototype.register = function (promise, handler) {

    // resolve our deferred with the promise so that we'll wait on it

    // assignment i

    // have anything we're WRITING TO also in the

    q.spread().usemeThen()

    this.promise = Q.all([this.promise, promise], handler.bind(this));
};

/**
 * Returns the promise for this tracker.
 */
__.prototype.getPromise = function () {

    this.d.resolve(this.val);

    return this.promise;
};

module.exports = __;