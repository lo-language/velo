/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A binary operator expression
 *
 * @param op
 * @param left
 * @param right
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
        type: 'op',
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

};

module.exports = __;