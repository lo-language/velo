/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Constant = require('../codegen/Constant');

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
 * Compiles this action into the given target function.
 *
 * @param target
 */
__.prototype.compile = function (target) {

    this.statements.forEach(function (stmt) {
        stmt.compile(target);
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