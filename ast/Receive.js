/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
var __ = function (params) {
    this.params = params;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param scope
 */
__.prototype.compile = function () {

    var defines = {};

    this.params.forEach(function (param) {
        defines['$' + param] = 'param';
    });

    return {"defines": defines};
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 */
__.prototype.toJSON = function () {
    return ['receive', this.params];
};

module.exports = __;