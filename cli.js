#!/usr/bin/env node

'use strict';

var OpNode = require('./vm/OpNode');
var Procedure = require('./vm/Procedure');
var parser = require('./parser/GelParser').parser;
var fs = require('fs');

// node [path to this file] [path to input file]
var source = fs.readFileSync(process.argv[2], 'utf8');

// todo - create parser tests

parser.yy = {
    OpNode: OpNode
};

var result = parser.parse(source);

//console.log(result);

var proc = new Procedure(result);

proc.run();
