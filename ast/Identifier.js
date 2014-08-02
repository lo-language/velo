/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param name
 * @param selector
 * @private
 */
var __ = function (name, selector) {

    this.id = name;
    this.selector = selector;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 */
__.prototype.toJavaScript = function (context) {

    // inform the context of our usage
    if (typeof this.id == 'string') {
        context.declare(this.id);
    }

    if (this.selector) {
        return this.id.toJavaScript(context) + '.$' + this.selector;
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