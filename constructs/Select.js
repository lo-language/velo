/**
 * Created by seth on 11/12/16.
 */

"use strict";

/**
 * A record select (dot operator) expression
 *
 * @param recordExpr
 * @param field
 */
var __ = function (recordExpr, field) {

    this.recordExpr = recordExpr;
    this.field = field;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'select',
        record: this.recordExpr.getAst(),
        field: this.field
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