#!/usr/bin/env node
/**
 */

'use strict';

var fs = require('fs');
var Machine = require('./vm/Machine');
var Environment = require('./vm/Environment');

var env = new Environment();
var machineId = env.createMachine([]);

console.log("starting the Opake virtual machine ");

env.sendMessage(machineId, 3);
env.run();