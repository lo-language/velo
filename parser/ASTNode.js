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
var __ = module.exports = function (type, operands) {

    this.type = type;
    this.operands = operands;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param indent
 * @return {*}
 */
__.prototype.toString = function (indent) {

    return this.type + '(' + this.operands + ')';
};