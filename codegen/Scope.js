/**
 * Tracks symbols - whether they've been defined as values, promises, or not at all.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var Compiler = require('./Compiler');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent scope, if any
 * @param cont      the tail of a statement list (optional)
 * @private
 */
var __ = function (parent) {

    this.parent = parent;
    this.deps = parent ? parent.deps : {};
    this.vars = {};
    this.constants = {};
    this.contNum = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Registers a dependency in this scope.
 *
 * @param name
 */
__.prototype.registerDep = function (name) {

    this.deps[name] = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a list of all the dependencies declared in this scope, in no particular order.
 *
 * @param name
 */
__.prototype.getDeps = function (name) {

    // we don't care about order
    return Object.keys(this.deps);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param names
 * @returns {Array}
 */
__.prototype.receives = function (names) {

    var _this = this;

    names.map(function (name) {

        if (_this.has(name) == false) {
            _this.declare(name);
        }

    });

    this.receives = names;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Declares a variable in this scope.
 *
 * @param name
 */
__.prototype.declare = function (name) {

    if (this.isConstant(name)) {
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

    if (this.has(name)) {
        throw new Error(name + " is a constant or variable in this scope");
    }

    this.constants['@' + name] = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if the given name is defined in this scope.
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.compile = function (node) {

    if (Compiler[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "'");
    }

    // dispatch to the appropriate AST node handler
    return Compiler[node.type].call(this, node);
};

module.exports = __;

