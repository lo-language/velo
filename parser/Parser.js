/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var ASTNode = require('./ASTNode');
var parser = require('./opake').parser;

parser.yy = {
    ASTNode: ASTNode
};

module.exports = parser;