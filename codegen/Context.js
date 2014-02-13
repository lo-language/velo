/**
 * Created by: spurcell
 * 12/25/13
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent
 * @constructor
 */
var Context = function (parent) {

    this.parent = parent || null;
    this.newline = parent ? parent.newline + '\t' : '\n';

    this.seqCounter = 0;
    this.seqStack = []; // maybe sequences should parse right-recursive?
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
Context.prototype.push = function () {
    return new Context(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {String}
 */
Context.prototype.getSeqName = function () {

    this.seqCounter++;
    return 'seq' + this.seqCounter;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @return {*}
 */
Context.prototype.codegen = function (node) {

    if (typeof node == 'number') {
        return node;
    }

    if (typeof node == 'string') {

        // identifier name
        return '_' + node;
    }

    var nodeType = node[0];

    switch (nodeType) {

        case 'action':

            // guard identifier names from JS reserved words
            var args = node[1].map(function (name) { return '_' + name; });
            var statements = node[2];

            var result = 'function (args, _out, _err, _log) {' + this.newline + '\t';

            // create a new context for this action
            var actionContext = this.push();

            // generate code for statements
            statements.forEach(function (statement) {
                result += actionContext.codegen(statement);
            });

            return result + this.newline + '}';
            break;

        case 'define':
        case 'assign':
            return 'var ' + this.codegen(node[1]) + ' = ' + this.codegen(node[2]) + ';';
            break;

        case '~':
        case '->':

            console.log(node);

            // create a nonce function for the RHS

            var nonceFuncName = this.getSeqName();

            var rhs = this.newline + "var " + nonceFuncName + " = function (message, channel) {" + this.newline +
                this.newline +
                "};";

            var result = this.codegen(node[1]);

            if (this.seqStack.length == 0) {
                result += this.newline + nonceFuncName + '();';
            }

            return result;

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
};

module.exports = Context;