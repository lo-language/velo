/**
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

// context keeps track of sequential state of who's been defined as what
// should context vars be exa vars or JS vars??
// going with exa for now

var __ = function () {

    // map of defined names
    this.vars = {};

    this.numArgs = 0;

    this.define('recur', true);
    this.define('reply', true);
    this.define('fail', true);
};

/**
 * Defines a variable and marks it as ready iff it's being set to a literal or argument
 * or an expression of exclusively the same.
 *
 * @param name
 * @param status
 */
__.prototype.define = function (name, status) {

    this.vars[name] = status;
};

/**
 *
 * @param name
 * @return {Number} the number of this argument
 */
__.prototype.defineArg = function (name) {

    this.define(name, 'ready');

    var argNum = this.numArgs;

    this.numArgs++;

    return argNum;
};

__.prototype.getStatus = function (name) {

    return this.vars[name];
};

module.exports = __;