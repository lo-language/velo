/**
 * Created by: spurcell
 * 2/17/14
 */

"use strict";

var Machine = require('./Machine');
var Gateway = require('./Gateway');

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @private
 */
var __ = function () {

    this.machines = [];
    this.nextId = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @return {Number}
 */
__.prototype.createMachine = function () {

    var id = this.nextId++;

    this.machines[id] = new Machine(new Gateway(this));

    return id;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param to
 * @param message
 */
__.prototype.sendMessage = function (to, message) {

    var recipient = this.machines[to];

    if (recipient == null) {
        throw new Error("couldn't find machine with address " + to);
    }
};

module.exports = __;