#!/usr/bin/env node

'use strict';

var fs = require('fs');
var Runtime = require('./vm/Runtime');

// node [path to this file] [path to input file]
var source = fs.readFileSync(process.argv[2], 'utf8');

var vm = new Runtime(source);

console.log(vm.parse());

vm.run();
