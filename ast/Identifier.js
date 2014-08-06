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
__.prototype.renderJs = function (scope, target) {

    if (scope.isConstant(this.id)) {
        return scope.resolve(this.id);
    }

    // inform the context of our usage
    // we could also give it a name and have it give us an ID, rather than passing through the name

//    if (typeof this.id == 'string') {
//        context.declare(this.id);
//    }
//
//    if (this.selector) {
//        return this.id.toJavaScript(context) + '.$' + this.selector;
//    }

    return target.getVar(this.id);
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