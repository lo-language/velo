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

