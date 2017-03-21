/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A load-and-go program instantiation.
 */

"use strict";

const JsModuleSpace = require('./JsModuleSpace');
const Task = require('../runtime/Task');
const Q = require('q');


var __ = function (localSpace, rootModuleId) {

    this.localSpace = localSpace;
    this.rootModuleId = rootModuleId;

    this.namespaces = {
        '__local': localSpace,
        'JS': new JsModuleSpace()
    };

    this.sandbox = {
        setImmediate: setImmediate,
        '__local': localSpace.getModules(),
        'JS': this.namespaces['JS'].getModules()
    };

    localSpace.register(rootModuleId);
};

/**
 * Load and run the program.
 */
__.prototype.run = function (args) {

    return this.localSpace.resolve(this).then(modules => {

        this.localSpace.loadModules(this.sandbox);

        var mainService = this.localSpace.getModules()[this.rootModuleId].$main;

        // launch the program

        try {

            var d = Q.defer();

            console.error('RUNNING   ' + this.rootModuleId);
            Task.sendRootRequest(mainService, args, d.resolve.bind(d), d.reject.bind(d));

            return d.promise;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
};


/**
 * Registers the specified module as a dependency.
 */
__.prototype.include = function (namespace, id) {

    var manager = this.namespaces[namespace];

    if (typeof manager === 'undefined') {
        throw new Error("module namespace " + namespace + " not found");
    }

    manager.register(id);
};


module.exports = __;