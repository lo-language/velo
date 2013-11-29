#!/usr/bin/env node
/**
 * The Opake-to-node compiler
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

var template = fs.readFileSync(__dirname + '/codegen/runtime.js', 'utf8');
var code = 'main = ' + codegen(ast) + ';';

fs.writeFileSync(process.argv[3], template.replace('//<<CODE>>', code), 'utf8');
fs.chmodSync(process.argv[3], '777');

function codegen(node, newline) {

    if (typeof node == 'number') {
        return node;
    }

    if (typeof node == 'string') {

        // identifier name
        return '_' + node;
    }

    var nodeType = node[0];

    newline = newline || '\n';

    switch (nodeType) {

        case 'action':

            // guard identifier names from JS reserved words
            var args = node[1].map(function (name) { return '_' + name; });
            var statements = node[2];

            var result = 'function (args, _out, _err, _log) {' + newline + '\t';

            // generate code for statements

            statements.forEach(function (statement) {
                result += codegen(statement, newline + '\t');
            });

            return result + newline + '}';
            break;

        case 'define':
        case 'assign':
            return 'var ' + codegen(node[1], newline) + ' = ' + codegen(node[2], newline) + ';';
            break;

        case '~':
        case '->':

            // create a nonce function for the RHS

            var rhs = newline + "var xa = function (message, channel) {" + newline + "};";

            return codegen(node[1], newline) + newline + rhs;

            break;

        case 'capture':
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
//
//function createSource (node) {
//
//    if (typeof node == 'number') {
//        return 'Q.when(' + node + ')';
//    }
//
//    if (typeof node == 'string' || node[0] == 'str') {
//        return 'Q.when(' + codegen(node) + ')';
//    }
//
//    throw new Error("what's a " + node[0]);
//};