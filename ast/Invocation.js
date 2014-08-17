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
 * An invocation sends a message to the specified action.
 */
__.prototype.compile = function (target) {

    var keyVar = this.id.compile(target);
    var immediate = true;

    // render all args and see if we have to wait on anything
    var argList = this.args.map(function (arg) {

        var result = arg.compile(target);

        if (result.isImmediate() == false) {
            immediate = false;
        }

        return result;
    });

    // make sure the fn var is always the first arg
    argList.unshift(keyVar);

    var result = target.createCompound(function (args) {

            var fnName = args.shift();

            return fnName + '(' + args.join(', ') + ')'
        }, argList);

    // all invocations are non-immediate!
    result.immediate = false;

    return result;
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