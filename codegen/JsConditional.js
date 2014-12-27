/**
 * Wraps a JS statement with async needs in a Q.spread to make its needs available.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsContext = require('./JsContext');

var __ = function (predicate, posBlock, negBlock) {

    this.predicate = predicate;
    this.posBlock = posBlock;
    this.negBlock = negBlock; // or else if stmt
};

__.prototype.renderExpr = function () {

    throw new Error("conditional statement can't be used as expression");
};

__.prototype.renderStmt = function () {

    var jsContext = new JsContext();

    var cond = 'if (' + this.predicate.renderExpr(jsContext) + ') {\n';

    this.posBlock.forEach(function (stmt) {
        cond += '    ' + stmt.renderStmt() + '\n';
    });

    cond += '}';

    if (this.negBlock !== undefined) {

        cond += '\nelse ';

        if (Array.isArray(this.negBlock)) {

            cond += '{\n';

            this.negBlock.forEach(function (stmt) {
                cond += '    ' + stmt.renderStmt() + '\n';
            });

            cond += '}';
        }
        else {
            cond += this.negBlock.renderStmt();
        }
    }

    return jsContext.render(cond);
};

module.exports = __;

