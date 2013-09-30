/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var ASTNode = require('./ASTNode');
var Procedure = require('./Procedure');
var Identifier = require('./Identifier');
var parser = require('../parser/aero').parser;

parser.yy = {
    ASTNode: ASTNode,
    Identifier: Identifier,
    Procedure: Procedure
};

module.exports = parser;