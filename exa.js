#!/usr/bin/env node
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

'use strict';

var fs = require('fs');
var ExaModule = require('./loader/ExaModule');
var Q = require('q');
var util = require('util');

var sourceFile = process.argv[2];

if (sourceFile == null) {
    console.error("error: no source file specified");
    process.exit();
}

var source = fs.readFileSync(process.argv[2], 'utf8');
var module = new ExaModule(source);

var io = {};

console.error(module.compile());

module.run().then(
    function (result) {
        console.log(result);
    },
    function (msg) {
        console.error(msg);
    }
);

// todo how do we get signals from the system?
// can we use the bare JS objects here or do they have to be exa-wrapped somehow?

//module.run(process.argv, io, process.env).then(function () {
//
//    console.error("success!");
//
//    // handle program success
//    console.log(util.inspect(arguments));
//
//}, function () {
//
//    console.error("failure!");
//
//    // handle program failure
//
//    console.log(util.inspect(arguments));
//
//    // inform the OS
//    process.exit(1);
//});