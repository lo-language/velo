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
var fs = require('fs');
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
        this.js = Compiler.compile(this.parse()).render();
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

    if (this.fn === undefined) {

        // the function we create here won't have a name, so can't call itself recursively
        // so we wrap the function we get by compiling the root procedure in another function
        // that just gives that function a name and immediately calls it, passing through any args

        var body = 'var root = ' + this.compile() +
            '\n\nreturn root(root, args);';

        // load and info are temporary here
        this.fn = new Function('Q, $_info, $_load, args', body).bind(null, Q,

            function (recur, args) {
                console.error.apply(null, args);
            },

            function (recur, args) {

                var path = args[0];

                console.error("loading " + path);

                return Q.nfcall(fs.readFile, "foo.txt", "utf-8").then(
                    function (source) {

                        var mod = new __(source);

                        console.error("compiling " + source);
                        return mod.load();
                    }
                );
            }
        );
    }

    return this.fn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Runs the program, passing in the arguments we're given, returning a promise for the result.
 *
 * @param args  arguments array to pass into the procedure
 * @return {promise}
 */
__.prototype.run = function (args) {

    if (this.fn === undefined) {
        this.load();
    }

    return this.fn.call(null, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Writes the program out as an executable.
 *
 * @return {promise}
 */
__.prototype.writeExe = function (path) {

    var source = "var Q = require('q');\nvar $_info = console.error;\n\n";

    source += 'function $_recur() {\n\nvar args = Array.prototype.slice.call(arguments);\nvar result = Q.defer();\n\n' + this.compile() + '\n}\n\n';

    // invoke
    source += '$_recur([]).then(console.log, console.error);\n'

    fs.writeFileSync(path, source);
};

module.exports = __;