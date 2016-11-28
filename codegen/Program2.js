/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Seth Purcell. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *-------------------------------------------------------------------------------------------*/

/**
 * Models a Lo program, which is mostly a collection of modules and an address space for services.
 *
 * Author: Seth Purcell
 * Date: 5/28/16
 */

'use strict';

const Task = require('../runtime/Task');
const Q = require('q');


////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Constructor
 */
var __ = function (rootModule) {

    this.root = rootModule;
    this.modules = {};

    var rootMod = this.load(rootModule);

    if (rootMod.exports.$main == null) {
        throw new Error("root module doesn't define a main() service")
    }

    this.main = rootMod.exports.$main;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Incorporates the given module into this program by loading it into the link table and linking it.
 */
__.prototype.load = function (module) {

    // linking works as follows:

    // module.getRef();


    // incorporate the module's dependencies in our link table
    // module.getDeps();

    var body = module.compile().renderJs();

    // console.log(body);

    var fn = new Function("module",
        "'use strict';\n\n" +
        body + '\n\n');

    var mod = {
        exports: {}
    };

    // load that bad boy
    fn(mod);

    return mod;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Recursively resolves and loads all modules that have been referenced but not loaded yet.
 * Returns a completion promise.
 *
 * @param resolver
 * @return promise
 */
__.prototype.loadAll = function (resolver) {

    // start with the root module
    var deps = this.main.getDeps();


};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Builds this program to its environment.
 */
__.prototype.build = function () {

};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads and runs this program. Async of course because the program itself may be async.
 */
__.prototype.run = function (args) {

    try {
        var d = Q.defer();

        console.error('running ' + this.baseModule);
        Task.sendRootRequest(this.main, args, d.resolve.bind(d), d.reject.bind(d));

        return d.promise;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = __;