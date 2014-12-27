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
    this.isReady = left.isReady && right.isReady;
};

__.prototype.getStatus = function () {

    var leftStatus = left.getStatus();
    var rightStatus = right.getStatus();

    if (leftStatus === 'ready' && rightStatus === 'ready') {
        return 'ready';
    }

    if (leftStatus === 'undef' || rightStatus === 'undef') {
        return 'undef';
    }

    return 'promise';
};

/**
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderExpr = function (jsContext) {

    if (this.op === 'subscript') {
        return this.left.renderExpr(jsContext) + '[' + this.right.renderExpr(jsContext) + ']';
    }

    // use parens to be safe
    return '(' + this.left.renderExpr(jsContext) + ' ' + this.op + ' ' + this.right.renderExpr(jsContext) + ')';
};

module.exports = __;

