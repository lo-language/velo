/**
 * Created by: spurcell
 * 9/29/13
 */

"use strict";

var fs = require('fs');
var path = require('path');
var parser = require('../../parser/Parser');

var source = fs.readFileSync(__dirname + '/inputs/literals.exa', 'utf8');
var result = parser.parse(source);
console.log(JSON.stringify(result, null, 4));
