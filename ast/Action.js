/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var TargetFn = require('../codegen/TargetFn');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (params, statements) {

    this.params = params || [];
    this.statements = statements || [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles this action into a new target function.
 */
__.prototype.compile = function (target) {

    // do we need compile AND getCode?

    return this.statements.map(function (stmt) {
        return stmt.compile(target);
    });
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