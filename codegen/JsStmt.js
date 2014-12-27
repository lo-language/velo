/**
 * Wraps a JS statement.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var __ = function (stmt) {

    this.stmt = stmt;
};

__.prototype.renderStmt = function () {

    // should we merge stmt and context?
    // since each stmt gets its own jscontext (or is a passthrough)

    return this.stmt;
};

module.exports = __;

