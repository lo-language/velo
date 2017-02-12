/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Success is finding something you really like to do and caring enough about it
 * to do it well.
 =============================================================================*/

/**
 * Compilation context; handles compile-time symbol tracking.
 *
 * A context can be a module (root) context, a service context, or a sink context
 *
 * ??? should we maintain separate contexts for the source language and the target language? kind of conflating them here
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');
const Connector = require('./Connector');


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
    }

    // our local symbol table, containing params, locals, constants, futures, etc.
    this.symbols = {};

    // dependency set
    this.deps = {};

    this.envs = [];
    this.envId = 0;

    this.connector = null;
    this.continuous = true; // continuous until proven async
    this.contId = 0;
};


/**
 * Returns true if this is a root (module) context.
 */
__.prototype.isRoot = function () {

    return this.type == 'module';
};


/**
 * Returns true if this is a service context.
 */
__.prototype.isService = function () {

    return this.type == 'service';
};


/**
 * Returns true if this is a sink context.
 */
__.prototype.isSink = function () {

    return this.type == 'sink';
};


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


/**
 * Defines a future.
 *
 * @param name
 */
__.prototype.setFuture = function (name) {

    this.symbols['@' + name] = {type: 'future', name: name};
};


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



__.prototype.getJsVars = function () {

    return Object.keys(this.symbols).reduce((accum, key) => {

        var symbol = this.symbols[key];

        if (symbol.type == 'var' || symbol.type == 'future') {
            accum.push('$' + symbol.name);
        }

        return accum;

    }, []);
};


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


/**
 * Creates and returns a new inner context.
 *
 * @param isService
 * @return {*}
 */
__.prototype.createInner = function (isService) { // push? nest? inner? derive? pushDown?

    return new __(this, isService);
};


/**
 * Pushes an environment and sets an ID.
 */
__.prototype.pushEnv = function (env) {

    this.continuous = false;

    // ok, this context just became discontinuous!
    // we need to reach up to our parent and see if there are any following statements (if this is a branch context)

    env.setId(this.envId++);
    this.envs.push(env);
};


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


/**
 * Returns a statement list terminator for this context.
 */
__.prototype.isContinuous = function () {

    return this.continuous;
};


/**
 * Returns a statement list terminator for this context.
 */
__.prototype.isDiscontinuous = function () {

    return this.continuous == false;
};


/**
 * Sets the following statements property.
 *
 * @param stmtList
 */
__.prototype.setFollowing = function (stmtList) {

    this.following = stmtList;
};


/**
 * Gets the following statements.
 *
 * @param stmtList
 */
__.prototype.getFollowing = function (stmtList) {

    return this.following;
};


/**
 * Returns true if there are currently following statements.
 */
__.prototype.hasFollowing = function () {

    return this.following ? true : false;
};


/**
 * Wraps the following statements in a continuation.
 *
 * @return {*} a JS AST for a ref to the continuation
 */
__.prototype.wrapFollowing = function () {

    this.continuous = false;

    if (this.following) {

        var contName = 'c' + this.getNextLabel();

        var contDef = JS.fnDef([], this.following, contName);

        this.following = JS.stmtList(contDef);

        return JS.ID(contName);
    }

    return null;
};


__.prototype.getNextLabel = function () {

    if (this.parent) {
        return this.parent.getNextLabel();
    }

    return this.contId++;
};


__.prototype.getConnector = function () {

    if (this.connector) {
        return this.connector;
    }
    else if (this.parent) {
        return this.parent.getConnector();
    }
};


__.prototype.getModuleRef = function (namespace, name) {

    if (this.parent) {
        return this.parent.getModuleRef(namespace, name);
    }

    // the root context

    // register the dependency to be resolved later

    if (namespace == null) {
        namespace = '__local';
    }

    if (this.deps[namespace] == null) {
        this.deps[namespace] = {}
    }

    this.deps[namespace][name] = name;

    return JS.subscript(JS.subscript(JS.select(JS.ID('module'), 'deps'), JS.string(namespace)), JS.string(name));
};


/**
 * Returns the deps collected by this context.
 */
__.prototype.getDeps = function () {

    return this.deps;
};


__.prototype.isRValue = function () {
    return false;
};


module.exports = __;
