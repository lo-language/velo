
/**
 * Compilation context; handles compile-time symbol tracking.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const Wrapper = require('./Wrapper');
const JS = require('./JsPrimitives');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent context, if any
 */
var __ = function (parent) {

    this.parent = parent;

    // our local symbol table, containing params, locals, constants, futures, etc.
    this.symbols = {};

    this.wrapper = null;
    this.placeHolders = 0;
    this.cont = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this is a root context.
 */
__.prototype.isRoot = function () {

    return this.parent ? false : true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Declares a variable in this context.
 *
 * @param name
 */
__.prototype.declare = function (name) {

    if (this.isConstant(name)) {
        throw new Error(name + " is a constant in this context");
    }

    this.symbols['@' + name] = {type: 'var', name: name};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a constant in this context.
 *
 * @param name
 */
__.prototype.define = function (name) {

    if (this.has(name)) {
        throw new Error(name + " is a constant or variable in this context");
    }

    this.symbols['@' + name] = {
        type: 'const',
        name: name
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a new continuation
 */
__.prototype.getContinuation = function () {

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
 * Returns true if the given name is defined in this context.
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

    return Object.keys(this.symbols).reduce((accum, key) => {

        var symbol = this.symbols[key];

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
 * @param qualifier     name qualifier (module reference)
 * @return {Boolean}
 */
__.prototype.isConstant = function (name, qualifier) {

    try {
        this.resolve(name, qualifier);
        return true;
    }
    catch (err) {
        return false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves an external constant (by delegating to the parent).
 *
 * @param name
 * @param qualifier
 */
__.prototype.resolveExternal = function (name, qualifier) {

    return this.parent.resolveExternal(name, qualifier);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the value of the specified constant.
 *
 * @param name
 * @return {*}
 */
__.prototype.resolve = function (name) {

    if (this.symbols['@' + name] !== undefined
        && this.symbols['@' + name].type == 'const') {
        return true;
        // return this.symbols['@' + name].value;
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
 * Pushes a request onto the stack and returns a placeholder.
 *
 * @param target
 * @param args
 * @param blocking
 */
__.prototype.pushRequest = function (target, args, blocking) {

    var placeholderName = 'res' + this.placeHolders++;

    var newWrapper = new Wrapper(target, args, placeholderName);

    if (this.wrapper) {
        this.wrapper.attach(newWrapper);
    }
    else {
        this.wrapper = newWrapper;
    }

    return JS.ID(placeholderName);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Closes the current statement context, wrapping the given JS AST node as necessary
 *
 * @return {*}
 */
__.prototype.wrapStatement = function (stmt) {

    if (this.wrapper) {
        var result = this.wrapper.attach(stmt);
        this.wrapper = null;
        return result;
    }

    return stmt;
};

module.exports = __;
