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
 * Returns true if this statement list is final (ends in a return).
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
 * Attaches a statement to this one.
 *
 * @param stmt
 * @returns this    fluent interface
 */
__.prototype.attach = function (stmt) {

    if (typeof stmt.attach != 'function') {
        throw new Error("trying to attach non-stmt: " + stmt);
    }

    // attaching to a final statement is a no-op
    if (this.final) {
        return this;
    }

    if (stmt == this) {
        throw new Error("oops! tried to attach a statement to itself");
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

__.prototype._getAst = function () {

    if (this.ast == undefined) {

        // we're an empty statement; delegate to the following stmt if there is one
        return this.next ? this.next._getAst() : null;
    }

    return JS.stmtList(this.ast, this.next ? this.next._getAst() : null);
};

__.prototype.renderTree = function () {

    return this._getAst().renderTree();
};

__.prototype.renderJs = function () {

    var ast = this._getAst();

    return ast ? ast.renderJs() : '';
};

// off-the-shelf statements

__.strictMode   = function () { return new __(JS.USE_STRICT); };

__.varDecl      = function (name, val) { return new __(JS.varDecl(name, val)); };

__.constDecl    = function (name, val) { return new __(JS.constDecl(name, val)); };

__.return       = function (expr) { return new __(JS.return(expr), true, true); };

__.cond         = function (predicate, consequent, alternate) { return new __(JS.cond(predicate, consequent, alternate)); };

__.while        = function (condition, body) { return new __(JS.while(condition, body)); };

module.exports = __;