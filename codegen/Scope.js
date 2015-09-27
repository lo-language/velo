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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent scope, if any
 * @param continuation
 * @private
 */
var __ = function (parent, continuation) {

    this.parent = parent;
    this.vars = {};
    this.constants = {};
    this.cont = continuation;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Declares a variable in this scope.
 *
 * @param name
 */
__.prototype.declare = function (name) {

    if (this.constants['@' + name] !== undefined) {
        throw new Error(name + " is a constant in this scope");
    }

    this.vars['@' + name] = '$' + name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a constant in this scope.
 *
 * @param name
 * @param value
 */
__.prototype.define = function (name, value) {

    if (this.constants['@' + name] !== undefined) {
        throw new Error(name + " is a constant in this scope");
    }

    if (this.vars['@' + name] !== undefined) {
        throw new Error(name + " is a variable in this scope");
    }

    this.constants['@' + name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true
 */
__.prototype.has = function (name) {

    if (this.vars['@' + name] !== undefined) {
        return true;
    }

    if (this.constants['@' + name] !== undefined) {
        return true;
    }

    if (this.parent) {
        return this.parent.has(name);
    }

    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.getJsVars = function (name) {

    var _this = this;

    return Object.keys(this.vars).map(function (key) {
        return _this.vars[key];
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if the specified name is a defined constant.
 *
 * @param name
 * @return {Boolean}
 */
__.prototype.isConstant = function (name) {

    if (this.constants['@' + name] !== undefined) {
        return true;
    }

    if (this.parent) {
        return this.parent.isConstant(name);
    }

    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the value of the specified constant.
 *
 * @param name
 * @return {*}
 */
__.prototype.resolve = function (name) {

    if (this.constants['@' + name] !== undefined) {
        return this.constants['@' + name];
    }

    if (this.parent) {
        return this.parent.resolve(name);
    }

    throw new Error(name + " is not a defined constant");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the status of the named variable.
 *
 * @param name
 * @return {*}
 */
__.prototype.getStatus = function (name) {

    if (this.vars['@' + name] === undefined) {

        if (this.parent) {
            return this.parent.getStatus(name);
        }

        throw new Error("symbol (" + name + ") is not defined in this scope");
    }

    return this.vars['@' + name];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and returns a new child scope. The child knows its parent, but the parent has no record of the child.
 *
 * @return {*}
 */
__.prototype.bud = function (continuation) {

    return new __(this, continuation);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this scope has a current continuation.
 *
 * @return {Boolean}
 */
__.prototype.hasContinuation = function () {

    return this.cont ? true : false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a call to the current continuation.
 *
 * @return {String}
 */
__.prototype.getCallCont = function () {

    return "cc.call(this);\n";
};

module.exports = __;
