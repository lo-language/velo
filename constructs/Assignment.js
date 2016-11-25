/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');
const Identifier = require('./Identifier');

/**
 * An assignment statement.
 *
 * @param op
 * @param left      expr
 * @param right     expr
 */
var __ = function (op, left, right) {

    this.op = op;
    this.left = left;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'assign',
        op: this.op,
        left: this.left.getAst(),
        right: this.right.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // if the left node is a bare ID, then we compile it as an lvalue
    // otherwise all IDs are compiled as rvalues

    var left = this.left.compile(context);
    var right = this.right.compile(context);

    // todo this implies block-level scoping
    if (this.left instanceof Identifier) {

        var name = this.left.name;

        // validate we're not assigning to a constant
        if (context.isConstant(name)) {
            throw new Error("can't assign to a constant (" + name + ")");
        }

        // declare if a new var
        // can this not be idempotent?
        if (context.has(name) == false) {
            context.declare(name);
        }

        // see if the RHS is a dispatch
        // if (this.right.type == 'message') {
        //     context.setFuture(name);
        // }
    }

    return context.wrapStatement(new JsStmt(JS.exprStmt(JS.assign(left, right, this.op == '=' ? null : this.op))));

    // this was genius
    // above comment inserted by my slightly tipsy wife regarding definitely non-genius code later removed - SP

};

module.exports = __;