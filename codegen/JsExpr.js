/**
 * A JS primary expression (literal | identifier) wrapper
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

/**
 *
 * @param expr
 * @param isReady   true if this expression can immediately resolve to a value (contains no potential promises)
 * @private
 */
var __ = function (expr, status) {
    this.expr = expr;
    this.status = status;
};

// could alternatively have different expr classes for the different statuses
__.prototype.getStatus = function () {
    return this.status;
};

/**
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderExpr = function (jsContext) {
    return this.expr;
};

module.exports = __;

