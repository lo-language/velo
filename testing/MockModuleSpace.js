/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const Q = require('q');
const vm = require('vm');
const EventEmitter = require('events');
const Parser = require('./../parser/Parser');


/**
 * The local module manager.
 *
 * Created by spurcell on 4/10/16.
 */

var __ = function (source) {

    EventEmitter.call(this);

    this.modules = {
        'ROOT': new Parser().parse(source)
    };

    this.loaded = {};
};

__.prototype = new EventEmitter();


/**
 * Registers the given module ID as a dependency.
 */
__.prototype.register = function (id) {

    // no-op
};


/**
 * Resolves all pending modules, which entails acquiring and compiling the source.
 *
 * @param registry      the module registry to use during compilation
 *
 * @return a promise
 */
__.prototype.resolve = function (registry) {

    return Q().then(
        () => {

            this.jsModules = {
                'ROOT': this.modules['ROOT'].compile(registry, (line, error) => {this.emit("error", line, error);}).renderJs()
            };

            return this.modules;
        }
    );
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

        var body = this.jsModules[moduleId];

        var code = "(function() {'use strict';\n\n" + body + '\n\n})';

        this.loaded[moduleId] = vm.runInNewContext(code, sandbox)();
    });

    return this.loaded;
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


module.exports = __;

