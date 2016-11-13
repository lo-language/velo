/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A "function call" (request) expression
 *
 * @param address
 * @param args
 * @param async
 */
var __ = function (address, args, async) {

    this.address = address;
    this.args = args;
    this.async = async || false;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: this.async ? 'future' : 'application',
        address: this.address.getAst(),
        args: this.args.map(arg => arg.getAst())
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

};

module.exports = __;