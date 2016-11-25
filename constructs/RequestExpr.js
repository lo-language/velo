/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');
const Identifier = require('./Identifier');


/**
 * A "function call" (request) expression
 *
 * @param address
 * @param args
 * @param blocking
 */
var __ = function (address, args, blocking) {

    this.address = address;
    this.args = args;
    this.blocking = blocking || false;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'request_expr',
        address: this.address.getAst(),
        args: this.args.map(arg => arg.getAst()),
        blocking: this.blocking
    };
};

/**
 * Compiles this node to JS in the given context.
 * The context needs to be a statement context in this case.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var target = this.address.compile(context);

    var args = this.args.map(arg => {
        return arg.compile(context);
    });

    // get a placeholder
    // we push a request into the context whether sync or async
    return context.pushRequest(target, args, this.async);
};

module.exports = __;