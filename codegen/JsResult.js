/**
 * Wraps an async function call in a way that can render a statement or an expression.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";


var __ = function (stmt) {
    this.stmt = stmt;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the call as a standalone statement.
 *
 * @return {String}
 */
__.prototype.renderStmt = function () {

    return this.stmt.renderStmt() + '\nreturn result.promise;';
};

module.exports = __;

