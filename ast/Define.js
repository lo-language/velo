/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (name, value) {

    this.name = name;
    this.value = value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 * @return {*}
 */
__.prototype.render = function (scope) {

    scope.define(this.name, this.value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return ['define', this.name, this.value];
};

module.exports = __;