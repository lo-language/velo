/**
 * To be callable from within exa, a JS function needs to adhere to the signature:
 *
 * foo(recur, args);
 *
 * should we make an ExaService class? and have a Loader be a factory for such things? and maybe Module is a subclass?
 */

"use strict";

const Module = require('./Module');
const fs = require('fs');
const Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a loader to load modules from the specified path.
 *
 * @param libs  array of directories or archives to search for modules
 */
var __ = function (libs) {

    this.libs = libs;

    var _this = this;

    /**
     * An Exa service function (JS fn that takes a task) that returns an Exa service function.
     *
     * @param task
     * @return {*}
     */
    this.acquire = function (task) {

        var modulePath = task.args[0];

        _this.getModule(modulePath).then(
            function (module) {

                // might want to refactor this class so we don't need this bind
                return module.load();
            },
            function (error) {
                console.error("error loading " + modulePath);
            }
        ).then(
            function (procedure) {

                task.respond("reply", procedure);
            }
        ).done();
    };
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

                    return new Module(source);
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

module.exports = __;