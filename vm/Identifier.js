var Identifier = module.exports = function (name) {
    this.name = name;
};

Identifier.prototype.evaluate = function (scope) {
    return scope[this.name];
};