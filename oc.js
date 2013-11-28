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

    var nodeType = node[0];

    switch (nodeType) {

        case 'action':

            // guard identifier names from JS reserved words
            var args = node[1].map(function (name) { return '_' + name; });
            var statements = node[2];

            var result = 'function (' + args.join(',') + ') {\n';

            // generate code for statements

            statements.forEach(function (statement) {
                result += '\t' + codegen(statement) + '\n';
            });

            return result + '}';
            break;

        case 'define':
            return 'var _' + node[1] + ' = ' + node[2] + ';';
            break;

        case '->':
            return '(' + codegen(node[2]) + ')(' + codegen(node[1]) + ');'
            break;

        case 'str':
            return '"' + node[1] + '"';
            break;

        default:
            // identifier
            if (typeof node == 'string') {
                return '_' + node;
            }
            break;
    }

    return '';
}