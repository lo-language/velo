/**
 * Created by: spurcell
 * 7/5/14
 */

"use strict";

var __ = function (args, statements) {

    this.args = args;
    this.statements = statements;
};

__.prototype.toJSON = function () {

    return {
        "action": this.args,
        "statements": this.statements
    };
};

module.exports = __;