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

    var body = '';

    if (this.args.length > 0) {

        body +=
            this.args.map(function (argName, index) {
                return 'var $' + argName + " = args[" + index + "];";
            }).join('\n\t') + "\n\t";
    }

    if (this.statements.length > 0) {

        body += this.statements.map(function (stmt) {
                return stmt.toJavaScript(context) + ';';
            }).join("\n\t");
    }

    return "function (args) {\n\t" + body + "\n}";
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