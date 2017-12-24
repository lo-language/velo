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
 * Source-side compilation context; handles compile-time symbol tracking.
 *
 * A context can be a module (root) context, a service context, or a sink context
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const ReqExprNode = require('./ReqExprNode');


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

    // arguably more of a target context concept, but putting in source context for now
    this.nextLoopNum = 1;

    // dependency set
    this.deps = {};

    this.wrapper = null;
    this.reqId = 0;

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
 * Returns true if this is a service context.
 */
__.prototype.getNextLoopName = function () {

    return 'L' + this.nextLoopNum++;
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
 * Sets the module registry for this context.
 */
__.prototype.setErrorListener = function (listener) {

    this.errorListener = listener;
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

    this._setValue(name, value, isModule);
};

/**
 * Defines a constant in this context.
 *
 * @param name
 * @param value
 * @param isModule   bind at load-time, not compile-time
 */
__.prototype._setValue = function (name, value, isModule) {

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
 */
__.prototype.pushRequest = function (address, args) {

    var label = 'res' + this.reqId++;
    var reqNode = new ReqExprNode(address, args, label);

    // prepend the request onto the wrapper list
    this.wrapper = this.wrapper ? this.wrapper.append(reqNode) : reqNode;

    // gets a temp var and returns it
    return label;
};


/**
 *
 */
__.prototype.unpackAndWrap = function (node) {

    var result = this.wrapper;

    this.wrapper = null;

    if (result) {
        result.append(node);
        return result;
    }

    return node;
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



__.prototype.getNextLabel = function () {

    if (this.parent) {
        return this.parent.getNextLabel();
    }

    return this.contId++;
};


__.prototype.isRValue = function () {
    return false;
};

/**
 * Attaches a compilation error to the given node.
 *
 * @param node
 * @param message
 */
__.prototype.reportError = function (node, message) {

    // attach an error to this context's report

    if (this.parent) {
        this.parent.reportError(node, message);
        return;
    }

    this.errorListener && this.errorListener(node, message);

    this.errors.push(node, message);
};

__.prototype.hasErrors = function () {

    return this.errors.length > 0;
};


module.exports = __;
