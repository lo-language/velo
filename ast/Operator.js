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
 * An action maps onto a JS function that takes a message.
 */
__.prototype.toJavaScript = function (context) {

    var op;

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
            op = '+';
            break;
    }

    return this.left.toJavaScript() + op + this.right.toJavaScript();
};

module.exports = __;