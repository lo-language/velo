/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const fs = require('fs');
const Q = require('q');
const ASTBuilder = require('./../parser/ASTBuilder');
const Parser = require('./../parser/Parser');
const vm = require('vm');
const EventEmitter = require('events');


/**
 * The local module manager.
 *
 * Created by spurcell on 4/10/16.
 */

var __ = function (baseDir) {

    EventEmitter.call(this);

    this.baseDir = baseDir;
    this.pending = {};
    this.modules = {};
    this.jsModules = {};
    this.loaded = {};
};

__.prototype = new EventEmitter();

/**
 * Registers the given module ID as a dependency.
 */
__.prototype.register = function (id) {

    // idempotent
    if (typeof this.modules[id] === "undefined" &&
        typeof this.pending[id] === "undefined") {

        this.pending[id] = true;
    }
};


/**
 * Resolves all pending modules, which entails acquiring and compiling the source.
 *
 * @param registry      the module registry to use during compilation
 *
 * @return a promise
 */
__.prototype.resolve = function (registry) {

    // go through all pending modules and resolve

    var acquires = [];

    Object.keys(this.pending).forEach(moduleId => {

        acquires.push(this.acquire(moduleId).then(module => {
            this.modules[moduleId] = module;

            try {
                this.jsModules[moduleId] = module.compile(registry, (node, error) => {this.emit("error", moduleId, node, error);}).renderJs();
            }
            catch (err) {
                console.log(err);
            }
        }));

        // delete after acquiring in case there was a cycle
        delete this.pending[moduleId];
    });

    return Q.all(acquires).then(() => {

        // see if more work was created for us
        if (Object.keys(this.pending).length > 0) {
            return this.resolve(registry);
        }

        return this.modules;
    });
};


/**
 * Returns this namespace's module endpoints.
 */
__.prototype.getModules = function () {

    return this.loaded;
};


/**
 * Compiles and loads all modules
 *
 * @param sandbox
 */
__.prototype.loadModules = function (sandbox) {

    Object.keys(this.modules).forEach(moduleId => {

        this.load(moduleId, sandbox);
    });

    return this.loaded;
};

/**
 * Compiles and loads a single module, returning the loaded module.
 *
 * @param moduleId
 * @param sandbox
 */
__.prototype.load = function (moduleId, sandbox) {

    var body = this.jsModules[moduleId];
    var code = "(function() {'use strict';\n\n" + body + '\n\n})';

    this.loaded[moduleId] = vm.runInNewContext(code, sandbox)();

    return this.loaded[moduleId];
};


/**
 * Compiles and loads all modules
 *
 * @param stream
 */
__.prototype.dumpModules = function (stream) {

    Object.keys(this.modules).forEach(moduleId => {

        stream.write(this.jsModules[moduleId]);
    });
};



/**
 * Acquires the specified module, parsed and ready to compile.
 *
 * @param id
 * @return {Module}
 */
__.prototype.acquire = function (id) {

    var path = this.baseDir + '/' + id + '.lo';

    // read the file
    return Q.denodeify(fs.readFile)(path, 'utf8').then(source => {

        // process.stderr.write("PARSING   " + id);

        var start = new Date();
        var module = new Parser().parse(source);

        module.setInfo(id, path);

        // process.stderr.write(" [" + (new Date().getTime() - start.getTime()) + "ms]\n");

        return module;
    },
    function () {
        throw new Error("couldn't find module " + path);
    });
};


module.exports = __;

