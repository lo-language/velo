/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Expression = require('../codegen/Expression');
var TargetFn = require('../codegen/TargetFn');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (params, statements) {

    this.params = params || [];
    this.statements = statements || [];
    this.vars = {};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the target-lang identifier for the given source name.
 *
 * @param id  the name of the source variable
 */
__.prototype.getRef = function (id) {

    var name = '$' + id;

    // see if we're requesting a param
    if (this.params.indexOf(id) >= 0) {
        return Expression.createParam(name);
    }

    if (this.vars[id] !== undefined) {

        // is there a danger in not creating a new var?
        return this.vars[id];
    }

    // track vars required in this scope
    this.vars[id] = name;

    return Expression.createRef(name);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param value
 */
__.prototype.createLiteral = function (value) {

    // pass through
    return Expression.createLiteral(value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a compound expression.
 *
 * @param value
 */
__.prototype.createCompound = function (code, subExpr) {
    return Expression.createCompound(code, subExpr);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a compound statement (non-expression).
 *
 * @param value
 */
__.prototype.createStatement = function (code, subExpr) {
    return Expression.createCompound(code, subExpr, true);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles this action into a new target function.
 */
__.prototype.compile = function (parent) {

    var body = this.statements.map(function (stmt) {
        return stmt.compile(parent || self);
    });

    return new TargetFn();
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return {
        "action": this.params,
        "statements": this.statements
    };
};

module.exports = __;