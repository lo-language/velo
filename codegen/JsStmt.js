/**
 * Created by spurcell on 6/25/16.
 */

/**
 * Models JS statements as linked lists.
 * Wraps raw JS ASTs to add context on whether the statement is final (can't be followed, is a return).
 * 
 * Other JS AST nodes are just arrays, but statements are objects to enable:
 * - attaching other statements, which may be no-ops (attaching to return) and sometimes triggers different behavior
 * - subclasses to embody these differing behaviors
 *
 * Derived classes manage higher-level JS statement constructs such as requests?
 * 
 * I'm not sure if we have to resolve blockers to stmts before we attach stmts or if that can wait
 *
 * so we should subclass this for statements with diff behavior e.g. stuffing following statements inside.
 *
 * should we subclass this for return statements?
 */

const JS = require('./JsPrimitives');

/**
 * Constructor
 *
 * Resolves any blockers found by wrapping the JS statement in an async call w/callback
 */
var __ = function (ast, final) {

    this.ast = ast;
    this.final = final || false;
    this.async = false;

    // special case - if we're just a call, just return the wrapper
    // keeps us from having handlers with just a var name as a statement

    // if (typeof ast === 'object' && ast.getWrapper) {
    //     this.ast = ast.getWrapper();
    //     return;
    // }
};

/**
 * Returns true if this statement list is capped (ends in a return).
 *
 * isCapped? isFixed? isFrozen? noGrow?
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

    if (stmt instanceof __ == false) {
        throw new Error("trying to attach non-stmt: " + stmt);
    }

    if (this.final) {
        return this;
    }

    if (this.next) {

        // propagate down the list to find the tip
        this.next.attach(stmt);
    }
    else {
        this.next = stmt;
    }

    return this;
};

/**
 * Returns the JS AST for this statement and all following statements. Flattens embedded statements.
 *
 * @returns {*}
 */
__.prototype.getAst = function () {

    if (this.next) {
        return JS.stmtList(this.ast, this.next.getAst());
    }

    // a statement always renders as a statement list
    return JS.stmtList(this.ast);
};

__.prototype.getTree = function () {

    return this.getAst().getTree();
};


/**
 * Flattens any statements in an AST down to AST.
 *
 * @param item
 * @returns {*}
 */
// __.flatten = function (item) {
//
//     if (Array.isArray(item)) {
//         return item.map(bit => __.flatten(bit));
//     }
//
//     if (typeof item === 'object' && item instanceof __) {
//         return item.getAst();
//     }
//
//     return item;
// };

// off-the-shelf statements

__.varDecl = function (name, val) {

    return new __(JS.varDecl(name, val));
};

__.constDecl = function (name, val) {

    return new __(JS.constDecl(name, val));
};

__.return = function (expr) {

    return new __(JS.return(expr), true);
};

module.exports = __;