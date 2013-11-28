#!/usr/bin/env node

'use strict';

var fs = require('fs');
var parser = require('./Parser');
var util = require('util');

// node [path to this file] [path to input file]
var source = fs.readFileSync(process.argv[2], 'utf8');

var ast = parser.parse(source);

console.log(util.inspect(ast, {depth: null}));
