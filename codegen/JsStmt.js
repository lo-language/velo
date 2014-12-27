/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsContext = require('./JsContext');

var __ = function (stmt) {

    this.stmt = stmt;
};

__.prototype.renderStmt = function () {

    // should we merge stmt and context?
    // since each stmt gets its own jscontext (or is a passthrough)

    return this.stmt;
};

module.exports = __;

