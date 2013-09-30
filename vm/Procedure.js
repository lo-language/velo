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

var ASTNode = require('./ASTNode');

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

Procedure.prototype.evaluate = function (scope) {
    console.log('here');
    this.run(scope);
};

Procedure.prototype.run = function (scope) {

    var self = this;

    if (scope == undefined) {

        // create a new scope for this run
        scope = {
            __reply: function (message) {
                console.log(message);
            }
        };
    }

    // load things into the scope?
    // make the top node be a procedure?

    this.statements.forEach(function (stmt) {

        if (stmt.evaluate !== undefined) {
            stmt.evaluate(scope);
        }
    });
};
