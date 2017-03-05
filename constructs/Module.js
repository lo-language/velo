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
const vm = require('vm');
const Q = require('q');

/**
 * A module definition; the root of an AST. Called by the ASTBuilder
 */
var __ = function (defs) {

    this.deps = [];
    this.defs = defs;
    this.exports = {};
    this.aliases = {};

    // todo -- set up aliases
    // this.aliases = aliases || [];
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
        // aliases: this.aliases,
        definitions: this.defs.map(def => def.getAst()),
    };
};

/**
 * Compiles this module to JS.
 *
 * Compiling a module discovers its dependencies.
 */
__.prototype.compile = function () {

    // should module definitions be captured as a linked list like statements?

    // create a root context
    var context = new Context();

    // a bunch of constants

    var stmts = null;

    this.defs.forEach(def => {
        stmts = JS.stmtList(def.compile(context), stmts);
    });

    // pull the dependencies out of the root context
    this.deps = context.getDeps();

    return stmts;
};

/**
 * Loads this module into our env in preparation for running.
 */
__.prototype.load = function () {

    var body = this.compile().renderJs();

    // in the browser we can do it this way:
    // var loadMod = new Function("module",
    //     "'use strict';\n\n" +
    //     body + '\n\n');
    //
    // // load that bad boy
    // loadMod(this);

    var code = "(function(module) {'use strict';\n\n" + body + '\n\n})';

    vm.runInNewContext(code, {
        setImmediate: global.setImmediate
    })(this);

    return this.exports;
};

/**
 *
 * @param program
 * @return promise completion promise
 */
__.prototype.loadDeps = function (program) {

    // resolve all unresolved deps

    // iterate over the namespaces

    return Q.all(Object.keys(this.deps).map(namespace => {

        return Q.all(Object.keys(this.deps[namespace]).map(name => {

            // see if we've already loaded the dep
            // module names are strings if they still need to be loaded; object refs otherwise

            if (typeof name == 'string') {

                // console.log("LOADING", namespace, name);

                // todo -- hand this off to a sourcer per namespace
                return program.loadModule(namespace, name).then(exports => {

                    return this.deps[namespace][name] = exports;
                });
            }

            return name;
        }));
    }));
};

module.exports = __;