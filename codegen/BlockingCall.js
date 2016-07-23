/**
 * Created by spurcell on 6/25/16.
 */

/**
 * class for calls that block
 */

const JsStmt = require('./JsStmt');

var __ = function (cons) {

    this.construct = cons;

    // resolve any async business
};

/**
 * Attaches the given statement list to the "tip" of this statement, returning a statement list.
 *
 * @param cons
 * @returns construct
 */
__.attach = function (stmtList) {
    
    // attach the 

    return new JsStmtList(this.construct, stmtList);
};


module.exports = __;