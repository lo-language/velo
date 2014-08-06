/**
 * Created by: spurcell
 * 12/25/13
 *
 * A source-language scope.
 */

"use strict";

var Constant = require('./Constant');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent
 * @constructor
 */
var __ = function (parent) {

    this.constants = {};
    this.statements = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Defines a constant in this scope.
 *
 * @param name
 * @param value
 */
__.prototype.define = function (name, value) {

    if (this.constants[name] !== undefined) {
        throw new Error("constant " + name + " is already defined");
    }

    this.constants[name] = new Constant(value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Returns true if the given name refers to a constant in this scope.
 *
 * @param name
 */
__.prototype.isConstant = function (name) {
    return this.constants[name] === undefined ? false : true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Resolves a name in this scope.
 *
 * @param name
 * @param value
 */
__.prototype.resolve = function (name) {

    // check constants

    if (this.constants[name] !== undefined) {
        return this.constants[name];
    }
};


module.exports = __;