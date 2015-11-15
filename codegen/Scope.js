/**
 * Tracks symbols - whether they've been defined as values, promises, or not at all.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsConstruct = require('./JsConstruct');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent scope, if any
 * @param cont      the tail of a statement list (optional)
 * @private
 */
var __ = function (parent) {

    this.parent = parent;
    this.vars = {};
    this.constants = {};
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
__.prototype.bud = function () { // push? nest? inner? derive? pushDown?

    return new __(this);
};

module.exports = __;

