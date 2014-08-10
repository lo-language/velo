/**
 * Created by: spurcell
 * 12/25/13
 *
 * A target-language scope.
 *
 * have a method called compile block or something?
 */

"use strict";

var Expression = require('./Expression');

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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates an immediate value.
 *
 * @param value
 */
__.prototype.createLiteral = function (value) {
    return Expression.createLiteral(value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a compound expression.
 *
 * @param value
 */
__.prototype.createCompound = function (code, subExpr) {
    return Expression.createCompound(code, subExpr);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the target variable for the given source name.
 *
 * todo should some refs be immediate? e.g. params, record fields? until they're overwritten by a non-immediate expr?
 *
 * @param id  the name of the source variable
 */
__.prototype.createRef = function (id) {

    var name = '$' + id;

    // see if we're requesting a param
    if (this.action.params.indexOf(id) >= 0) {
        return Expression.createRef(name, true); // params are immediate
    }

    if (this.vars[id] !== undefined) {
        return this.vars[id];
    }

    // track vars required in this scope
    this.vars[id] = name;

    return Expression.createRef(name);
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
 */
__.prototype.createDeferred = function (values, code) {

    var varName = '_' + this.tempVars++;

    this.vars[varName] = varName;
//    this.statements.push(varName + ' = ' + def);

    var names = values.map(function (value) {

        return value.getRef();
    });

    return new Promise(varName, 'Q.all([' + names.join(', ') + ']).then(function (args) { return ' + code + ';}))');
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