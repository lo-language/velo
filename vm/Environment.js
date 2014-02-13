/**
 * Created by: spurcell
 * 2/9/14
 *
 * the environment maintains a list of inboxes
 */

"use strict";

var Machine = require('./Machine');
var Message = require('./Message');

var __ = function () {

    console.log("creating environment");

    this.nextId = 0;
    this.machines = [];
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Creates a new machine in the environment.
 *
 * @param program
 */
__.prototype.createMachine = function (program) {

    var om = new Machine(program, this);

    this.machines[this.nextId] = om;
    this.nextId++;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to
 * @param body
 * @param intros
 * @return {promise}
 */
__.prototype.sendRequest = function (to, body, intros) {

    var req = Message.createRequest(body, intros);

    var target = this.machines[to];

    if (target === undefined) {
        throw new Error("unknown machine?!");
    }

    // todo make introductions


    target.receive(req);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Runs through all machines.
 */
__.prototype.run = function () {

    this.machines.forEach(function (machine) {
        machine.run();
    });
};

module.exports = __;