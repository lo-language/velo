/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param name
 * @param selector
 * @private
 */
var __ = function (op, left, right) {

    this.op = op;
    this.left = left;
    this.right = right;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.compile = function (target) {

    var left = this.left.compile(target);
    var right = this.right.compile(target);

    var op;

    switch (this.op) {

        case 'gt':
            op = '>';
            break;

        case 'lt':
            op = '<';
            break;

        case 'eq':
            op = '===';
            break;


    }

    return target.createCompound(function (args) {
        return args[0] + ' ' + op + ' ' + args[1];
    }, [left, right]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return [this.op, this.left, this.right];
};

module.exports = __;