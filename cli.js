#!/usr/bin/env node
/**
 * The Exa-to-Node compiler/VM
 *
 * we need the ability to compile dynamically loaded files
 * compiles provided source file, evals it to create an object
 */

'use strict';

var fs = require('fs');
var parser = require('./parser/Parser');
var ast = require('./ast');
var TargetFn = require('./codegen/TargetFn');
var System = require('./vm/System');
var Q = require('q');

var sourceFile = process.argv[2];

if (sourceFile == null) {
    console.error("error: no source file specified");
    process.exit();
}

// read the source file
// node [path to this file] [path to input file]
// model args as object that throws when you ask for an empty one
var source = fs.readFileSync(process.argv[2], 'utf8');

//////////////////////////////////////////
// parse

console.error("parsing " + sourceFile);
var module = new ast.Action(parser.parse(source));
//console.error(util.inspect(ast, {depth: null}));

//////////////////////////////////////////
// compile

console.error("compiling");
var js = module.compile().getCode();
console.log(js);

//////////////////////////////////////////
// load

console.error("loading");
var main = 'Oh freddled gruntbuggly';
eval("main = " + js + ';');
var sys = new System(main);

//////////////////////////////////////////
// initialize the environment and run

console.error("running");
sys.run();
//process.exit(exitCode);