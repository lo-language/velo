/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsStmt = require('./JsStmt');

var __ = function (predicate, posBlock, negBlock) {

    this.predicate = predicate;
    this.posBlock = posBlock;
    this.negBlock = negBlock; // or else if stmt
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.renderStmt = function () {

    var self = this;

    var stmt = new JsStmt(function (stmtContext) {

        var cond = 'if (' + self.predicate.renderExpr(stmtContext) + ') {\n';

        self.posBlock.forEach(function (stmt) {
            cond += '    ' + stmt.renderStmt() + '\n';
        });

        cond += '}';

        if (self.negBlock !== undefined) {

            cond += '\nelse ';

            if (Array.isArray(self.negBlock)) {

                cond += '{\n';

                self.negBlock.forEach(function (stmt) {
                    cond += '    ' + stmt.renderStmt() + '\n';
                });

                cond += '}';
            }
            else {
                cond += self.negBlock.renderStmt();
            }
        }

        return cond;
    });

    return stmt.renderStmt();
};

module.exports = __;

