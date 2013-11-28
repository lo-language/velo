#!/usr/bin/env node

/**
 * the opake compiler
 *
 * todo: multiline string literals, with and without line breaks
 */

'use strict';

var fs = require('fs');
var parser = require('./parser/Parser');

// node [path to this file] [path to input file]
// model args as object that throws when you ask for an empty one
var source = fs.readFileSync(process.argv[2], 'utf8');

var ast = parser.parse(source);

// top node should be an action
if (ast[0] != 'action') {
    throw new Error('AST root node should be "action", got "' + ast[0] + '"');
}

var output = fs.readFileSync(__dirname + '/codegen/runtime.js');

output += 'var main = ' + codegen(ast) + ';\n' + 'main();\n';

fs.writeFileSync(process.argv[3], output, 'utf8');

function codegen(node) {

    switch (node[0]) {

        case 'action':

            var args = node[1].map(function (name) { return '_' + name; });

            return 'function (' + args.join(',') +
            ') {\n}';
            break;
    }
}