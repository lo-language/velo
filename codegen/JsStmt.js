/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Simplify, then add lightness. -- Colin Chapman
 =============================================================================*/

/**
 * A node in the JS control flow.
 * Models control flow in the target language as a digraph.
 * Basic flow is supported as a doubly-linked list.
 * Branching statements are captured as child nodes.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');
const JsWrapperStmt = require('./JsWrapperStmt');
const JsContStmt = require('./JsContStmt');


/**
 *
 */
var __ = function (js) {

    this.prev = null;   // previous statement node
    this.next = null;   // next stmt node
    this.intact = true;

    this.statement = js || null;

    this.reqNum = 0;
    this.branches = [];     // any branch nodes
};


/**
 * Sets the statement for this node.
 *
 * @param stmt
 */
__.prototype.setStatement = function (stmt) {

    this.statement = stmt;
};


/**
 * Sets the next statement node to the given node.
 *
 * @param next  ControlFlowNode to follow this one
 */
__.prototype.setNext = function (next) {

    this.next = next;
    next.prev = this;

    return next;
};


/**
 * Returns the root of this stmt list (may be this statement).
 */
__.prototype.getRoot = function () {

    return this.prev ? this.prev.getRoot() : this;
};


/**
 * Returns true if this statement list is intact (not interrupted by an async call).
 */
__.prototype.isIntact = function () {

    if (this.intact) {
        return this.next ? this.next.isIntact() : true;
    }

    return false;
};


/**
 * Adds a terminal statement.
 *
 * @param stmt
 */
__.prototype.append = function (stmt) {

    // todo enforce we can't add to a terminal
    // if (this.isTerminal) {}

    if (this.next) {
        return this.next.append(stmt);
    }

    // if we have any non-intact brances we need to create a continuation to wrap the next stmt
    // and call it from each branch to unite the control flow
    if (!this.branches.every(branch => {return branch.isIntact()})) {

        // create the continuation
        var name = "k0";
        var cont = new JsContStmt(name);

        // wire it up
        cont.setNext(stmt);
        this.setNext(cont);

        // we call it from the mainline by just calling the cont def as an immediate value

        // call it from each branch
        // we can't share one call stmt across all branches because that messes up the wiring

        this.branches.forEach(branch => {
            branch.append(new __(JS.exprStmt(JS.fnCall(JS.ID(name), []))))});
        return;
    }

    this.setNext(stmt);
};


/**
 */
__.prototype.renderTree = function () {

    if (this.statement == null) {
        return this.next ? this.next.renderTree() : ['stmtList'];
    }

    try {
        var headTree = this.statement.renderTree();
    }
    catch (e) {
        headTree = ['ERROR RENDERING HEAD: ' + e.message, e.stack];
    }

    try {
        var tailTree = this.next ? this.next.renderTree() : null;
    }
    catch (e) {
        tailTree = ['ERROR RENDERING TAIL', e.stack];
    }

    return tailTree ? ['stmtList', headTree, tailTree] : ['stmtList', headTree];
};


/**
 *
 */
__.prototype.renderJs = function () {

    if (this.statement == null) {
        return this.next ? this.next.renderJs() : '';
    }

    try {
        var headJs = this.statement.renderJs();
    }
    catch (e) {
        headJs = 'ERROR RENDERING HEAD: ' + e.message;
    }

    try {
        var tailJs = this.next ? this.next.renderJs() : null;
    }
    catch (e) {
        tailJs = 'ERROR RENDERING TAIL';
    }

    return headJs + '\n' + (tailJs || '');
};

/**
 * Inserts a blocking request into the control flow graph between this node and its parent.
 *
 * @param address   the JS expr for the address
 * @param args      request args
 */
__.prototype.pushRequest = function (address, args) {

    // todo get the count by counting links to the root?
    var name = 'res' + this.reqNum++;

    var wrapper = new JsWrapperStmt(address, args, name);

    // insert the wrapper in the control flow between this node and its parent
    // this allows us to traverse the graph to add connectors inside the wrapper
    if (this.prev) this.prev.setNext(wrapper);
    wrapper.setNext(this);

    this.intact = false;

    return JS.subscript(JS.ID(name), JS.num('0'));
};


/**
 */
__.prototype.addBranch = function (stmt) {

    this.branches.push(stmt);
};



module.exports = __;
