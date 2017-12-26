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
 * A CF graph node that contains a blocking request and thus terminates 'natural' control flow;
 * appending to this node actually appends to its success handler path.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./../codegen/JsPrimitives');
const CFNode = require('./CFNode');
const Connector = require('./../codegen/Connector');


class ReqNode extends CFNode {

    /**
     *
     * @param address
     * @param args
     * @param succ      a function def
     * @param fail
     */
    constructor(address, args, succ, fail) {

        super();

        this.address = address;
        this.args = args;
        this.succHandler = succ;
        this.failHandler = fail;
    }

    /**
     * Returns true if this statement list is intact (not interrupted by an async call).
     */
    isIntact () {
        return false;
    }

    /**
     */
    getJs(writer) {

        if (writer.hasTail()) {

            var tail = writer.captureTail();
            var connect = tail instanceof Connector;

            // our cute little optimization here (connector-as-handler) could break the stack
            // if the handler calls aren't detached from the stack

            // todo we need to add the tail, or a call to a cont, to the handler, correct?

            console.log('ho no');

            return JS.exprStmt(JS.runtimeCall('sendAndBlock', [
                this.address, JS.arrayLiteral(this.args),
                connect ? JS.ID(tail.name) : JS.fnDef([], tail),
                connect ? JS.ID(tail.name) : JS.fnDef([], tail)
            ]));
        }

        return JS.exprStmt(JS.runtimeCall('sendAndBlock', [
            this.address, JS.arrayLiteral(this.args),
            this.succHandler ? this.succHandler : JS.NULL,
            this.failHandler ? this.failHandler : JS.NULL
        ]));
    }
}

module.exports = ReqNode;
