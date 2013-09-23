/**
 * A procedure is simply a list of statements.
 *
 * tapes maintain state and comprise 1 or more cells
 * each tape has a name unique in its scope
 * constants can also have names
 * every tape has a name, but not every name has a tape
 * a name without a tape is undefined
 *
 * tapes are passed around - not addresses on a big tape
 */

'use strict';

var OpNode = require('./OpNode');

/**
 * creates a new procedure
 *
 * @param stmts   a list of statements
 * @constructor
 */
var Procedure = function (stmts) {
    this.statements = stmts;
};

module.exports = Procedure;

Procedure.prototype.run = function () {

    var self = this;

    // create a new scope for this run
    var scope = {
        __reply: function (message) {
            console.log(message);
        }
    };

    // load things into the scope?

    this.statements.forEach(function (stmt) {

        if (stmt instanceof OpNode) {
            stmt.evaluate(scope);
        }
    });
};
