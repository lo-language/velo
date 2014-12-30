/**
 * Models a JS context - what vars we have available.
 *
 * should the context be on the stmt object?
 *
 * Created by: spurcell
 * 12/26/14
 */

"use strict";

var __ = function () {

    this.promises = [];
    this.expressions = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a new variable in this context with the given value.
 *
 * @param expr - a JS expression
 */
__.prototype.defineExpr = function (expr) {

    var subVarName = 'exp_' + this.expressions.length;

    this.expressions.push(expr);

    return subVarName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Pushes a JsCall node into the context.
 *
 * @param call
 */
__.prototype.addPromise = function (call) {

    var subVarName = 'tmp_' + this.subs.length;

    this.promises.push(call);

    return subVarName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Renders the given statement in this context.
 */
__.prototype.render = function (stmt) {

    // render the requirements
    // we have two kinds of requirements - prereqs that need to be above, and promises that need to be resolved

    var prereqs = this.expressions.map(function (expr, index) {

        return expr.render(nested);
    });

    // return the bare statement if there's no reason to wrap it
    if (this.subs.length == 0) {
        return stmt;
    }

    var nested = new __();  // the inner expr context becomes the OUTER function

    var args = [];
    var promises = this.promises.map(function (sub, index) {

        args.push('tmp_' + index);

        return sub.renderCall(nested);
    });

    // could alternatively create a new rejection handler here, rather than reusing the parent context's
    return nested.render('\nQ.spread([' + promises.join(',') + '], function (' + args.join(',') + ') {\n    '
        + stmt + '\n}, result.reject);');
};

module.exports = __;