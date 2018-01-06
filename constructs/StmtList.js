/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Men become wise just as they become rich, more by what they save than by
 * what they receive. -- Wilbur Wright
 =============================================================================*/

"use strict";

const Identifier = require('./Identifier');
const Constant = require('./Constant');
const LoConstruct = require('./LoConstruct');
const CFNode = require('../compiler/CFNode');
const StmtCtx = require('../compiler/StmtContext');

class StmtList extends LoConstruct {

    /**
     * A linked list of statements. Statements are only allowed at the head;
     * the tail is either a nested list or null.
     *
     * @param head  a Lo stmt
     * @param tail  a stmtList || null
     */
    constructor(head, tail) {

        super();

        if (tail != null && tail instanceof StmtList == false) {
            throw new Error("malformed statement list: tail must be a list or null");
        }

        this.head = head;
        this.tail = tail;
    }

    /**
     * Attaches a statement list to this one.
     *
     * @param stmtList  a StmtList
     */
    attach(stmtList) {

        if (this.tail == null) {
            this.tail = stmtList;
        }
        else {
            this.tail.attach(stmtList);
        }
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'stmt_list',
            head: this.head ? this.head.getAst() : null,
            tail: this.tail ? this.tail.getAst() : null
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'stmt_list',
            this.head ? this.head.getTree() : null,
            this.tail ? this.tail.getTree() : null
        ];
    }

    /**
     * Appends the given stmtList to this one.
     *
     * @param stmtList
     */
    append(stmtList) {

        if (this.tail) {
            return this.tail.append(stmtList);
        }

        this.tail = stmtList;
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        // stmts return node lists
        // reqexprs need to mutate something, because they're returning a JS node,
        // so they take a list as a param so they can push onto it

        if (this.head === undefined) {
            return new CFNode();
        }

        var stmtCtx = new StmtCtx(sourceCtx);

        var head = this.head.compile(stmtCtx);

        // unpack any wrapping requests
        head = stmtCtx.wrap(head);

        if (this.tail) {
            head.append(this.tail.compile(sourceCtx));
        }

        return head;
    }
}


module.exports = StmtList;