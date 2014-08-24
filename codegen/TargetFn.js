/**
 * Created by: spurcell
 * 12/25/13
 *
 * A target-language scope.
 *
 * have a method called compile block or something?
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Takes an action AST node and produces target code.
 *
 * @param action
 * @private
 */
var __ = function (params, body) {

    this.params = params;
    this.body = body;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.getCode = function () {

    var self = this;
    var params = this.action.params.map(function (name) {
        return '$' + name;
    });

    // open the function
    var js = 'function (' + params.join(', ') + ') {';

    // declare vars required in this scope

    var vars = Object.keys(this.vars).map(function (name) {
        return '$' + name; // i don't like this duplication
    });

    if (vars.length > 0) {
        js += '\n\tvar ' + vars.join(', ') + ';\n';
    }

    // compile statements

    var compiled = this.action.compile(self);

    js += '\n' + compiled.map(function (stmt) {
        return stmt.getCode();
    }).join('\n');

    js += '\n}';

    return js;
};


module.exports = __;