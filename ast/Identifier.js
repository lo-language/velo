/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (name, selector) {

    this.id = name;
    this.selector = selector;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * An action maps onto a JS function that takes a message.
 */
__.prototype.toJavaScript = function (context) {

    if (this.selector) {
        return this.id.toJavaScript() + '.$' + this.selector;
    }

    // guard the identifier from colliding with JS reserved words
    return "$" + this.id;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {

    if (typeof this.id == 'string') {
        return ['id', this.id];
    }

    return ['id', this.id.toJSON(), this.selector];
};

module.exports = __;