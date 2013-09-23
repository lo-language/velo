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

OpNode.prototype.perform = function (scope) {

    var operand1 = this.operand1,
        operand2 = this.operand2;

    if (operand1 instanceof OpNode) {
        operand1 = this.operand1.perform(scope);
    }

    if (operand2 instanceof OpNode) {
        operand2 = this.operand2.perform(scope);
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

        /*
         writes a value to a tape
         operand1 is the tape name
         operand2 is the value
         */
        case '=':
            if (operand1 instanceof Identifier) {

                console.log("assigning " + operand2 + " to " + operand1.name);
                scope[operand1.name] = operand2;
            }
            else {
                console.log("assignment target is not a valid lvalue");
            }
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