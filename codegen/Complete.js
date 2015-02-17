/**
 * Created by: spurcell
 * 2/15/15
 */

"use strict";


/**
 *
 * @param promises  list of JS expressions that can return promises
 * @private
 */
var __ = function (promises) {

    this.promises = promises;
};

__.prototype.continue = function (stmt) {

    this.child = stmt;

    return this;
};

__.prototype.renderStmt = function () {

    var self = this;

    return "Q.spread([" +
        self.promises.map(
            function (expr) {
                return expr.renderExpr(self);
            }).join(',') +
        "], function () {" + this.child.renderStmt() + "});"
};

module.exports = __;