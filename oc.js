#!/usr/bin/env node
/**
 * The Opake-to-node compiler
 *
 * todo: multiline string literals, with and without line breaks
 */

'use strict';

var fs = require('fs');
var parser = require('./parser/Parser');
var Context = require('./codegen/Context');

var sourceFile = process.argv[2];
var destFile = process.argv[3];

if (sourceFile == null) {
    throw new Error("no source file specified");
}

if (destFile == null) {
    destFile =  'out.js';
}

// node [path to this file] [path to input file]
// model args as object that throws when you ask for an empty one
var source = fs.readFileSync(process.argv[2], 'utf8');

console.log("parsing " + sourceFile);
var ast = parser.parse(source);

console.log("compiling");

// top node should be an action
if (ast[0] != 'action') {
    throw new Error('AST root node should be "action", got "' + ast[0] + '"');
}

var template = fs.readFileSync(__dirname + '/codegen/runtime.js', 'utf8');
var context = new Context();

var code = 'main = ' + context.codegen(ast) + ';\n';

console.log("writing output to " + destFile);
fs.writeFileSync(destFile, template.replace('//<<CODE>>', code) + '\n', 'utf8');
fs.chmodSync(destFile, '777');
process.stdout.write(code, 'utf8');