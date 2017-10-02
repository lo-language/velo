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
const JsContext = require('../codegen/JsContext');

const Assignment = require('./Assignment');
const Identifier = require('./Identifier');
const Constant = require('./Constant');



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
 * Attaches a statement list to this one.
 *
 * @param stmtList  a StmtList
 */
__.prototype.attach = function (stmtList) {

    if (this.tail == null) {
        this.tail = stmtList;
    }
    else {
        this.tail.attach(stmtList);
    }
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
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'stmt_list',
        this.head ? this.head.getTree() : null,
        this.tail ? this.tail.getTree() : null
    ];
};


/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
// __.prototype.compileHeadFirst = function (context) {
//
//     // why do we compile tail-first?
//     // it's so we know what's coming, right?
//
//     var head = this.head ? this.head.compile(context) : null;
//     var tail = this.tail ? this.tail.compile(context) : null;
//
//     var result = JS.stmtList(head, context.getFollowing());
// };

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // this is a recursive iteration on a recursive data structure: stmtlist -> (stmt, stmtlist)
    // so compiling the tail is recursive iteration and compiling the head is the base case
    // hooray for Lisp!

    var tail = null;
    // var branch = context.getBranchContext();
    var connector = context.getConnector();

    // todo this is a big fat hack due to compiling tail-first so we have to have duplicat logic here
    // look for a defacto declaration
    if (this.head instanceof Assignment &&
        this.head.left instanceof Identifier) {

        var name = this.head.left.name;

        if (context.isConstant(name)) {
            context.attachError(this.head.left, "can't assign to a constant (" + name + ")");
        }
        else if (context.has(name) == false) {

            // declare if a new var
            // need to check if exists in case defined in outer scope

            context.declare(name);
        }
    }

    if (this.head instanceof Constant) {
        head = this.head.compile(context);
    }

    // if there's a tail, compile it first
    // todo this creates a bug because var declarations aren't seen yet
    if (this.tail) {
        tail = this.tail.compile(context);
    }
    else if (connector) {

        // a connector is a chunk of code that carries control flow from one stack to another
        // it can be a function call or a no-op to just let statements flow naturally

        // a connector is already a stmt list so it doesn't need to be wrapped in one
        tail = connector;
    }

    // tell the context about the following statements, in case the head statement wants to wrap them in a continuation
    // todo if we compile the head first, we'd have to push a context to wrap the tail?
    context.setFollowing(tail);

    var head = head || (this.head ? this.head.compile(context) : null);
    var result;

    // some Lo statements compile to multiple JS stmts;
    // we assume they'll grab the tail and attach it to themselves

    if (head && head.isStmtList) {
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

        return popEnv(JS.stmtList(context.envs.pop().wrap(stmtList)));
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





/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    // this is a recursive iteration on a recursive data structure: stmtlist -> (stmt, stmtlist)
    // so compiling the tail is recursive iteration and compiling the head is the base case
    // hooray for Lisp!

    // create a nested target context here for the head
    var stmtCtx = new JsContext(targetCtx);

    var head = this.head ? this.head.compile2(sourceCtx, stmtCtx) : null;
    var tail = this.tail ? this.tail.compile2(sourceCtx, targetCtx) : null;

    return stmtCtx.popRequests(JS.stmtList(head, tail));
};

module.exports = __;