/**
 * Created by: spurcell
 * 2/17/14
 *
 * An Object is an isolated, stateful, sequential process.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param system
 * @param def
 * @private
 */
var __ = function (system, action) {

    this.system = system;
    this.action = action;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.handle = function (message) {

};

module.exports = __;