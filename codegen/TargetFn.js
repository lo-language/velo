/**
 * Created by: spurcell
 * 12/25/13
 *
 * A target-language scope.
 */

"use strict";

var Constant = require('./Constant');
var Promise = require('./Promise');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Takes an action AST node and produces target code.
 *
 * @param action
 * @private
 */
var __ = function (action) {

    this.action = action;
    this.vars = {};
    this.tempVars = 0;
    this.statements = [];

    action.compile(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param stmt
 */
__.prototype.assign = function (id, expr) {

    this.statements.push(id.compile(this) + ' = ' + expr.compile(this));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the target variable for the given source name.
 *
 * @param id  the name of the source variable
 */
__.prototype.getVar = function (id) {

    // see if we're requesting a param
    if (this.action.params.indexOf(id) >= 0) {
        return '$' + id;
    }

    if (this.vars[id] !== undefined) {
        return this.vars[id];
    }

    // register a new var
    var name = '$' + id;

    // track vars required in this scope
    this.vars[id] = name;

    return name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param value
 * @return {Constant}
 */
__.prototype.createConstant = function (value) {

    return new Constant(value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param def {String}  the code that defines the promise
 * @return {Promise}
 */
__.prototype.createTemp = function (def) {

    var varName = '_' + this.tempVars++;

    this.vars[varName] = varName;
    this.statements.push(varName + ' = ' + def);

    return varName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.getCode = function () {

    var self = this;
    var params = this.action.params.map(function (name) {
        return self.getVar(name);
    });

    // open the function
    var js = 'function (' + params.join(', ') + ') {';

    // declare vars required in this scope

    var vars = Object.keys(this.vars).map(function (name) {
        return self.getVar(name);
    });

    if (vars.length > 0) {
        js += '\n\tvar ' + vars.join(', ') + ';\n';
    }

    // render statements

    if (this.statements.length > 0) {
        js += '\n\t' + this.statements.join('\n\t') + '\n';
    }

    js += '}';

    return js;
};


module.exports = __;