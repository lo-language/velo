/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * The Exa-to-JS compiler
 */

'use strict';

const ASTBuilder = require('./../parser/ASTBuilder');
const Context = require('./../codegen/Context');

var __ = function (resolver) {

    this.resolver = resolver;
    this.modules = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles the given Exa source into JS.
 *
 * @param source
 * @returns {*}
 */
__.compile = function (source) {

    // parse the source
    var ast = new ASTBuilder().parse(source);

    // create a root context for this module
    var context = this.createContext();

    // resolve any references via DFS
    if (ast.references) {

        return Q.all(ast.references.map(link => {

            // resolve the ref
            return this.resolver.resolve(link.ref).then(source => {

                return this.compile(source).then(depCtx => {

                    // link the dependency into our module's compilation context
                    context.addReference(link.id, depCtx);
                })
            });

        })).then(function () {

            console.log("compiling", path);

            // compilation alters the context by defining symbols in it
            context.compile(ast);

            return context;
        });
    }

    // no references found

    console.log("compiling", path);
    context.compile(ast);
    return context;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @returns {__}
 */
__.prototype.createContext = function () {

    var context = new Context();
    context.id = this.modules.length;
    this.modules.push(context);
    return context;
};

module.exports = __;