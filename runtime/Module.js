"use strict";

var parser = require('./../parser/Parser');
var Compiler = require('./../codegen/Compiler');
var Task = require('./Task');
var Q = require('q');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param source
 * @private
 */
var __ = function (source) {

    this.source = source;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.parse = function () {

    if (this.ast === undefined) {
        this.ast = parser.parse(this.source);
    }

    return this.ast;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {String}
 */
__.prototype.getJs = function () {

    if (this.js === undefined) {

        try {
            this.js = Compiler.compile(this.parse()).render();
        }
        catch (e) {
            console.error(e.stack);
        }
    }

    return this.js;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the compiled code to be executed - NOT as a closure. This doesn't leak the local scope, but doesn't hide
 * globals, either. But name wrapping should make the globals unaddressable - unlless there's one that starts with $_.
 *
 * @return {Function}
 */
__.prototype.load = function () {

    if (this.procedure === undefined) {

        // enable strict mode and wrap the compiled result so we can use it with the Function constructor,
        // but keep the same sig as what we're wrapping

        // todo - how do we want to interface between our internal procedure style and JS?

        var body =
            '"use strict";\n\n' +
            'var root = ' + this.getJs() + ';\n\n' +
            'root(rootTask);\n';

        // create an Exa service (JS fn that takes a task) from the compiled module
        this.procedure = new Function('rootTask', body);
    }

    return this.procedure;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Runs the program by sending the arguments we're given as the root task, returning a promise for the result.
 *
 * @param args  arguments array to pass into the procedure
 * @return {promise}
 */
__.prototype.run = function (args) {

    if (this.procedure === undefined) {
        this.load();
    }

    var d = Q.defer();

    // should this function inject acquire? or should that be optional

    Task.sendRootRequest(this.procedure, args, d.resolve.bind(d), d.reject.bind(d));

    return d.promise;
};

module.exports = __;