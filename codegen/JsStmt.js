/**
 * Wraps a JS statement in a context that can include
 *
 * - prereqs that need to be defined
 * - promises that need to be resolved
 *
 * Created by: spurcell
 * 12/25/14
 * happy birthday, granddad!
 */

"use strict";

var __ = function (stmt) {

    this.numPrereqs = 0;

    this.prereqs = {};
    this.promises = {};
    this.stmt = stmt;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param stmt
 */
__.prototype.continue = function (stmt) {

    this.child = stmt;

    // fluent
    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * A prereq is an expression that must be defined before the statement can be executed, and which may be a promise.
 *
 * @param expr - bare string or JsExpr
 * @param isPromise
 * @return {String}
 */
__.prototype.definePrereq = function (expr, isPromise) {

    var varName = 'tmp_' + this.numPrereqs;

    if (typeof expr === 'string') {
        expr = new JsExpr(expr);
    }

    this.numPrereqs++;

    if (isPromise) {

        // might expr need to be an object rather than a string?
        this.promises[varName] = expr;
    }
    else {

        // might expr need to be an object rather than a string?
        this.prereqs[varName] = expr;
    }

    return varName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
__.prototype.renderStmt = function () {

    // render the statement and collect prereqs by passing this down
    var stmt = (typeof this.stmt === 'function' ? this.stmt(this) : this.stmt);

    // render the prereqs
    // todo figure out if this works if they're nested - I think it does not

    var self = this;
    var prereqs = Object.keys(this.prereqs).reduce(function (prev, varName) {
        return prev + 'var ' + varName + ' = ' + self.prereqs[varName].renderExpr(self) + ';\n';
    }, '');


    var continuation = this.child ? '\n' + this.child.renderStmt() : '';

    stmt = prereqs + stmt + continuation;

    if (Object.keys(this.promises).length == 0) {
        return stmt;
    }

    // if we want to resolve promises for a statement, we actually have to
    // *create a new statement to resolve them and wrap the original statement in the callback*
    // and we have to do this recursively!

    var args = Object.keys(this.promises);
    var promises = args.map(function (varName) {
        return self.promises[varName];
    });

    // create the wrapper statement
    // could alternatively create a new rejection handler here, rather than reusing the parent context's

    var wrapper = new __(
        function (stmtContext) {
            return 'Q.spread([' + promises.map(
                function (expr) {
                    return expr.renderExpr(stmtContext);
                }).join(',') + '], function (' + args.join(',') + ') {\n    '
                        + stmt + '\n}, result.reject);'   // execute the statement inside the wrapper callback
    });

    return wrapper.renderStmt();
};

module.exports = __;

var JsExpr = require('./JsExpr');
