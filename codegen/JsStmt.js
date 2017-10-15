/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Success is finding something you really like to do and caring enough about it
 * to do it well.
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


/**
 *
 * @param prev    the previous control flow node, if any
 */
var __ = function (prev) {

    this.prev = prev;   // previous statement node
    this.next = null;   // next stmt node
    this.asyncFlow = false;

    this.statement = null;

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
};


/**
 */
__.prototype.renderTree = function () {

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
    this.prev.setNext(wrapper);
    wrapper.setNext(this);

    // this.asyncFlow = true;

    return JS.subscript(JS.ID(name), JS.num('0'));
};



/**
 *
 * @param tail
 */
__.prototype.joinBranches = function (tail) {

    // there's a correspondence between a context and a JS node that I'm not getting
    // should a context always be a stmtlist? or either a stmtlist or a request?
    // and should the context always have a ref to its stmts?
    // we need to be able to travel down through the req wrappers to add joins...

    if (this.branches.length > 0) {

        // see if any of the branches are broken
        var allIntact = this.branches.every(branch => {
            return branch.isIntact;
        });

        if (allIntact) {
            return tail;
        }

        // at least one of the branches is broken; we must wrap the tail in a continuation

        var contName = 'k' + '0';

        // attach the join call into all the branches
        this.branches.forEach(branch => {
            branch.js.attach(JS.stmtList(JS.exprStmt(JS.fnCall(JS.ID(contName), []))));
        });

        // we're done with the branches
        this.branches = [];

        return JS.stmtList(JS.fnDef([], tail, contName));
    }

    return tail;
};


module.exports = __;
