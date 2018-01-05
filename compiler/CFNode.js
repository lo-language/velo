/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Simplify, then add lightness. -- Colin Chapman
 =============================================================================*/

/**
 * A node in the IR control flow graph.
 *
 * Sequential flow is modeled as a doubly-linked list.
 * Branches are modeled as special child nodes.
 *
 *
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./../codegen/JsPrimitives');

class CFNode {

    /**
     *
     */
    constructor (js, intact = true) {

        // this.prev = null;   // previous statement node
        this.next = null;   // next stmt node
        this.intact = intact;

        this.statement = js || null;

        this.reqNum = 0;
    }


    /**
     * Gets the statement for this node.
     */
    getJs (ctx) {

        if (typeof this.statement == 'function') {
            return this.statement(ctx);
        }

        return this.statement;
    }

    /**
     * Sets the statement for this node.
     *
     * @param stmt
     */
    setStatement(stmt) {

        this.statement = stmt;
    }

    /**
     * Sets the next node.
     *
     * @param next  node to follow this one
     */
    setNext(next) {

        this.next = next;
        // next.prev = this;

        return next;
    }

    /**
     * Returns the first node in this graph.
     */
    // getFirst() {
    //
    //     return this.prev ? this.prev.getFirst() : this;
    // }

    /**
     * Returns the last node in this graph.
     */
    getLast() {

        return this.next ? this.next.getLast() : this;
    }

    /**
     * Returns true if this statement list is intact (not interrupted by an async call).
     */
    isIntact() {

        return this.intact && (this.next ? this.next.isIntact() : true);
    }

    /**
     * Appends the given node to the end of this list.
     *
     * @param node  CFNode
     * @returns {CFNode}
     */
    append (node) {

        // todo enforce we can't add to a terminating node
        // if (this.isTerminal) {}

        if (this.next) {
            this.next.append(node);
            return this;
        }

        this.setNext(node);
        return this;
    }

    getNextLabel(node) {

        return 'res' + this.reqNum++;
    }
}

module.exports = CFNode;
