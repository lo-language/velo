'use strict';

var OpNode = require('./OpNode');
var Procedure = require('./Procedure');
var parser = require('./gel').parser;
var fs = require('fs');

var source = fs.readFileSync('./test.gel', 'utf8');

parser.yy = {
    OpNode: OpNode
};

var result = parser.parse(source);

var proc = new Procedure([result]);

proc.run();