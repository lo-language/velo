/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * The generator traverses the CF graph and generates code.
 * It visits each node in the graph in turn and handles creating and connecting continuations.
 *
 * Created by seth on 11/26/17.
 */

"use strict";

const JS = require('./JsPrimitives');
const Connector = require('./Connector');

class JsWriter {

    constructor (parent) {

        this.parent = parent;
        this.contNum = 0;
        this.nextLoopNum = 1;
        this.tail = null;
    }

    hasTail () {

        return this.tail ? true : false;
    }

    _getNextContName () {

        if (this.parent) {
            return this.parent._getNextContName();
        }

        return 'k' + this.contNum++;
    }

    _getNextLoopName () {

        if (this.parent) {
            return this.parent._getNextLoopName();
        }

        return 'L' + this.nextLoopNum++;
    }

    /**
     * Creates a child context for a branch.
     */
    branch (tail) {

        var child = new JsWriter(this);

        child.tail = tail;

        return child;
    }

    /**
     *
     * @param wrap
     */
    captureTail () {

        // todo could we make this automatically know when it needs to wrap the tail?
        // or maybe when we call branch() we automatically wrap the tail and set the new tail?

        var tail = this.tail;

        this.tail = null;

        return tail;
    }

    /**
     * Captures the tail AND wraps it in a continuation.
     *
     * @returns {*}
     */
    wrapTail () {

        // see if the tail is already a connector; if so, we can just pass it through
        // this optimizes away continuations that just wrap a call to another continuation (or autoreply)
        if (this.tail instanceof Connector) {
            return this.captureTail();
        }

        var name = this._getNextContName();

        // actually not sure if this is kosher JS -- is a fn def a stmt? doesn't need semicolon after it...
        this.tail = JS.stmtList(JS.fnDef([], this.captureTail(), name));

        return new Connector(JS.ID(name));
    }

    /**
     * Returns JS AST
     *
     * @param node
     */
    generateJs (node) {

        if (node.next) {

            // render the tail first and push it into context so the head stmt can snatch it if necessary
            this.tail = this.generateJs(node.next);
        }

        var head = node.getJs(this);

        // collapse empty nodes
        if (head == null) {
            return this.tail;
        }

        // don't wrap connectors and there can't be a tail
        if (head instanceof Connector) {
            return head;
        }

        // we might have a tail even though we don't have a next node, if we're a child context
        return JS.stmtList(head, this.tail);
    }
}

module.exports = JsWriter;