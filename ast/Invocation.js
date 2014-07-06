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
__.prototype.toJavaScript = function (context) {

    return this.id.toJavaScript() + '(' + this.args.map(function (arg) {
        return arg.toJavaScript(context);
    }).join(', ') + ')';
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