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
__.prototype.compile = function () {

    var target = new TargetFn(this);

    target.compileBlock(this.statements);

    // now what does I do with it?
    return target;
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