/**
 * Created by: spurcell
 * 8/3/14
 *
 * identifiers in source lang map to promises in dest lang
 * non-const expressions in source lang map to promises in dest lang
 *
 * non-const expressions become assignment statements of the form $x = Q.when();
 * or Q.all([]);
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * For source vars, should this name be based on the source var name?
 *
 * @param name
 * @param def   the definition of the promise (js code)
 * @private
 */
var __ = function (name) {
    this.name = name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Each promise has a name by which it can be referred to.
 */
__.prototype.getName = function () {
    return this.name;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.isConstant = function () {
    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.renderJs = function (scope, target) {
    return this.name;
};


module.exports = __;