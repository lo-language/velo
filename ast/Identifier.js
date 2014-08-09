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
__.prototype.compile = function (target) {

//    if (scope.isConstant(this.id)) {
//        return scope.resolve(this.id);
//    }

    // async selectors? will actually have to wait for the base name, then apply the selector
    // might even have to use temp vars!

    if (this.selector) {
        return this.id.compile(target) + '.$' + this.selector;
    }

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