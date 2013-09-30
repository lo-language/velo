/**
 * Created by: spurcell
 * 9/29/13
 */

var Identifier = module.exports = function (name) {
    this.name = name;
};

Identifier.prototype.evaluate = function (scope) {
    return scope[this.name];
};