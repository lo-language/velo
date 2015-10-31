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

            return Q.denodeify(fs.readFile)(fullPath, 'utf8').then(
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
 * Has the signature to be called as a procedure from Exa.
 *
 * @param recur
 * @param args
 * @return {*}
 */
__.prototype.acquire = function (recur, args) {

    this.getModule(args[0]).then(
        function (module) {

            // might want to refactor this class so we don't need this bind
            return module.load();
        }
    ).then(
        function () {



        }
    ).end();
};

module.exports = __;