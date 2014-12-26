/**
 * Simple base class - just an interface, really.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var __ = function (expr) {
    this.expr = expr;
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

