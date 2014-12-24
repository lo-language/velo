/*
 * Copyright (C) 2014 by Seth Purcell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Author: Seth Purcell
 * Date: 12/24/14
 */

"use strict";

var parser = require('./../parser/Parser');
var compiler = require('./../codegen/Compiler');
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

    return this.js;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Loads the compiled code to be executed.
 */
__.prototype.load = function () {

    if (this.fn === undefined) {

        // create the function NOT as a closure
        // this doesn't leak the local scope, but doesn't hide globals, either
        // but name wrapping should make the globals unaddressable - unless there's one that starts with $_

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