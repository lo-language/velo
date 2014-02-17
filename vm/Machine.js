/**
 * Created by: spurcell
 * 2/9/14
 *
 * the inbox collects messages and provides contexts for them
 */

"use strict";

var Task = require('./Task');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new Opake machine.
 *
 * @param gateway
 * @param program
 * @private
 */
var __ = function (gateway, program) {

    if (program == null) {
        throw new Error("can't create machine without program");
    }

    this.gateway = gateway;
    this.program = program;
    this.state = new Buffer(100);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Run the machine in the given context.
 */
__.prototype.run = function () {

    // pick up the next task

    var task = 8; //this.gateway.pullTask();

    if (task === undefined) {
        return;
    }

    var self = this;

    this.program.forEach(function (instruction) {

        self.execute(instruction);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Carry out the specified instruction.
 *
 * @param instruction
 */
__.prototype.execute = function (instruction) {


    var cmd = instruction.shift();

    switch (cmd) {

        case 'put':

            var page = instruction.shift();
            var offset = instruction.shift();
            var value = instruction.shift();
            var buffer;

            if (page == 0) {
                buffer = this.state;
            }

            buffer[offset] = value;

            break;
        case 'send':
            break;
        case 'repl':
            break;
        case 'snda':
            break;
        default:
            throw new Error("illegal instruction");
            break;
    }
};

module.exports = __;