/**
 * Created by spurcell on 6/25/16.
 */

/**
 * Models JS statements as linked lists.
 * Wraps raw JS ASTs to add context on whether the statement is final (can't be followed, is a return).
 *
 * Derived classes manage higher-level JS statement constructs such as requests.
 */

/**
 * Constructor
 */
var __ = function (ast, final) {

    this.ast = ast;
    this.final = final || false;

    // resolve any async parts right here

    // search through the tree looking for blocking calls, push onto a list

    // go through the list and create wrapping statements
    // var wrapper = new Request(); // a request is a stmt...

    // as we create the wrapper statements they'll be recursively resolved
};

/**
 * Returns true if this statement list is capped (ends in a return).
 */
__.prototype.isFinal = function () {

    if (this.next) {
        return this.next.isFinal();
    }

    return this.final;
};

/**
 *
 */
__.prototype.attach = function (stmt) {

    if (this.final) {
        return this;
    }

    if (this.next) {

        // propagate down the list to find the tip
        return this.next.attach(stmt);
    }
    else {
        this.next = stmt;
        return this;
    }
};

/**
 * Returns the JS AST for this statement and all following statements.
 *
 * @returns {*}
 */
__.prototype.getAst = function () {

    if (this.next) {
        return ['stmtList', this.ast, this.next.getAst()];
    }

    // a statement always renders as a statement list
    return ['stmtList', this.ast];
};

module.exports = __;