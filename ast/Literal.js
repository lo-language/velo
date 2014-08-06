/**
 * Created by: spurcell
 * 7/5/14
 *
 * todo: list literals, record literals
 * todo: multiline string literals, with and without line breaks
 * todo: string interpolation
 */

"use strict";

var Constant = require('../codegen/Constant');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (value) {

    this.value = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.renderJs = function (scope) {

    return new Constant(this.value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return this.value;
};

module.exports = __;