/**
 * Tracks symbols - whether they've been defined as values, promises, or not at all.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

/**
 *
 * @param parent    the parent scope, if any
 * @private
 */
var __ = function (parent) {

    this.parent = parent;

    // map of defined names
    this.vars = {};

    this.numArgs = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the status of the named variable.
 *
 * @param name
 * @return {*}
 */
__.prototype.getStatus = function (name) {

    if (this.vars[name] === undefined) {

        if (this.parent) {
            return this.parent.getStatus(name);
        }

        throw new Error("symbol (" + name + ") is not defined in this scope");
    }

    return this.vars[name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param name
 * @return {Number} the number of this argument
 */
__.prototype.defineArg = function (name) {

    this.define(name, true);

    var argNum = this.numArgs;

    this.numArgs++;

    return argNum;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and returns a new child context. The child knows its parent, but the parent has no record of the child.
 *
 * @return {*}
 */
__.prototype.bud = function () {

    return new __(this);
};

module.exports = __;