/**
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

var __ = function (items) {

    this.items = items;
};

__.prototype.getStatus = function () {

    // 0 = undef, 1 = promise, 2 = ready

    var status = 2;

    this.items.forEach(function (item) {

        var itemStatus = item.getStatus();

        if (itemStatus < status) {
            status = itemStatus;
        }
    });

    return status;
};

/**
 *
 * @param jsContext
 * @return {String}
 */
__.prototype.renderExpr = function (jsContext) {

    return '[' + this.items.map(function (item) {
        return item.renderExpr(jsContext);
    }).join(',') + ']';
};

module.exports = __;

