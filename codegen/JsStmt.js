/**
 * Wraps a JS statement.
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

    if (typeof this.stmt === 'function') {

        var jsContext = new JsContext();

        // should probably let the stmt decide if it needs a semicolon
        var stmt = this.stmt(jsContext) + ';';

        return jsContext.render(stmt);
    }

    return this.stmt;
};

module.exports = __;

