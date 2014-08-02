/**
 * Created by: spurcell
 * 12/25/13
 *
 * A compilation context.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent
 * @constructor
 */
var __ = function (parent) {

    this.vars = {};

//
//    this.parent = parent || null;
//    this.newline = parent ? parent.newline + '\t' : '\n';
//
//    this.seqCounter = 0;
//    this.seqStack = []; // maybe sequences should parse right-recursive?
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param name
 * @param value
 */
__.prototype.declare = function (name, value) {

    if (this.vars[name] === undefined) {
        this.vars[name] = value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
//__.prototype.push = function () {
//    return new __(this);
//};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {String}
 */
//__.prototype.getSeqName = function () {
//
//    this.seqCounter++;
//    return 'seq' + this.seqCounter;
//};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @return {*}
 */
__.prototype.codegen = function (node) {

//    return 'function (message, out, err, chunk) { this.system.sendMessage(out, "yay"); }';

    if (typeof node == 'number') {
        return node;
    }

    if (typeof node == 'string') {

        // guard identifier name
        return '_' + node;
    }

    var nodeType = node[0];

    // results are generated and then tabbed in?

    switch (nodeType) {

        case 'action':

            // guard argument names from JS reserved words
            var statements = node[2];

            var result = 'function (message, out, err, chunk) {' +
                this.newline + '\t' + node[1].map(
                    function (name, i) {
                        return 'var _' + name + ' = message[' + i + '];';
                    }).join(this.newline + '\t') +
                    this.newline + '\t';

            // create a new context for this action
            var action__ = this.push();

            // generate code for statements
            statements.forEach(function (statement) {
                result += action__.codegen(statement);
            });

            return result + '}';
            break;

        case 'define':
        case 'assign':
            return 'var ' + this.codegen(node[1]) + ' = ' + this.codegen(node[2]) + ';' + this.newline;
            break;

        case '~':
        case '->':
            return "this.system.sendMessage(" + this.codegen(node[2]) + ", " + this.codegen(node[1]) + ");" + this.newline;
            break;

        case 'str':
            return '"' + node[1] + '"';
            break;

        case 'select':
            return this.codegen(node[1]) + "." + this.codegen(node[2]);
            break;

        default:
            // identifier
            if (typeof node == 'string') {
                return '_' + node;
            }
            break;
    }

    return '';
};

module.exports = __;