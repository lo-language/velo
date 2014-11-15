/**
 * Created by: spurcell
 * 7/5/14
 *
 * todo: list literals, map literals
 * todo: multiline string literals, with and without line breaks
 * todo: string interpolation
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (value) {

    this.value = value;
    this.code = (typeof value === 'string' ? '"' + value + '"' : value);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 */
__.prototype.compile = function () {

    return {code: this.code};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {
    return this.value;
};

module.exports = __;