/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsContext = require('./JsContext');

var __ = function (expr) {

    this.expr = expr;
};

__.prototype.renderExpr = function () {

    throw new Error("statement can't be used as expression");
};

__.prototype.renderStmt = function () {

    // each stmt gets its own context for now
    // merge stmt and context?

    var jsContext = new JsContext();

    var stmt = this.expr.renderStmt(jsContext);

    return jsContext.render(stmt);
};

module.exports = __;

