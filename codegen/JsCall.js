/**
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var JsExpr = require('./JsExpr');
var JsContext = require('./JsContext');

var __ = function (fnId, args) {

    this.fnId = fnId;
    this.args = args;
};

__.prototype = Object.create(JsExpr);

/**
 * Renders a JS function call.
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderCall = function (jsContext) {

    var nameExpr = this.fnId.renderExpr(jsContext);
    var argsExpr = this.args.map(
        function (arg) {
            return arg.renderExpr(jsContext);
        }).join(',');

    return nameExpr + '(' + argsExpr + ')';
};

/**
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderExpr = function (jsContext) {

    // to use an async call as an expression, it needs to be replaced by a temp var and
    // wrapped in a callback context

    return jsContext.addPromise(this);
};

/**
 * Renders the call as a standalone statement.
 *
 * @return {String}
 */
__.prototype.renderStmt = function (jsContext) {

    return this.renderCall(jsContext) + ';';
};

module.exports = __;

