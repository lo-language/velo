/**
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsExpr = require('./JsExpr');

var __ = function (op, left, right) {

    this.op = op;
    this.left = left;
    this.right = right;
};

/**
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderExpr = function (jsContext) {

    // use parens to be safe
    return '(' + this.left.renderExpr(jsContext) + ' ' + this.op + ' ' + this.right.renderExpr(jsContext) + ')';
};

module.exports = __;

