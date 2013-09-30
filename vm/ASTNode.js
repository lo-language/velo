/**
 * Created by: spurcell
 * 9/29/13
 */

'use strict';

var Identifier = require('./Identifier');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @type {Function}
 * @private
 */
var __ = module.exports = function (name, operand1, operand2) {

    this.op = name;
    this.operand1 = operand1;

    if (operand2) {
        this.operand2 = operand2;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @return {*}
 */
__.prototype.evaluate = function (scope) {

    var operand1 = this.operand1,
        operand2 = this.operand2;

    /*
     writes a value to a tape
     operand1 is the tape name
     operand2 is the value
     */

    // assignments are a special case
    if (operand1.evaluate !== undefined && this.op !== '=') {
        operand1 = this.operand1.evaluate(scope);
    }

    if (operand2 && operand2.evaluate !== undefined) {
        operand2 = this.operand2.evaluate(scope);
    }

    switch (this.op) {

        case '+':
            return ev(operand1) + ev(operand2);
            break;

        case '-':
            return ev(operand1) - ev(operand2);
            break;

        case '*':
            return operand1 * operand2;
            break;

        case '/':
            return operand1 / operand2;
            break;

        case '=':
            return scope[operand1.name] = operand2;
            break;

        case 'send':
            break;

        case 'reply':
            scope.__reply(operand1);
            break;

        default:
            console.log("unhandled operator: " + this.op);
            break;
    }
};