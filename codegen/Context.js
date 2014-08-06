/**
 * Created by: spurcell
 * 12/25/13
 *
 * A compilation context.
 */

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param parent
 * @constructor
 */
var __ = function (parent) {

    this.vars = {};

//
//    this.parent = parent || null;
//    this.newline = parent ? parent.newline + '\t' : '\n';
//
//    this.seqCounter = 0;
//    this.seqStack = []; // maybe sequences should parse right-recursive?
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param name
 * @param value
 */
__.prototype.declare = function (name, value) {

    if (this.vars[name] === undefined) {
        this.vars[name] = value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {*}
 */
//__.prototype.push = function () {
//    return new __(this);
//};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {String}
 */
//__.prototype.getSeqName = function () {
//
//    this.seqCounter++;
//    return 'seq' + this.seqCounter;
//};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param node
 * @return {*}
 */
__.prototype.codegen = function (node) {

};

module.exports = __;