/**
 * Wraps an async function call in a way that can render a statement or an expression.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsStmt = require('./JsStmt');
var JsExpr = require('./JsExpr');

var __ = function (fnVar, args) {

    this.fn = fnVar;
    this.args = args;
};

__.prototype.getStatus = function () {

    return 'promise';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders a JS function call.
 *
 * @param stmtContext
 * @return {String}
 */
__.prototype.renderCall = function (stmtContext) {

    var nameExpr = this.fn.renderExpr(stmtContext);
    var argsExpr = this.args.map(
        function (arg) {
            return arg.renderExpr(stmtContext);
        }).join(',');

    return nameExpr + '(' + argsExpr + ')';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the expression value of this call.
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderExpr = function (stmtContext) {

    // to use an async call as an expression, we need to define a promise prereq in the context

    var self = this;

    // create a promise prereq in the current context; when this prereq is rendered, it may push
    // prereqs of its own into the context (which will be different from the one defined for this invocation)

    return stmtContext.definePrereq(new JsExpr(
        function (stmtContext) {
            return self.renderCall(stmtContext);
        }
    ), true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the call as a standalone statement.
 *
 * @return {String}
 */
__.prototype.renderStmt = function () {

    var self = this;

    var stmt = new JsStmt(function (stmtContext) {
        return self.renderCall(stmtContext) + ';';
    });

    return stmt.renderStmt();
};

module.exports = __;

