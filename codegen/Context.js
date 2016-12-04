/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Compilation context; handles compile-time symbol tracking.
 *
 * A context can be a module (root) context, a service context, or a sink context
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');
const Wrapper = require('./Wrapper');
const ContStmt = require('./ContinuedStmt');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent context, if any
 * @param isService
 */
var __ = function (parent, isService) {

    this.parent = parent;

    if (parent) {
        this.type = isService ? 'service' : 'sink';
    }
    else {
        this.type = 'module';
        this.contNum = 0;
    }

    // our local symbol table, containing params, locals, constants, futures, etc.
    this.symbols = {};

    this.wrapper = null;
    this.placeHolders = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this is a root (module) context.
 */
__.prototype.isRoot = function () {

    return this.type == 'module';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this is a service context.
 */
__.prototype.isService = function () {

    return this.type == 'service';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this is a sink context.
 */
__.prototype.isSink = function () {

    return this.type == 'sink';
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
 * @param isService
 * @return {*}
 */
__.prototype.createInner = function (isService) { // push? nest? inner? derive? pushDown?

    return new __(this, isService);
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

    return JS.subscript(JS.ID(placeholderName), JS.num('0'));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Closes the current statement context, wrapping the given JS AST node as necessary
 *
 * @return {*}
 */
__.prototype.compileStmt = function (stmt) {

    // have to compile first to load up wrappers
    var result = stmt.compile(this);

    if (this.wrapper) {
        result = this.wrapper.attach(result);

        // reset the wrapper
        this.wrapper = null;
    }

    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this context is currently preparing to wrap a statement.
 *
 * @return {*}
 */
__.prototype.isWrapping = function () {

    return this.wrapper ? true : false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new continued statement.
 *
 * @return {*}
 */
__.prototype.newContStmt = function () {

    if (this.parent) {
        return this.parent.newContStmt();
    }

    return new ContStmt('c' + this.contNum++);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if a response can be issued in this context (for it or a parent).
 *
 * @return {*}
 */
__.prototype.canRespond = function () {

    if (this.type == 'service') {
        return true;
    }

    if (this.parent) {
        return this.parent.canRespond();
    }

    return false;
};

module.exports = __;
