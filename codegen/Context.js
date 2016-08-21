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
const JS = require('./JsPrimitives');
const JsStmt = require('./JsStmt');
const JsFunction = require('./JsFunction');
const Request = require('./Request');
const util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent    the parent context, if any
 */
var __ = function (parent) {

    this.parent = parent;

    // our local symbol table, containing params, locals, constants, futures, etc.
    this.symbols = {};

    this.placeHolders = 0; // should this be tracked at the root level? could we get collisions?
    this.contNum = 0;   // count of continuations, used for creating unique names
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

    // can only declare variables in non-root contexts
    if (this.parent) {
        this.symbols['@' + name] = {type: 'var', name: name};
    }
    else {
        throw new Error("can't declare a variable in a root context; constants only!");
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a constant in this context.
 *
 * @param name
 * @param value
 * @param isService
 */
__.prototype.define = function (name, value) {

    if (this.has(name)) {
        throw new Error(name + " is a constant or variable in this context");
    }

    this.symbols['@' + name] = {
        type: 'const',
        name: name,
        value: value
    };
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 */
__.prototype.compileStmt = function (node) {

    this.wrapper = new JsStmt();

    // a statement could be a context itself...

    return this.wrapper.attach(this.compile(node));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Pushes a request onto the stack and returns a placeholder.
 *
 * @param address
 * @param args
 * @param failHandler
 */
__.prototype.pushBlockingCall = function (address, args, failHandler) {

    if (this.wrapper == null) {
        throw new Error("trying to push a blocking call outside of stmt context");
    }

    var placeholderName = 'P' + this.placeHolders++;
    var replyHandler = new JsFunction([placeholderName], new JsStmt());

    // create a reply handler taking the placeholder as its param and with an empty body
    var req = new Request(address, args, replyHandler, failHandler);

    // flag this stmt as async
    this.wrapper.async = true;

    this.wrapper = this.wrapper.attach(req);

    return JS.ID(placeholderName);
};

module.exports = __;
