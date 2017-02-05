/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * The machine does not isolate us from the great problems of nature but
 * plunges us more deeply into them.
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const Context = require('../codegen/Context');
const Q = require('q');

/**
 * A module definition; the root of an AST. Called by the ASTBuilder
 */
var __ = function (aliases, defs) {

    this.aliases = aliases || [];
    this.defs = defs;
    this.exports = {};
    this.aliases = {};

    // todo -- set up aliases

    // this.refs.forEach(dep => {
    //
    //     this.deps[dep.id] = dep.ref;
    // });
};

/**
 * Sets the name of this module
 */
__.prototype.setName = function (name) {

    this.name = name;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'module',
        aliases: this.aliases,
        definitions: this.defs.map(def => def.getAst()),
    };
};

/**
 * Compiles this module to JS.
 */
__.prototype.compile = function () {

    // should module definitions be captured as a linked list like statements?

    // create a root context
    var context = new Context();

    // a bunch of constants

    var js = null;

    this.defs.forEach(def => {
        js = JS.stmtList(def.compile(context), js);
    });

    return js;
};

/**
 * Loads this module into our env in preparation for running.
 */
__.prototype.load = function () {

    var body = this.compile().renderJs();

    var loadMod = new Function("module",
        "'use strict';\n\n" +
        body + '\n\n');

    // load that bad boy
    loadMod(this);

    return this.exports;
};

/**
 *
 * @param program
 * @return promise completion promise
 */
__.prototype.loadDeps = function (program) {

    // resolve all unresolved deps

    // scan our dependencies and load any that are missing

    return Q.all(Object.keys(this.deps).map(depName => {

        // see if we've already loaded the dep

        if (typeof this.deps[depName] == 'string') {

            return program.loadModule(this.deps[depName]).then(exports => {

                return this.deps[depName] = exports;
            });
        }

        return this.deps[depName];
    }));
};

module.exports = __;