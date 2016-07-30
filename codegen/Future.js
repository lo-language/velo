/**
 * Models a future so we can recognize and handle them in compilation.
 *
 * this is another kind of blocker, right? should it extend blocker?
 */

"use strict";

/**
 * @param name
 */
var __ = function (name) {

    this.name = name;
};

module.exports = __;