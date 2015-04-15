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
var Compiler = require('./../codegen/Compiler');
var Q = require('q');

var __ = function (source, loader) {

    this.source = source;
    this.loader = loader;
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
        this.js = Compiler.compile(this.parse());
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

        // the function we create here won't have a name, so can't call itself recursively
        // so we wrap the function we get by compiling the root procedure in another function
        // that just gives that function a name and immediately calls it, passing through any args

//        var body = '"use strict";\nvar root = ' + this.compile().render() +
//            '\n\nreturn root(root, args, rootAttach);';

        // enable strict mode and wrap the compiled result so we can use it with the Function constructor,
        // but keep the same sig as what we're wrapping

        var body = '"use strict";\n\nvar root = ' + this.compile().render() +
            ';\n\nreturn root(root, args, attach)';

        // this has the same sig as a normal procedure so it can be returned from attach
        // hmm - to implement recur we could just use a nested function everywhere... seems more expensive, but cleaner
        // then we're not depending on the caller to call us properly
        // we drop in Q so that it doesn't have to live in global space
        // todo - should we use this instead of an arg for Q?

        this.procedure = new Function('Q, recur_not_used, args, attach', body).bind(null, Q);
    }

    return this.procedure;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Runs the program, passing in the arguments we're given, returning a promise for the result.
 * Note that this is only called on the 'main' module for a program! All other modules are called
 * from this module, directly or indirectly.
 *
 * @param args  arguments array to pass into the procedure
 * @return {promise}
 */
__.prototype.run = function (args) {

    if (this.procedure === undefined) {
        this.load();
    }

    // we don't need to pass a value for recur (arg 2) because of how module procedures are built
    return this.procedure(null, args, this.loader.rootAttach.bind(this.loader));
};

module.exports = __;