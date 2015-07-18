/*
 * Copyright (C) 2014 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 */

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
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a variable and marks it as ready iff it's being set to a literal or argument
 * or an expression of exclusively the same.
 *
 * @param name
 */
__.prototype.define = function (name) {

    this.vars[name] = '$' + name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true iff the name is defined in this scope.
 *
 * @param name
 */
__.prototype.has = function (name) {

    return this.vars[name] || false;
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