/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var OpNode = require('./OpNode');
var Procedure = require('./Procedure');
var Identifier = require('./Identifier');
var parser = require('../parser/aero').parser;

parser.yy = {
    OpNode: OpNode,
    Identifier: Identifier,
    Procedure: Procedure
};

module.exports = parser;