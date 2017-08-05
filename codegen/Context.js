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
    this.registry = parent ? parent.registry : null;

    this.errors = [];
};


/**
 *
 */
__.prototype.getModulePath = function () {

    return this.parent ? this.parent.getModulePath() : (this.path || '??');
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
 * Sets the module registry for this context.
 */
__.prototype.setRegistry = function (registry) {

    this.registry = registry;
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
 * @param value
 * @param isModule   bind at load-time, not compile-time
 */
__.prototype.define = function (name, value, isModule) {

    if (this.has(name)) {
        throw new Error(name + " is a constant or variable in this context");
    }

    this.symbols['@' + name] = {
        type: 'const',
        name: name,
        value: value,
        isModule: isModule || false
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

    // console.log(this.parent == null ? "no parent" : "has parent");
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


__.prototype.getConstants = function () {

    return Object.keys(this.symbols).reduce((accum, key) => {

        var symbol = this.symbols[key];

        if (symbol.type == 'const' && symbol.isModule == false) {
            accum.push(symbol);
        }

        return accum;

    }, []);
};


/**
 * Returns true if the specified name is a defined constant.
 *
 * @param name
 * @return {Boolean}
 */
__.prototype.isConstant = function (name) {

    if (this.symbols['@' + name] && this.symbols['@' + name].type == 'const') {
        return true;
    }

    if (this.parent) {
        return this.parent.isConstant(name);
    }

    return false;
};


/**
 * Returns true if the specified name is a defined constant.
 *
 * @param name
 * @return {Boolean}
 */
__.prototype.isModule = function (name) {

    if (this.symbols['@' + name] && this.symbols['@' + name].isModule) {
        return true;
    }

    if (this.parent) {
        return this.parent.isModule(name);
    }

    return false;
};

/**
 * Returns the value of the specified constant.
 *
 * @param name
 * @return {*}
 */
__.prototype.resolve = function (name) {

    if (this.symbols['@' + name] !== undefined) {
        return this.symbols['@' + name].value;
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

        var contName = 'k' + this.getNextLabel();

        var contDef = JS.fnDef([], this.following, contName);

        this.following = JS.stmtList(contDef);

        return JS.ID(contName);
    }

    return null;
};

/**
 * Wraps the following statements in an async loop construct.
 */
__.prototype.createAsyncLoop = function (condition, body) {

    // todo - code improvement ideas:
    // - don't define loop functions within loops
    // - don't define continuations just to call into loop functions (would still need to wrap in setImmediate)

    this.continuous = false;

    var loopName = 'l' + this.getNextLabel();
    var loopId = JS.ID(loopName);

    var loopDef = JS.letDecl(loopName, JS.fnDef([], JS.stmtList(JS.cond(condition, body, this.following))));

    this.following = null;

    return {id: loopId, def: loopDef};
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


__.prototype.isRValue = function () {
    return false;
};

__.prototype.pushError = function (line, message) {

    this.errors.push(new Error(this.getModulePath() + ':' + line + ' ' + message));
};

__.prototype.getErrors = function () {

    return this.errors;
};


module.exports = __;
