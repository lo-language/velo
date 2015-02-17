/**
 * Created by: spurcell
 * 2/15/15
 */

"use strict";

/**
 *
 * @param template  function that returns JS code
 * @param deferred  whether this JS produces a promise
 * @private
 */
var __ = function (template) {

    this.barrier = new Barrier(template);
};

__.prototype.renderSync = function () {

    return this.barrier.getJs();
};

__.prototype.renderAsync = function () {

    // i'm a barrier so must render children as sync!

    return this.barrier.getJs();
};

module.exports = __;

var Barrier = require('./Barrier');