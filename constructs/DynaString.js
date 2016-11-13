/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 *
 * @param left
 * @param infix
 * @param right
 */
var __ = function (left, infix, right) {

    this.left = left;
    this.infix = infix;
    this.right = right;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'dynastring',
        left: this.left.getAst(),
        middle: this.infix,
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