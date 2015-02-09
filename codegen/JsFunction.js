/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsResult = require('./JsResult');

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
 * @return {String}
 */
__.prototype.renderExpr = function () {

    // maybe we should render statements INTO the js context? let it decide how to wrap them?

    var body =
        '\n\tvar result = Q.defer();\n\n\t' +
            this.stmts.map(function (stmt) {
                return stmt.renderStmt();
            }).join('\n');

    // if the last statement isn't a result, add a return statement
    if (this.stmts[this.stmts.length - 1] instanceof JsResult == false) {
        body += '\n\treturn result.promise;';
    }

    return 'function ($_recur, args) {'+
        body.replace(/\n/g, '\n\t') + '\n}';
};

module.exports = __;

