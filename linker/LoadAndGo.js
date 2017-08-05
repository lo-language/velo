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
const Util = require('../runtime/Util');
const LoSystem = require('../runtime/System');
const Q = require('q');


var __ = function (localSpace, rootModuleId) {

    this.localSpace = localSpace;
    this.rootModuleId = rootModuleId;

    this.namespaces = {
        '__local': localSpace,
        'JS': new JsModuleSpace()
    };

    this.sandbox = {
        setImmediate: setImmediate, // todo do we still need this?
        'Task': Task,
        '__local': localSpace.getModules(),
        'JS': this.namespaces['JS'].getModules(),
        'Util': Util
    };

    localSpace.register(rootModuleId);
};

/**
 * Load and run the program.
 *
 * @param args  the args for the program
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

/**
 * Fetches the system object for this program.
 */
__.prototype.getSystem = function () {

    // compose the loader with the core system object

    return Object.assign({

        $load: (task) => {

            // call out to the program to load the module

            var moduleId = task.args[0];

            this.include("__local", moduleId);

            // tell the task we're up to something

            var handler = task.doAsync((modules) => {

                // this is actually not async
                var loaded = this.localSpace.load(moduleId, this.sandbox);

                task.respond("reply", [loaded]);
            });

            // resolve the modules
            this.localSpace.resolve(this).then(handler);
        }
    }, LoSystem);
};


module.exports = __;