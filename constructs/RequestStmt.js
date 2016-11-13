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
var __ = function (address, args, replyHandler, failHandler, async) {

    this.address = address;
    this.args = args;
    this.replyHandler = replyHandler;
    this.failHandler = failHandler;
    this.async = async;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var res = {
        type: this.async ? 'message' : 'application',
        address: this.address.getAst(),
        args: this.args.map(arg => arg.getAst())
    };

    if (this.replyHandler) {
        res.subsequent = this.replyHandler.getAst();
    }

    if (this.failHandler) {
        res.contingency = this.failHandler.getAst();
    }

    return {
        type: 'application_stmt',
        application: res
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