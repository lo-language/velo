/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * To be callable from within exa, a JS function needs to adhere to the signature:
 *
 * foo(recur, args);
 *
 * should we make an ExaService class? and have a Loader be a factory for such things? and maybe Module is a subclass?
 */

"use strict";

const Module = require('./Module');
const Task = require('./Task');
const fs = require('fs');
const Q = require('q');
const standardLibs = require('../libs');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a loader to load modules from the specified path.
 *
 * @param libs  array of directories or archives to search for modules
 */
var __ = function (libs) {

    this.libs = libs;
    this.modules = standardLibs;

    var _this = this;

    /**
     * An Exa service function (JS fn that takes a task) that returns an Exa service function.
     *
     * @param task
     * @return {*}
     */
    //this.acquire = function (task) {
    //
    //    var modulePath = task.args[0];
    //
    //    _this.getModule(modulePath).then(
    //        function (module) {
    //
    //            // might want to refactor this class so we don't need this bind
    //            return module.load();
    //        },
    //        function (error) {
    //            console.error("error loading " + modulePath);
    //        }
    //    ).then(
    //        function (procedure) {
    //
    //            task.respond("reply", procedure);
    //        }
    //    ).done();
    //};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves a module reference to a module by locating and fetching it.
 *
 * @param ref
 * @return {promise}
 */
__.prototype.getModule = function (ref) {

    // limited to local files for now
    var path = this.libs + '/' + ref + '.exa';
    var _this = this;

    return Q(path).then(
        function (fullPath) {

            // read the file
            return Q.denodeify(fs.readFile)(fullPath, 'utf8');
        },
        function () {
            throw new Error("couldn't find module " + path);
        }
    ).then(
        function (source) {
            return new Module(source, _this);
        },
        function (err) {
            throw new Error("failed to load module: " + ref + "\n" + err);
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads a symbol definition file and compiles it, hanging onto its scope for use in modules.
 *
 * @param ref
 * @return {promise}
 */
__.prototype.loadSymbols = function (ref) {

    // limited to local files for now
    var path = this.libs + '/' + ref + '.exa';

    return Q(path).then(
        function (fullPath) {

            // read the file
            return Q.denodeify(fs.readFile)(fullPath, 'utf8');
        },
        function () {
            throw new Error("couldn't find module " + path);
        }
    ).then(
        function (source) {

            // check the cache here

            var mod = new Module(source);

            return mod.scope;

        },
        function (err) {
            throw new Error("failed to load module: " + ref + "\n" + err);
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads all dependencies for the given module.
 */
__.prototype.loadDeps = function (deps) {

    return Q.all(deps.map(this.loadModule.bind(this)));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the specified Exa module into the JS environment for execution, checking our cache first.
 * Recursively loads the module graph via BFS.
 * Returns a promise for an Exa service function ready to run.
 *
 * @return {promise}
 */
__.prototype.loadModule = function (ref) {

    console.error("LOADING", ref);

    // see if we've already loaded the module
    // todo test this
    if (this.modules[ref]) {
        console.error("ALREADY LOADED: ", ref);
        return Q(this.modules[ref]);
    }

    var _this = this;

    // resolve the ref to a module
    return this.getModule(ref).then(
        function (module) {

            // make an Exa service from the module, bound to our module registry, and cache it
            // do this before loading its deps so we don't fall into infinite recursion
            _this.modules[ref] = module.makeService(_this.modules);

            // the service is now loaded but it can't be run until its dependencies are loaded as well
            // recursively load dependencies and after completion return the service, ready to run
            return Q.all(module.getDeps().map(_this.loadModule.bind(_this))).then(
                function () {
                    return _this.modules[ref];
                }
            );
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates and sends a root request with the given args.
 *
 * @param modref    an exa module reference
 * @param args      request args
 * @return {promise}
 */
__.prototype.run = function (modref, args) {

    return this.loadModule(modref).then(
        function (service) {

            var d = Q.defer();

            Task.sendRootRequest(service, args, d.resolve.bind(d), d.reject.bind(d));

            return d.promise;
        }
    );
};

module.exports = __;