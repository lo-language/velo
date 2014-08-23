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
 *
 * @param scope
 */
__.prototype.compile = function (scope) {

    var self = this;

    if (this.selector) {
        return scope.createCompound(function (args) {
            return args[0] + '.$' + self.selector
        }, [this.id.compile(target)]);
    }

    return scope.getRef(this.id);
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