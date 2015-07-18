/*
 * Copyright (C) 2015 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 * 4/12/15
 */


"use strict";

var Module = require('./Module');
var fs = require('fs');
var Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a loader to load modules from the specified path.
 *
 * @param libs  array of directories or archives to search for modules
 */
var __ = function (libs) {

    this.libs = libs;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Searches our libraries and returns a promise for the full filesystem path to the specified module.
 *
 * @param path  logical path to the module
 */
__.prototype.findModule = function (path) {

//    console.error("locating module: " + path);

    // todo actually search libs

    return Q(this.libs + '/' + path + '.exa');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a promise for the specified module.
 *
 * @param path
 */
__.prototype.getModule = function (path) {

    // todo cache loaded modules

    var self = this;

    return this.findModule(path).then(
        function (fullPath) {

//            console.error("loading module: " + fullPath);

            return Q.nfcall(fs.readFile, fullPath, 'utf-8').then(
                function (source) {

                    return new Module(source, self);
                },
                function (err) {
                    throw new Error("failed to load module: " + path + "\n" + err);
                });
        },
        function () {
            throw new Error("couldn't find module " + path);
        }
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * The root connect() procedure to be provided to a main module and called from within exa.
 * It needs to conform to the procedure type as well as return a promise to a procedure.
 *
 * @param recur
 * @param args
 * @param connect
 */
__.prototype.rootAttach = function (recur, args, connect) {

    // create a module from the path
    // we need to return a promise for a procedure (a function that takes the common args of (recur, args, connect))
    // so that it can be bound to a var and called from within exa

    return this.getModule(args[0]).then(
        function (module) {

            // might want to refactor this class so we don't need this bind
            return module.load();
        }
    );
};

module.exports = __;