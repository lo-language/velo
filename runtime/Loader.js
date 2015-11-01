/**
 * To be callable from within exa, a JS function needs to adhere to the signature:
 *
 * foo(recur, args);
 *
 * should we make an ExaService class? and have a Loader be a factory for such things? and maybe Module is a subclass?
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

    // stash
    var loader = this;

    /**
     * Has the signature to be called as a procedure from Exa, and returns a fn
     * that also has the signature to be called as a procedure from Exa.
     *
     * @param recur
     * @param args
     * @return {*}
     */
    this.acquire = function (recur, args) {

        // since we're being called from exa, 'this' is now bound to a request
        var request = this;
        var modulePath = args[0];

        loader.getModule(modulePath).then(
            function (module) {

                // might want to refactor this class so we don't need this bind
                return module.load();
            },
            function (error) {
                console.error("error loading " + modulePath);
            }
        ).then(
            function (procedure) {

                request.reply(procedure);
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