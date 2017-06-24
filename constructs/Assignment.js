/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const Identifier = require('./Identifier');


/**
 * An assignment statement.
 *
 * @param left      expr
 * @param right     expr
 */
var __ = function (left, right) {

    this.left = left;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'assign',
        left: this.left.getAst(),
        right: this.right.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'set!',
        this.left.getTree(),
        this.right.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var left = this.left.compile(context);
    var right = this.right.compile(context);

    // todo this implies block-level scoping
    if (this.left instanceof Identifier) {

        // if the LHS is a bare ID...

        var name = this.left.name;

        // validate we're not assigning to a constant
        if (context.isConstant(name)) {
            throw new Error("can't assign to a constant (" + name + ")");
        }

        // declare if a new var
        if (context.has(name) == false) {
            context.declare(name);
        }

        // see if the RHS is a dispatch
        // if (this.right.type == 'message') {
        //     context.setFuture(name);
        // }
    }

    return JS.exprStmt(JS.assign(left, right));

    // this was genius
    // above comment inserted by my slightly tipsy wife regarding definitely non-genius code later removed - SP

};

module.exports = __;