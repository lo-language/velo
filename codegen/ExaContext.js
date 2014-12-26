/**
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

// context keeps track of sequential state of who's been defined as what
// should context vars be exa vars or JS vars??
// going with exa for now

var __ = function () {

    // map of defined names
    this.vars = {};

    // temp var counter for creating unique names
    this.temps = 0;

    this.defineValue('recur');
    this.defineValue('reply');
    this.defineValue('fail');
};

__.prototype.makeTempVar = function () {

    var tempVarName = 'tmp_' + this.temps;
    this.temps++;

    return tempVarName;
};

__.prototype.defineValue = function (name) {

    this.vars[name] = 'val';
};

__.prototype.definePromise = function (name) {

    this.vars[name] = 'promise';
};

__.prototype.isValue = function (name) {

    return (this.vars[name] === 'val');
};

__.prototype.isPromise = function (name) {

    return (this.vars[name] === 'promise');
};

module.exports = __;