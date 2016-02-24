/**
 * Module is the bridge between codegen and execution.
 */

"use strict";

const ASTBuilder = require('./../parser/ASTBuilder');
const Scope = require('./../codegen/Scope');
const util = require('util');

var parser = new ASTBuilder();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Processes exa source into a factory method that can be called to create an exa service.
 *
 * @param source    exa source code for a module
 */
var __ = function (source) {

    var ast = parser.parse(source);

    var moduleScope = new Scope();

    try {
        var js = moduleScope.compile(ast).render();
    }
    catch (err) {

        console.error(util.inspect(ast, {depth: null, colors: true}));

        throw err;
    }

    // create a factory method to build a service bound to a registry
    // use new Function() so as not to leak the local scope (can't hide globals)
    this.makeService = new Function('MODS', js);

    // actually loading the dependencies is the concern of a loader
    this.deps = moduleScope.getDeps();
};

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