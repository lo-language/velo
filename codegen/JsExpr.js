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

__.READY = 2;
__.PENDING = 1;
__.UNKNOWN = 0;

// could alternatively have different expr classes for the different statuses
__.prototype.getStatus = function () {
    return this.status;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the expression in the given statement context.
 *
 * @param stmtContext
 * @return {String}
 */
__.prototype.renderExpr = function (stmtContext) {

    if (typeof this.expr === 'function') {
        return this.expr(stmtContext);
    }

    return this.expr;
};

module.exports = __;

