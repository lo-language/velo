'use strict';

var Identifier = require('./Identifier');

var OpNode = function (name, operand1, operand2) {

    this.op = name;
    this.operand1 = operand1;

    if (operand2) {
        this.operand2 = operand2;
    }
};

module.exports = OpNode;

OpNode.prototype.evaluate = function (scope) {

    var operand1 = this.operand1,
        operand2 = this.operand2;

    // assignments are a special case
    /*
     writes a value to a tape
     operand1 is the tape name
     operand2 is the value
     */

    if (this.op == '=') {

        if (operand1 instanceof Identifier) {

            console.log("assigning " + operand2 + " to " + operand1.name);
            scope[operand1.name] = operand2;
        }
        else {
            console.log("assignment target is not a valid lvalue");
        }

        return;
    }

    if (operand1.evaluate !== undefined) {
        operand1 = this.operand1.evaluate(scope);
    }

    if (operand2 && operand2.evaluate !== undefined) {
        operand2 = this.operand2.evaluate(scope);
    }

    switch (this.op) {

        case '+':
            return operand1 + operand2;
            break;

        case '-':
            return operand1 - operand2;
            break;

        case '*':
            return operand1 * operand2;
            break;

        case '/':
            return operand1 / operand2;
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