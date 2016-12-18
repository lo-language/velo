/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * A rock pile ceases to be a rock pile the moment a single man contemplates it,
 * bearing within him the image of a cathedral.
 =============================================================================*/

/**
 * Models a Lo program, which is mostly a collection of modules and an address space for services.
 *
 * Author: Seth Purcell
 * Date: 5/28/16
 */

'use strict';

const Task = require('../runtime/Task');
const Q = require('q');


/**
 * Constructor
 *
 * @param rootModule
 * @param resolver
 */
var __ = function (rootModule, resolver) {

    this.root = rootModule;
    this.ready = false;     // ready to run, all modules loaded
    this.resolver = resolver;

    this.exports = {};

    this.exports.root = rootModule.load();

    this.main = this.exports.root.$main;

    if (this.main == null) {
        throw new Error("root module doesn't define a main() service")
    }
};


/**
 * Recursively resolves the specified module (checking the cache first) and loads it.
 *
 * @param modRef
 * @return promise for the module's exports
 */
__.prototype.loadModule = function (modRef) {

    if (this.exports[modRef]) {
        return Q(this.exports[modRef]);
    }

    return this.resolver.acquire(modRef).then(
        mod => {

            // stash the exports
            this.exports[modRef] = mod.load();

            return mod.loadDeps(this).then(
                () => {
                    return this.exports[modRef];
                }
            );
        }
    );
};


/**
 * Builds this program to its environment.
 */
__.prototype.build = function () {

};


/**
 * Loads and runs this program. Async of course because the program itself may be async.
 */
__.prototype.run = function (args) {

    var p = Q();

    if (this.ready == false) {
        p = this.root.loadDeps(this);
    }

    return p.then(() => {

        try {

            var d = Q.defer();

            console.error('RUNNING   ' + this.root.name);
            Task.sendRootRequest(this.main, args, d.resolve.bind(d), d.reject.bind(d));

            return d.promise;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
};

module.exports = __;