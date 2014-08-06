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

    var header = '';
    var body = '';

    // declare args

    this.args.forEach(function (argName, index) {

        context.declare(argName, "arguments[" + index + "]");
    });

    if (this.statements.length > 0) {

        body += "\n\t" + this.statements.map(function (stmt) {
                return stmt.toJavaScript(context) + ';';
            }).join("\n\t") + '\n';
    }

    // declare local vars
    if (Object.keys(context.vars).length > 0) {

        header += '\n\tvar ' +
        Object.keys(context.vars).map(function (varName) {
            return '$' + varName + (context.vars[varName] ? ' = ' + context.vars[varName] : '');
        }).join(', ') + ";";
    }



    return "function () {" + header + body + "}";
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