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
 * @param env
 * @param program
 * @private
 */
var __ = function (inbox, outbox, program) {

    console.log("creating OM");

    this.inbox = inbox;
    this.outbox = outbox;

    this.program = program;
    this.messages = [];
    this.tasks = [];

    this.requestId = 0;
    this.requests = []; // pending requests?
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Run the machine in the given context.
 */
__.prototype.run = function (task) {

    // todo test ordering
    var message = this.pullMessage();

    if (message.isRequest) {
        var task = new Task(message);
        this.tasks.push(task);
    }
    else {
        // find the referenced task

    }

};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Carry out the specified instruction.
 *
 * @param instruction
 */
__.prototype.execute = function (instruction) {

    switch (instruction) {

        // have explicit inbox and outbox objects?
        case 'SEND':
            this.outbox.push();
            break;
        case 'REPL':
            break;
        case 'SNDA':
            this.outbox.sendMessage();
            break;
        default:
            throw new Error("illegal instruction");
            break;
    }
};

module.exports = __;