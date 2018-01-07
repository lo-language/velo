/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
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

const JS = require('../codegen/JsPrimitives');
const CFNode = require('./CFNode');
const JsWriter = require('../codegen/JsWriter');


class ReqNode extends CFNode {

    /**
     *
     * @param address
     * @param args
     * @param succ      a Proc
     * @param fail      a Proc
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

            var connector = writer.wrapTail();

            // we're putting a continuation into the context for rendering the handlers
            // but they actually render to fn def exprs, NOT statement lists...

            var succHandler = this.succHandler ? this.succHandler.getJs(writer.branch(connector)) : connector.fnName;
            var failHandler = this.failHandler ? this.failHandler.getJs(writer.branch(connector)) : connector.fnName;

            return JS.exprStmt(JS.runtimeCall('sendAndBlock', [
                this.address, JS.arrayLiteral(this.args),
                succHandler, failHandler
            ]));
        }

        return JS.exprStmt(JS.runtimeCall('sendAndBlock', [
            this.address, JS.arrayLiteral(this.args),
            this.succHandler ? this.succHandler.getJs(new JsWriter()) : JS.NULL,
            this.failHandler ? this.failHandler.getJs(new JsWriter()) : JS.NULL
        ]));
    }
}

module.exports = ReqNode;
