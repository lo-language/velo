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


var Context = function (parent) {

    this.parent = parent || null;
    this.newline = parent ? parent.newline + '\t' : '\n';

    this.seqCounter = 0;
    this.seqStack = []; // maybe sequences should parse right-recursive?
};

Context.prototype.push = function () {
    return new Context(this);
};

Context.prototype.getSeqName = function () {

    this.seqCounter++;
    return 'seq' + this.seqCounter;
};


var template = fs.readFileSync(__dirname + '/codegen/runtime.js', 'utf8');
var context = new Context();
var code = 'main = ' + codegen(ast, context) + ';';

fs.writeFileSync(process.argv[3], template.replace('//<<CODE>>', code), 'utf8');
fs.chmodSync(process.argv[3], '777');



function codegen(node, context) {

    if (typeof node == 'number') {
        return node;
    }

    if (typeof node == 'string') {

        // identifier name
        return '_' + node;
    }

    var nodeType = node[0];
    var newline = context.newline;

    switch (nodeType) {

        case 'action':

            // guard identifier names from JS reserved words
            var args = node[1].map(function (name) { return '_' + name; });
            var statements = node[2];

            var result = 'function (args, _out, _err, _log) {' + newline + '\t';

            // generate code for statements

            statements.forEach(function (statement) {
                result += codegen(statement, context.push());
            });

            return result + newline + '}';
            break;

        case 'define':
        case 'assign':
            return 'var ' + codegen(node[1], context) + ' = ' + codegen(node[2], context) + ';';
            break;

        case '~':
        case '->':

            // create a nonce function for the RHS

            var nonceFuncName = context.getSeqName();
            var rhs = newline + "var " + nonceFuncName + " = function (message, channel) {" + newline +
                newline +
                "var _repeat = " + nonceFuncName + ';' + newline +
                "};";

            if (context.seqDepth == 0) {
                rhs = rhs + newline + newline + nonceFuncName + '();';
            }

            context.seqDepth++;

            var result = codegen(node[1], context) + newline + rhs;

            context.seqDepth--;

            return result;

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