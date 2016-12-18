/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Il semble que la perfection soit atteinte non quand il n'y a plus rien
 * à ajouter, mais quand il n'y a plus rien à retrancher.
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
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
 * Compiles this node to JS in the given context, injecting a wrapper into the context.
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
    return context.pushRequest(target, args, this.blocking);
};

module.exports = __;