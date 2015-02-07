/**
 * Wraps a set of JS statements.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var __ = function (stmts) {

    this.stmts = stmts;
};

__.prototype.renderStmt = function () {

    return this.stmts.reduce(function (prev, cur, index) {
        return prev + (typeof cur == 'string' ? cur : cur.renderStmt()) + '\n';
    }, '');
};

module.exports = __;

