/**
 * Module is the bridge between codegen and execution.
 */

"use strict";

const parser = require('./../parser/Parser');
const Scope = require('./../codegen/Scope');
const util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Processes exa source into a factory method that can be called to create an exa service.
 *
 * @param source    exa source code for a module
 */
var __ = function (source) {

    var moduleScope = new Scope();

    // create a factory method to build a service bound to a registry
    // use new Function() so as not to leak the local scope (can't hide globals)
    this.makeService = new Function('MODS', moduleScope.compile(parser.parse(source)).render());

    // actually loading the dependencies is the concern of a loader
    this.deps = moduleScope.getDeps();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
//__.prototype.parse = function () {
//
//    if (this.ast === undefined) {
//        this.ast = parser.parse(this.source);
//    }
//
//    return this.ast;
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
//__.prototype.compile = function () {
//
//    try {
//        var moduleScope = new Scope();
//        var js = moduleScope.compile(this.parse()).render();
//
//        this.deps = moduleScope.getDeps();
//
//        // create a factory method to build a service bound to a registry
//        // use new Function() so as not to leak the local scope (can't hide globals)
//        this.makeService = new Function('MODS', this.getJs());
//    }
//    catch (e) {
//        console.error("error compiling module");
//        console.error(e.stack);
//        console.error(util.inspect(this.parse(), {depth: null}));
//    }
//};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Lean on JavaScript to recover the generated JS.
 *
 * @return {String}
 */
__.prototype.getJs = function () {
    return this.makeService.toString();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns a list of modrefs for this module's dependencies in no particular order.
 *
 * @return {String}
 */
__.prototype.getDeps = function () {
    return this.deps;
};

module.exports = __;