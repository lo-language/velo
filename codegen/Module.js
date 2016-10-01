/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Models an Exa module.
 * Specializes Context to only allow constants
 * 
 * Author: Seth Purcell
 * Date: 5/28/16
 */

'use strict';

const ASTBuilder = require('./../parser/ASTBuilder');
const Context = require('./Context');
const JS = require('./JsPrimitives');
const Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Constructor
 *
 * @param source    the exa source for this module
 * @param name      optional name
 */
var __ = function (source, name) {

    Context.call(this);

    this.source = source;
    this.deps = {};
    this.exports = {};
    this.name = name || "<anonymous module>";
};

__.prototype = Object.create(Context.prototype);
__.prototype.constructor = __;

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles this module in the given program context.
 *
 * @param   program     top-level compilation context
 * @returns promise
 */
__.prototype.compileSelf = function (program) {

    process.stderr.write("PARSING   " + this.name);
    var start = new Date();
    this.ast = new ASTBuilder().parse(this.source);
    process.stderr.write(" [" + (new Date().getTime() - start.getTime()) + "ms]\n");


    // acquire any dependencies with a depth-first search

    var refs = this.ast.references || [];

    return Q.all(refs.map(dep => {

        return program.include(dep.ref).then(moduleId => {

            // stash the dep's global ID in our directory for handling lookups
            this.deps[dep.id] = moduleId;
        });

    })).then(() => {

        // ok, all our dependencies have been compiled and are ready to use
        process.stderr.write("COMPILING " + this.name);
        var start = new Date();
        var result = this.compile(this.ast);
        process.stderr.write(" [" + (new Date().getTime() - start.getTime()) + "ms]\n");
        return result;
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns exported service definitions.
 *
 * @returns {*}
 */
__.prototype.getExports = function () {

    return this.exports;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves the requested constant to its globally-visible name.
 *
 * @param name
 */
__.prototype.resolveToGlobal = function (name) {

    if (this.exports[name]) {
        return JS.select(JS.ID(this.id), name);
    }

    return this.resolve(name);
};

// Override methods inherited from Context

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Declares a variable in this context.
 *
 * @param name
 */
__.prototype.declare = function (name) {

    throw new Error("can't declare a variable in a module context -- constants only!");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a constant in this context.
 *
 * @param name
 * @param value
 * @param isService
 */
__.prototype.define = function (name, value, isService) {

    if (this.has(name)) {
        throw new Error(name + " is already constant in this context");
    }

    if (isService) {
        // need to tag to keep away from JS reserved words?
        this.exports[name] = value;
    }

    // would rather call the base class here
    this.symbols['@' + name] = {
        type: 'const',
        name: name,
        value: value};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and returns a new inner context.
 *
 * @return {*}
 */
__.prototype.createInner = function () {

    return new Context(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves an external constant by delegating to the appropriate module.
 *
 * @param name
 * @param qualifier
 */
__.prototype.resolveExternal = function (name, qualifier) {

    if (this.deps[qualifier] == undefined) {
        throw new Error("couldn't find module " + qualifier + " when resolving " + qualifier + ":" + name);
    }

    return this.deps[qualifier].resolveToGlobal(name);
};

/**
 * Renders JS for this module.
 */
__.prototype.getJs = function () {

};

module.exports = __;