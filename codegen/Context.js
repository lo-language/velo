/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Compilation context; handles compile-time symbol tracking.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const Compiler = require('./Compiler');
const util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent scope, if any
 * @private
 */
var __ = function (parent) {

    this.parent = parent;

    // our local symbol table, containing params, locals, constants, futures, etc.
    this.symbols = {};

    // references (other modules referenced in this module)
    this.references = {};

    this.contNum = 0;   // count of continuations, used for creating unique names
    this.services = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Links a reference scope to this scope.
 *
 * @param name
 * @param scope
 */
__.prototype.addReference = function (name, scope) {

    // console.log("adding ref " + name);

    this.references[name] = scope;
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

    // can only declare variables in non-root scopes
    if (this.parent) {
        this.symbols['@' + name] = {type: 'var', name: name};
    }
    else {
        throw new Error("can't declare a variable in a root scope; constants only!");
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a constant in this scope.
 *
 * @param name
 * @param value
 * @param isService true if this is a service definition
 */
__.prototype.define = function (name, value, isService) {

    if (this.has(name)) {
        throw new Error(name + " is a constant or variable in this scope");
    }

    if (isService) {
        console.log("defining service " + name);

        // pull a switcheroo
        var id = 'service' + this.id + "_" + this.services.length;
        this.services.push("const " + id + " = " + value.render() + ";");   // todo put the const name in as the fn name for JS
        value = id;
    }

    this.symbols['@' + name] = {type: 'const', value: value};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a future.
 *
 * @param name
 */
__.prototype.setFuture = function (name) {

    this.symbols['@' + name] = {type: 'future', name: name};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if the given name refers to a future.
 *
 * @param name
 */
__.prototype.isFuture = function (name) {

    if (this.symbols['@' + name] !== undefined
        && this.symbols['@' + name].type == 'future') {
        return true;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if the given name is defined in this scope.
 */
__.prototype.has = function (name) {

    if (this.symbols['@' + name] !== undefined) {
        return true;
    }

    if (this.parent) {
        return this.parent.has(name);
    }

    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

__.prototype.getJsVars = function () {

    var _this = this;

    return Object.keys(this.symbols).reduce(function (accum, key) {

        var symbol = _this.symbols[key];

        if (symbol.type == 'var' || symbol.type == 'future') {
            accum.push('$' + symbol.name);
        }

        return accum;

    }, []);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if the specified name is a defined constant.
 *
 * @param name
 * @param ref     name of referenced scope to check
 * @return {Boolean}
 */
__.prototype.isConstant = function (name, ref) {

    // only constants can be referenced in other modules
    if (ref) {
        if (this.references[ref]) {
            return this.references[ref].isConstant(name);
        }
        else if (this.parent) {
            return this.parent.isConstant(name, ref);
        }
    }

    if (this.symbols['@' + name] !== undefined
        && this.symbols['@' + name].type == 'const') {
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
 * @param ref
 * @return {*}
 */
__.prototype.resolve = function (name, ref) {

    if (ref) {
        if (this.references[ref]) {
            return this.references[ref].resolve(name);
        }
        else if (this.parent) {
            return this.parent.resolve(name, ref);
        }
    }

    if (this.symbols['@' + name] !== undefined
        && this.symbols['@' + name].type == 'const') {
        return this.symbols['@' + name].value;
    }

    if (this.parent) {
        return this.parent.resolve(name);
    }

    throw new Error(name + " is not a defined constant");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and returns a new inner context.
 *
 * @return {*}
 */
__.prototype.createInner = function () { // push? nest? inner? derive? pushDown?

    return new __(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.compile = function (node) {

    if (Compiler[node.type] === undefined) {
        throw new Error("don't know how to compile node type '" + node.type + "': " + util.inspect(node));
    }

    // dispatch to the appropriate AST node handler
    return Compiler[node.type].call(this, node);
};


module.exports = __;

