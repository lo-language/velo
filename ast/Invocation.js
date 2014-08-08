/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (id, args) {

    this.id = id;
    this.args = args || [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An invocation sends a message to the target action.
 */
__.prototype.renderJs = function (scope, target) {

    // todo assert operand is not a constant

    var keyVar = this.id.renderJs(scope, target);
    var waitList = [keyVar.getName()];

    // render all args
    this.args.forEach(function (arg) {

        var p = arg.renderJs(scope, target);

        waitList.push(p.renderJs());
    });

    // will also have to *wait on* all the promise args to be resolved before we can send our message

    return target.createPromise('Q.all([' + waitList.join(', ') +
        ']).then(function (key) { vm.sendMessage(key); });');
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return {
        invoke: this.id,
        args: this.args
    };
};

module.exports = __;