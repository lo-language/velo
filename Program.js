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
const EventEmitter = require('events').EventEmitter;
const path = require('path');
const fs = require('fs');

// Lo runtime components

const Task = require('./runtime/Task');
const Util = require('./runtime/Util');
const JsModule = require('./runtime/JsModule');


class Program extends EventEmitter {

    /**
     *
     * @param rootModule    LoModule or module name
     * @param sourceDir     program source root directory
     */
    constructor (rootModule, sourceDir) {

        super();

        if (typeof rootModule == 'string') {
            this.rootModule = new LoModule(rootModule);
        }
        else {
            this.rootModule = rootModule;
        }

        this.sourceDir = sourceDir;

        // map of module ref => module instance
        this.modules = {};

        // bypass acquiring pre-parsed modules
        if (rootModule.ast) {
            this.modules[rootModule.ref] = rootModule;
        }

        // loaded, runnable modules
        this.loaded = {};

        // vm sandbox

        this.sandbox = {
            setImmediate: setImmediate, // todo do we still need this?
            'Task': Task,
            'Util': Util
        };
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

        return this.compile().then(() => {

            // load all the modules
            Object.keys(this.modules).forEach(modRef => {

                var module = this.modules[modRef];

                var moduleJsObj = module.load(this.sandbox);

                // load the module into the program namespace

                if (this.sandbox.hasOwnProperty(module.ns) == false) {
                    this.sandbox[module.ns] = {};
                }

                this.sandbox[module.ns][module.name] = moduleJsObj;
            });

            var mainService = this.rootModule.loaded.main;

            return new Promise((resolve, reject) => {

                try {
                    Task.sendRootRequest(mainService, args || [], resolve, reject);
                }
                catch (err) {

                    // crash detected
                    console.error(err);
                    console.log(this.rootModule.js);
                }
            });

        }).catch(err => {

            // catch compilation errors
            this.emit('ERROR', err);

            // console.log(err);

            throw err;
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

        // acquire all modules before compiling any

        return this.acquire(this.rootModule).then(() => {

            Object.keys(this.modules).forEach(modRef => {
                this.modules[modRef].compile(this);
            });
        });
    }

    /**
     * Acquires the source for the given module and all its dependencies, recursively.
     * This entails parsing each module to find its deps.
     *
     * @param module
     * @return {Promise}    for the acquired module
     */
    acquire (module) {

        return new Promise((resolve, reject) => {

            // check our cache first
            if (typeof this.modules[module.ref] === 'object') {
                resolve(this.modules[module.ref]);
                this.emit('DEBUG', 'Got from cache ' + module.name);
                return;
            }

            this.emit('INFO', 'Acquiring module ' + module.name);

            // detect built-in libs

            if (module.ns == 'JS') {

                // what if we instead *injected* the module content into the module??
                // have a JS loader that does that

                var jsModule = new JsModule(module.name);
                this.modules[jsModule.ref] = jsModule;
                resolve(jsModule);
                return;
            }

            // if (module.ns == 'Lo') {
            //
            //     // what if we instead *injected* the module content into the module??
            //     // have a JS loader that does that
            //
            //     var libModule = new JsModule(module.name);
            //     this.modules[libModule.ref] = libModule;
            //     resolve(libModule);
            //     return;
            // }

            // just look for the file locally for now

            var fileName = path.basename(module.name, '.lo') + '.lo';

            fs.readFile(this.sourceDir + '/' + fileName, 'utf8', (err, source) => {

                if (err) {
                    reject("Failed to locate module " + module.name + ' in ' + this.sourceDir);
                    return;
                }

                // stash the module
                this.modules[module.ref] = module;

                // parse that bad boy so we can grab its deps
                module.parse(source);

                // acquire its dependencies
                this.acquireDeps(module).then(() => {
                    resolve(module);
                }).catch(reject);   // pass through to our promise
            });
        });
    }

    /**
     * Acquire all the dependencies for the given module.
     * Actually acquires in parallel.
     *
     * @param module
     * @returns {Promise}
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
}

module.exports = Program;