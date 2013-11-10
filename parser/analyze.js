/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var fs = require('fs');
var parser = require('./Parser');

// node [path to this file] [path to input file]
var source = fs.readFileSync(process.argv[2], 'utf8');

var ast = parser.parse(source)

console.log(JSON.stringify(ast, null, "\t"));