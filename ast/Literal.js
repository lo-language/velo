/**
 * Created by: spurcell
 * 7/5/14
 *
 * todo: list literals, record literals
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An action maps onto a JS function that takes a message.
 */
__.prototype.toJavaScript = function (context) {

    if (typeof this.value === 'string') {
        return '"' + this.value + '"';
    }

    return this.value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    return this.value;
};

module.exports = __;