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

    // async selectors? will actually have to wait for the base name, then apply the selector
    // might even have to use temp

    var self = this;

    if (this.selector) {
        return target.createCompound(function (args) {
            return args[0] + '.$' + self.selector
        }, [this.id.compile(target)]);
    }

    return target.createRef(this.id);
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