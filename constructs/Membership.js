/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A set membership test operator expression
 *
 * @param left
 * @param right
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
        type: 'in',
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