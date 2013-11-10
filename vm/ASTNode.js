/**
 * Created by: spurcell
 * 9/29/13
 */

'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @type {Function}
 * @private
 */
var __ = module.exports = function (name, operands) {

    this.op = name;
    this.operands = operands;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param indent
 * @return {*}
 */
__.prototype.toString = function (indent) {

    return this.op + '(' + this.operands + ')';
};