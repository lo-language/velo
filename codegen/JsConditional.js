/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsStmt = require('./JsStmt');

var __ = function (predicate, consequent, otherwise) {

    this.predicate = predicate;
    this.consequent = consequent;
    this.otherwise = otherwise; // or else if stmt
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders this conditional statement.
 *
 * @return {*}
 */
__.prototype.renderStmt = function () {

    var self = this;

    var stmt = new JsStmt(function (stmtContext) {

        var cond = 'if (' + self.predicate.renderExpr(stmtContext) + ') {\n\t';

        self.consequent.forEach(function (stmt) {
            cond += stmt.renderStmt().replace(/\n/g, '\n\t') + '\n';
        });

        cond += '}';

        if (self.otherwise !== undefined) {

            cond += '\nelse ';

            if (Array.isArray(self.otherwise)) {

                cond += '{\n';

                self.otherwise.forEach(function (stmt) {
                    cond += '    ' + stmt.renderStmt().replace(/\n/g, '\n\t') + '\n';
                });

                cond += '}';
            }
            else {
                cond += self.otherwise.renderStmt();
            }
        }

        return cond;
    });

    return stmt.renderStmt();
};

module.exports = __;

