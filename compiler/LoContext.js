/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
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

const Symbol    = require('./Symbol');
const Type      = require('./Type');


class LoContext {

    /**
     *
     * @param parent    the parent context, if any
     * @param isService
     */
    constructor(parent, isService) {

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

        this.errors = [];

        // response types for service contexts
        this.succType = null;
        this.failType = null;
    }

    /**
     *
     */
    getModulePath() {

        return this.parent ? this.parent.getModulePath() : (this.path || '??');
    }

    /**
     * Returns true if this is a root (module) context.
     */
    isRoot() {

        return this.type == 'module';
    }

    /**
     * Returns true if this is a service context.
     */
    isService() {

        return this.type == 'service';
    }

    /**
     * Returns true if this is a service context.
     */
    getNextLoopName() {

        if (this.parent) {
            return this.parent.getNextLoopName();
        }

        return 'L' + this.nextLoopNum++;
    }

    /**
     * Returns true if this is a sink context.
     */
    isSink() {

        return this.type == 'sink';
    }

    /**
     * Sets the module registry for this context.
     */
    // setRegistry(registry) {
    //
    //     this.registry = registry;
    // }

    /**
     * Sets the module registry for this context.
     */
    setErrorListener(listener) {

        this.errorListener = listener;
    }

    /**
     * Declares a variable in this context.
     *
     * @param name
     */
    declare(name) {

        if (this.isConstant(name)) {
            throw new Error(name + " is a constant in this context");
        }

        this.symbols['@' + name] = {type: 'var', name: name};
    }

    /**
     * Defines a constant in this context.
     *
     * @param name
     * @param value
     * @param isModule   bind at load-time, not compile-time
     */
    define(name, value, isModule) {

        if (this.has(name)) {
            throw new Error(name + " is a constant or variable in this context");
        }

        this._setValue(name, value, isModule);
    }

    /**
     * Defines a constant in this context.
     *
     * @param name
     * @param value
     * @param isModule   bind at load-time, not compile-time
     */
    _setValue(name, value, isModule) {

        this.symbols['@' + name] = {
            type: 'const',
            name: name,
            value: value,
            isModule: isModule || false
        };
    }

    /**
     * Defines a future.
     *
     * @param name
     */
    setFuture(name) {

        this.symbols['@' + name] = {type: 'future', name: name};
    }

    /**
     * Returns true if the given name refers to a future.
     *
     * @param name
     */
    isFuture(name) {

        if (this.symbols['@' + name] !== undefined
            && this.symbols['@' + name].type == 'future') {
            return true;
        }
    }

    /**
     * Returns true if the given name is defined in this context.
     */
    has(name) {

        if (this.symbols['@' + name] !== undefined) {
            return true;
        }

        // console.log(this.parent == null ? "no parent" : "has parent");
        if (this.parent) {
            return this.parent.has(name);
        }

        return false;
    }

    getJsVars() {

        return Object.keys(this.symbols).reduce((accum, key) => {

            var symbol = this.symbols[key];

            if (symbol.type == 'var' || symbol.type == 'future') {
                accum.push('$' + symbol.name);
            }

            return accum;

        }, []);
    }

    getConstants() {

        return Object.keys(this.symbols).reduce((accum, key) => {

            var symbol = this.symbols[key];

            if (symbol.type == 'const' && symbol.isModule == false) {
                accum.push(symbol);
            }

            return accum;

        }, []);
    }

    /**
     * Returns true if the specified name is a defined constant.
     *
     * @param name
     * @return {Boolean}
     */
    isConstant(name) {

        if (this.symbols['@' + name] && this.symbols['@' + name].type == 'const') {
            return true;
        }

        if (this.parent) {
            return this.parent.isConstant(name);
        }

        return false;
    }

    /**
     * Returns true if the specified name is a defined constant.
     *
     * @param name
     * @return {Boolean}
     */
    isModule(name) {

        if (this.symbols['@' + name] && this.symbols['@' + name].isModule) {
            return true;
        }

        if (this.parent) {
            return this.parent.isModule(name);
        }

        return false;
    }

    /**
     * Returns the value of the specified constant.
     *
     * @param name
     * @return {*}
     */
    resolve(name) {

        if (this.symbols['@' + name] !== undefined) {
            return this.symbols['@' + name].value;
        }

        if (this.parent) {
            return this.parent.resolve(name);
        }

        throw new Error(name + " is not a defined constant");
    }

    /**
     * Creates and returns a new inner context.
     *
     * @param isService
     * @return {*}
     */
    createInner(isService) { // push? nest? inner? derive? pushDown?

        return new LoContext(this, isService);
    }

    hasWrapper() {

        return this.wrapper ? true : false;
    }

    /**
     * Returns true if a response can be issued in this context (for it or a parent).
     *
     * @return {*}
     */
    canRespond() {

        if (this.type == 'service') {
            return true;
        }

        if (this.parent) {
            return this.parent.canRespond();
        }

        return false;
    }

    setSuccType(type) {

        // detect inconsistencies

        if (this.succType && this.succType != type) {
            throw new Error("type mismatch: service already has success type " + this.succType.toString());
        }

        this.succType = type;
    }

    setFailType(type) {

        if (this.failType && this.failType != type) {
            throw new Error("type mismatch: service already has failure type " + this.failType.toString());
        }

        this.failType = type;
    }

    isRValue() {
        return false;
    }

    /**
     * Attaches a compilation error to the given node.
     *
     * @param node
     * @param message
     */
    reportError(node, message) {

        // attach an error to this context's report

        if (this.parent) {
            this.parent.reportError(node, message);
            return;
        }

        if (this.errorListener) {
            this.errorListener.emit('ERROR', node, message);
        }

        this.errors.push(node, message);
    }

    //     return this.contId++;
    hasErrors() {

        return this.errors.length > 0;
    }
}


module.exports = LoContext;
