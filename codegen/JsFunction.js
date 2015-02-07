/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var __ = function (stmts) {

    this.stmts = stmts;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if this expression is "ready" (not a promise), false otherwise.
 *
 * @return {boolean}
 */
__.prototype.isReady = function () {
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the expression in the given statement context.
 *
 * @param stmtContext
 * @return {String}
 */
__.prototype.renderExpr = function (stmtContext) {

    if (stmtContext === undefined) {
        throw new Error("missing statement context");
    }

    this.expr = 'function () {\n\n'+
        'var args = Array.prototype.slice.call(arguments);\n' +
        'var result = Q.defer();\n\n' +
        this.renderBody() + '\n' +
        'return result.promise;\n}\n';

    return this.expr;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the function body for use with new Function();
 *
 * @return {String}
 */
__.prototype.renderBody = function () {

    // maybe we should render statements INTO the js context? let it decide how to wrap them?

    return this.stmts.reduce(function (prev, stmt) {
        return prev + stmt.renderStmt() + '\n';
    }, '');
};

module.exports = __;

