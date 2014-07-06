/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (args, statements) {

    this.args = args;
    this.statements = statements || [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An action maps onto a JS function that takes a message.
 */
__.prototype.toJavaScript = function (context) {

    var args = '()';
    var body = '{}';

    if (this.args.length > 0) {

        args = '(' +
            this.args.map(function (argName) {
                return '$' + argName;
            }).join(', ') + ')';
    }

    if (this.statements.length > 0) {

        body = "{\n\t" +
            this.statements.map(function (stmt) {
                return stmt.toJavaScript(context) + ';';
            }).join("\n\t") + "\n}";
    }

    return "function " + args + ' ' + body;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return {
        "action": this.args,
        "statements": this.statements
    };
};

module.exports = __;