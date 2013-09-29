#!/usr/bin/env node

'use strict';

var fs = require('fs');
var parser = require('./vm/Parser');

// node [path to this file] [path to input file]
var source = fs.readFileSync(process.argv[2], 'utf8');

var ast = parser.parse(source);

ast.run();
