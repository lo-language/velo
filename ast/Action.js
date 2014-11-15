/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var Expression = require('../codegen/Expression');
var TargetFn = require('../codegen/TargetFn');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (statements) {

    this.statements = statements || [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Compiles this action into a new target function.
 */
__.prototype.compile = function () {

    var lines = [];
    var params = {};
    var vars = {};
    var requires = {};

    // go through each statement

    this.statements.forEach(function (stmt) {

        var result = stmt.compile();

        // see if this statement requires anything not yet defined
        if (result.requires) {

            Object.keys(result.requires).forEach(function (id) {

                if (params[id] || vars[id]) {

                }
                else {
                    requires[id] = true;
                }
            });
        }

        if (result.defines) {

            Object.keys(result.defines).forEach(function (id) {

                if (result.defines[id] == 'param') {
                    params[id] = true;
                }
                else {
                    vars[id] = true;
                }
            });
        }

        // not every exa statement produces a JS statement

        if (result.code) {
            lines.push(result.code);
        }
    });

    return {
        code: this.getCode(params, vars, lines),
        requires: requires
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.getCode = function (params, vars, lines) {

    // open the function
    var js = 'function (' + Object.keys(params).join(', ') + ') {';

    js += '\n\tvar ' + Object.keys(vars).join(', ') + ';\n';

    // render compile statements

    js += lines.join('\n') + '\n}';

    return js;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return {
        "action": this.params,
        "statements": this.statements
    };
};

module.exports = __;