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


class ReqExprNode extends CFNode {

    /**
     *
     * @param address
     * @param args
     * @param resultId
     */
    constructor(address, args, resultId) {

        super();

        this.address = address;
        this.args = args;
        this.resultId = resultId;
        this.intact = false;
    }

    /**
     * Returns true if this statement list is intact (not interrupted by an async call).
     */
    isIntact () {
        return false;
    }

    /**
     *
     */
    getJs (writer) {

        // we can assume there's a next statement in the req expr case
        // because the expr must be part of a statement

        return JS.exprStmt(JS.runtimeCall('sendAndBlock', [
            this.address, JS.arrayLiteral(this.args),
            JS.fnDef([this.resultId], writer.captureTail()),
            JS.NULL // todo put a ref to a global fail handler here
        ]));
    }
}

module.exports = ReqExprNode;
