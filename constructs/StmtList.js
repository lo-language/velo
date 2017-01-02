/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Men become wise just as they become rich, more by what they save than by
 * what they receive. -- Wilbur Wright
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const BranchContext = require('../codegen/BranchContext');


/**
 * A linked list of statements. Statements are only allowed at the head;
 * the tail is either a nested list or null.
 *
 * @param head  a stmt
 * @param tail  a stmtList || null
 */
var __ = function (head, tail) {

    if (tail != null && tail instanceof __ == false) {
        throw new Error("malformed statement list: tail must be a list or null");
    }

    this.head = head;
    this.tail = tail;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'stmt_list',
        head: this.head ? this.head.getAst() : null,
        tail: this.tail ? this.tail.getAst() : null
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // this is a recursive iteration on a recursive data structure: stmtlist isa (stmt, stmtlist)
    // so we compiling the tail is recursive iteration and compiling the head is the base case

    // should we allow the head to compile to a stmtlist?

    // hooray for Lisp!

    var tail = null;
    var branch = context.getBranchContext();

    // if there's a tail, compile it first
    if (this.tail) {
        tail = this.tail.compile(context);
    }
    else if (branch) {

        // todo there's a bug here: compiling a procedure in a branch is indistinguishable
        // from compiling a handler, but only the latter case should get a connector

        // a connector acts like a stmt list so it doesn't need to be wrapped in one
        tail = branch.getConnector();
    }

    // tell the context about the following statements, in case the head statement wants to wrap them in a continuation
    context.setFollowing(tail);

    var head = this.head.compile(context);

    var result = null;

    // some Lo statements compile to >1 JS statement, so in the general case we have to allow for a stmtlist
    // if head compiled to a stmt list, just use that and ignore the tail

    // fixme
    if (typeof head.append == 'function') {
        head.append(tail);
        result = head;
    }
    else {
        result = JS.stmtList(head, context.getFollowing());
    }

    // pop any wrapping environments off

    var popEnv = function (stmtList) {

        if (context.envs.length == 0) {
            return stmtList;
        }

        // tell the context there's a discontinuity here
        if (branch) {
            branch.flagDiscontinuity();
        }

        return popEnv(context.envs.pop().wrap(stmtList));
    };

    return popEnv(result);
};


/**
 * Appends the given stmtList to this one.
 *
 * @param stmtList
 */
__.prototype.append = function (stmtList) {

    if (this.tail) {
        return this.tail.append(stmtList);
    }

    this.tail = stmtList;
};

module.exports = __;