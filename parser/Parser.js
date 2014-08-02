/**
 * Created by: spurcell
 * 9/29/13
 *
 * Wraps the generated parser and injects our language construct (AST node) models.
 */

"use strict";

var parser = require('./opake').parser;

parser.yy = require('../ast');

module.exports = parser;