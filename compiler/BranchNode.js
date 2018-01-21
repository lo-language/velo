/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * A CF graph node that contains a branch.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./../codegen/JsPrimitives');
const CFNode = require('./CFNode');


class BranchNode extends CFNode {

    /**
     *
     * @param pred          predicate expr
     * @param trueBranch    true branch graph
     * @param falseBranch   false branch graph
     */
    constructor(pred, trueBranch, falseBranch) {

        super();

        this.pred = pred;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
        this.intact = trueBranch.isIntact() && (falseBranch ? falseBranch.isIntact() : true);
    }

    /**
     * Returns true if this statement list is intact (not interrupted by an async call).
     */
    isIntact () {
        return this.intact;
    }

    /**
     */
    getJs (writer) {

        var contCall = null;

        // if either branch is broken we need to wrap the tail in a cont.

        if (writer.hasTail() && this.intact == false) {
            contCall = writer.wrapTail();
        }

        // we may need to create a false branch if we need to link it to the continuation

        var trueBranch = writer.branch(contCall).generateJs(this.trueBranch);
        var falseBranch = this.falseBranch ? writer.branch(contCall).generateJs(this.falseBranch) : contCall;

        return JS.cond(this.pred, trueBranch, falseBranch);
    }
}

module.exports = BranchNode;

