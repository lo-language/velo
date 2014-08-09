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
__.prototype.compile = function (target) {

    // todo assert operand is not a constant

    var keyVar = this.id.compile(target);
    var waitList = [keyVar];

    // render all args
    this.args.forEach(function (arg) {

        waitList.push(arg.compile(target));
    });

    // will also have to *wait on* all the promise args to be resolved before we can send our message

    return target.createTemp('Q.all([' + waitList.join(', ') +
        ']).then(function (args) { var fn = args.shift(); return fn(args); });');
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