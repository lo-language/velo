/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";

var __ = function (value) {
    this.value = value;
};

__.prototype.getValue = function () {
    return this.value;
};

__.prototype.isConstant = function () {
    return true;
};

__.prototype.renderJs = function (scope, target) {

    if (typeof this.value == 'string') {
        return '"' + this.value + '"';
    }

    return this.value;
};

module.exports = __;