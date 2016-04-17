/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Created by spurcell on 4/10/16.
 */

const fs = require('fs');
const Q = require('q');
const ASTBuilder = require('./../parser/ASTBuilder');
const Context = require('./../codegen/Context');

////////////////////////////////////////////////////////////////////////////////////////////////////

var __ = function (basePath) {

    this.basePath = basePath;
    this.modules = [];
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

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles the given module into a scope.
 *
 * @param ref
 * @return {Context}
 */
__.prototype.compile = function (ref) {

    // limited to local files for now
    var path = this.basePath + '/' + ref + '.exa';

    // load the source
    return Q(path).then(
        function (fullPath) {

            console.log("reading " + path);

            // read the file
            return Q.denodeify(fs.readFile)(fullPath, 'utf8');
        },
        function () {
            throw new Error("couldn't find module " + path);
        }
    ).then(source => {

        // parse the source
        var ast = new ASTBuilder().parse(source);

        // create a root context for this module
        var context = this.createContext();

        // resolve any references via DFS
        if (ast.references) {

            return Q.all(ast.references.map(link => {

                return this.compile(link.ref).then(refScope => {
                    context.addReference(link.id, refScope);
                });
            })).then(function () {
                console.log("compiling", path);
                context.compile(ast);
                return context;
            });
        }

        console.log("compiling", path);
        context.compile(ast);
        return context;
    },
    err => {
        throw new Error("failed to load module: " + ref + "\n" + err);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param path
 * @returns {*}
 */
__.prototype.build = function (path) {

    // we load and parse all modules first to sanity-check the graph before we bother compiling anything
    console.log("validating module graph");
    
    // slap the runtime in there

    return this.compile(path).then(mainScope => {

        return new Function ("rootTask", this.modules.map(scope => {

            return scope.services.join("\n\n");

        }).join("\n\n") + "\n\n console.log('running main');\n\n" + mainScope.resolve('main') + '(rootTask);\n\n');
    });
};

module.exports = __;
