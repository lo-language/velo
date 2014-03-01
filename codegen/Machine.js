/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param system
 * @param fn
 * @private
 */
var __ = function (system, fn) {

    this.system = system;
    this.process = fn;
};

module.exports = __;