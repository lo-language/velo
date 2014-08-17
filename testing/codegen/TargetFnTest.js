/**
 * Created by: spurcell
 * 8/3/14
 */

"use strict";


var TargetScope = require('../../codegen/TargetFn');

module.exports["basics"] = {

    setUp: function (cb) {

        this.target = new TargetFn();
        cb();
    }
}