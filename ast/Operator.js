/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Identifier = require('./Identifier');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
var __ = function (op, left, right, extra) {

    this.op = op;
    this.left = left;
    this.right = right;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.compile = function () {

    var op;
    var left = this.left.compile();
    var right = this.right.compile();
    var code = '';

    // merge the deps

    var requires = {};
    var defines = {};

    if (left.requires) {

        Object.keys(left.requires).forEach(function (id) {
            requires[id] = left.requires[id]
        });
    }

    if (right.requires) {

        Object.keys(right.requires).forEach(function (id) {
            requires[id] = right.requires[id]
        });
    }

    if (this.op == 'assign' && this.left instanceof Identifier) {
        code = left.code + ' = ' + right.code;
        defines[left.code] = true;
    }
    else if (this.op = '+') {

        if (this.left instanceof Identifier) {
            requires[left.code] = true;
        }

        if (this.right instanceof Identifier) {
            requires[right.code] = true;
        }

        code = left.code + ' + ' + right.code;
    }

    return {
        code: code,
        defines: defines,
        requires: requires
    };

    // see if we're trying to assign to a constant
//    if (left.isConstant() && this.op == 'assign') {
//        // todo throw compile error
//    }

    // if left & right are both constant expressions, we can simplify it
//    if (left.isConstant() && right.isConstant()) {
//        return this.simplify(this.op, left.value, right.value, target);
//    }

    switch(this.op) {

        case "add":
            op = '+';
            break;

        case "sub":
            op = '-';
            break;

        case "mult":
            op = '*';
            break;

        case "div":
            op = '/';
            break;

        case "mod":
            op = '%';
            break;

        case "assign":
            op = '=';
            break;
    }

};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param left
 * @param right
 * @return {Constant}
 */
__.prototype.simplify = function (op, left, right, target) {

    switch(op) {

        case "add":
            return target.createConstant(left + right);
            break;

        case "sub":
            return target.createConstant(left - right);
            break;

        case "mult":
            return target.createConstant(left * right);
            break;

        case "div":
            return target.createConstant(left / right);
            break;

        case "mod":
            return target.createConstant(left % right);
            break;
    }
};

module.exports = __;