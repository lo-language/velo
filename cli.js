#!/usr/bin/env node

'use strict';

var fs = require('fs');
var parser = require('./parser/GelParser').parser;
var OpNode = require('./vm/OpNode');
var Procedure = require('./vm/Procedure');
var Identifier = require('./vm/Identifier');

// node [path to this file] [path to input file]
var source = fs.readFileSync(process.argv[2], 'utf8');

// todo - create parser tests

parser.yy = {
    OpNode: OpNode,
    Identifier: Identifier
};

var result = parser.parse(source);

//console.log(result);

var proc = new Procedure(result);

proc.run();
