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
 *
 * @private
 */
var __ = function () {

    this.vars = {};
    this.promises = [];
    this.statements = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns the target variable for the given source name.
 *
 * @param name  the name of the source variable
 */
__.prototype.getVar = function (name) {

    if (this.vars[name] !== undefined) {
        return this.vars[name];
    }

    var promise = new Promise('$' + name);

    // track vars required in this scope
    this.vars[name] = promise;

    // track promises - all source lang vars plus all expressions
    this.promises.push(promise);

    return promise;
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
__.prototype.createPromise = function (def) {

    var promise = new Promise('$' + this.promises.length);

    this.promises.push(promise);
    this.statements.push(promise.getName() + ' = ' + def);

    return promise;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.renderJs = function () {

    var js = 'function () {';

    // declare vars required in this scope

    if (this.promises.length > 0) {

        js += '\n\tvar ' + this.promises.map(function (promise, index) {

            return promise.getName();

        }).join(', ') + ';\n';
    }

    // render statements

    if (this.statements.length > 0) {
        js += '\n\t' + this.statements.join('\n\t') + '\n';
    }

    js += '}';

    return js;
};


module.exports = __;