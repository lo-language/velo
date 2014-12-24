/**
 * Wraps an exa program.
 *
 * Created by: spurcell
 * 12/24/14
 */

"use strict";

var parser = require('../parser/Parser');
var compiler = require('./Compiler');
var Q = require('q');
var util = require('util');

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
__.prototype.compile = function () {

    if (this.js === undefined) {
        this.js = compiler.compile(this.parse());
    }

    console.log(this.js);

    return this.js;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the compiled code to be executed.
 */
__.prototype.load = function () {

    if (this.fn === undefined) {

        // create a function NOT as a closure
        // this doesn't leak the local scope, but doesn't hide globals, either

        this.fn = new Function('Q, $_recur', this.compile());
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Runs the program, returning a promise for the result.
 *
 * @return {promise}
 */
__.prototype.run = function () {

    if (this.fn === undefined) {
        this.load();
    }

    var recur = this.fn.bind(null, Q, function () {

//        console.log('recurrence');
//        console.log(util.inspect(arguments));
        return recur.apply(null, arguments);
    });

    return recur.apply(null, arguments);
};

module.exports = __;