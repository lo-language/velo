/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
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

    if (this.op == 'assign') {
        target.assign(this.left, this.right);
        return;
    }

    var op;
    var left = this.left.compile(target);
    var right = this.right.compile(target);

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

    return 'Q.all([' + left + ', ' + right + ']).then('
        + 'function (args) {return args[0] ' + op + ' args[1];})';

//    if (left.isConstant()) {
//
//        return target.intermediate('Q.when(' + right.getName() +
//            ', function (val) {return ' + left.getValue() + ' ' + op + ' val;});');
//    }
//
//    if (right.isConstant()) {
//
//        return target.createPromise('Q.when(' + left.getName() +
//            ', function (val) {return ' + right.getValue() + ' ' + op + ' val;});');
//    }
//
//    // neither are constants
//
//    return target.createPromise('Q.all([' + left.getName() + ', ' + right.getName() + ']).then('
//        + 'function (left, right) {return left ' + op + ' right;});');
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