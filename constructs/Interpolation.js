/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 *
 * @param prefix
 * @param expr
 * @param suffix
 */
var __ = function (prefix, expr, suffix) {

    this.prefix = prefix;
    this.expr = expr;
    this.suffix = suffix;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'interpolation',
        left: this.prefix,
        middle: this.expr.getAst(),
        right: this.suffix
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