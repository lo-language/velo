/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Models a Lo program as a graph of modules.
 *
 * We could split out the parser and/or the runtime as separate npm modules...
 *
 * We could alternatively have modules keep track of their deps...
 *
 * Created by seth on 1/2/18.
 */

"use strict";

const LoModule = require('./LoModule');
const fs = require('fs');


class Program {

    /**
     *
     * @param rootModuleRef
     * @param resolvers
     */
    constructor (rootModuleRef, resolvers) {

        this.rootModuleRef = rootModuleRef;
        this.resolvers = resolvers;

        // map of module ref => module instance
        this.modules = {};

        this.sourceDir = '';
    }

    getModules () {

        return this.modules;
    }

    /**
     * Runs the program with the given args.
     *
     * Process is:
     *
     * 1. resolve all dependencies, parsing any source modules to see their deps
     * 2. compile any source modules
     * 3. load and link the compiled modules
     * 4. execute the root module's main service
     *
     * @param args          array of args
     * @return {Promise}
     */
    run (args) {

        // convert args to Lo types

        this.compile()
            .then(() => {

            return this.loadAll();
        })
            .then(() => {

            return this.rootModule.run('main', args);
        });

    }

    /**
     * Builds a Node executable
     *
     * @param target    file name to build into
     */
    build (target) {

        this.compile()
            .then(() => {

                // open the target file

            })
            .then(() => {

                // serialize the modules
            });
    }

    /**
     * Compiles all modules for this program; no-op for built-ins.
     *
     * @return {Promise}
     */
    compile () {

        return this.acquire(this.rootModuleRef).then(() => {

            // compile each module
            Object.keys(this.modules).forEach(modRef => {

                this.modules[modRef].compile(this);
            });
        });
    }

    /**
     * Acquires the specified module and all its dependencies, recursively.
     * This entails fully parsing each module to find its deps.
     *
     * @param modName
     * @return {Promise}    for a module
     */
    acquire (modName) {

        return new Promise((resolve, reject) => {

            // check our cache first
            if (typeof this.modules[modName.ref] === 'object') {
                resolve(this.modules[modName.ref]);
                console.log('Got from cache ' + modName.name);
                return;
            }

            console.log('Acquiring module ' + modName.name);

            // just look for the file locally for now

            fs.readFile(this.sourceDir + modName.name, 'utf8', (err, source) => {

                if (err) {
                    reject("Failed to locate module " + modName.name + ' in ' + this.sourceDir);
                    return;
                }

                // stash the whole ref with the module?
                var module = new LoModule(modName.name, source);

                // stash the module
                this.modules[modName.ref] = module;

                // parse that bad boy so we can grab its deps
                module.parse();

                // acquire its dependencies
                this.acquireDeps(module).then(() => {
                    resolve(module);
                });
            });
        });
    }

    /**
     * Acquire all the dependencies for the given module.
     * Actually acquires in parallel.
     *
     * @param module
     * @returns {Promise.<*>}
     */
    acquireDeps (module) {

        return Promise.all(module.getDeps().map(dep => {

            // don't acquire what's already acquired or pending
            if (dep.ref in this.modules) {
                return;
            }

            // put a placeholder in the modules map to record that we've seen this module;
            // this allows dependency cycles without repeated acquisition
            this.modules[dep.ref] = true;

            return this.acquire(dep);
        }));
    }

    /**
     * Loads all modules.
     *
     * @return {Promise}
     */
    loadAll () {

    }
}

module.exports = Program;