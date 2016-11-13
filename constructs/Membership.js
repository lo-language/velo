/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');


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

    return JS.runtimeCall(
        'in', [
            this.left.compile(context),
            this.right.compile(context)
        ]);
};

module.exports = __;