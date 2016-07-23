/**
 * Created by spurcell on 6/25/16.
 */

/**
 * Handles conditionals, which may need to define continuations.
 *
 * @param cons
 * @private
 */

var __ = function (cons) {

    this.construct = cons;

    // resolve any async parts right now

    // scan the tree, identifying blockers, do the switcheroo
};

/**
 * Attaches the given statement list to the "tip" of this statement, returning a statement list.
 *
 * @param cons
 * @returns     a construct
 */
__.attach = function (cons) {

    // ok, let's define that continuation

    return ['stmtList', this.construct, stmtList];
};


module.exports = __;