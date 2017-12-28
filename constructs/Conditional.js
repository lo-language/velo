/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const CFNode = require('../compiler/CFNode');
const BranchNode = require('../compiler/BranchNode');
const LoConstruct = require('./LoConstruct');


class Conditional extends LoConstruct {

    /**
     * A conditional statement.
     *
     * @param predicate
     * @param consequent
     * @param alternate
     */
    constructor(predicate, consequent, alternate) {

        super();
        this.predicate = predicate;
        this.consequent = consequent;
        this.alternate = alternate;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        var result = {
            type: 'conditional',
            predicate: this.predicate.getAst(),
            consequent: this.consequent.getAst()
        };

        if (this.alternate) {
            result.alternate = this.alternate.getAst();
        }

        return result;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        var result = [
            'branch',
            this.predicate.getTree(),
            this.consequent.getTree()
        ];

        if (this.alternate) {
            result.push(this.alternate.getTree());
        }

        return result;
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        // hmmm...
        // if the predicate has a req expr in it, will our node be flagged as non-intact?
        // todo what should happen there?

        var predicate = this.predicate.compile(sourceCtx, targetCtx);

        // we could create some kind of branch or block context here
        var ctx = [];
        var trueBranch = this.consequent.compile(sourceCtx, ctx);

        if (ctx.length > 0) {
            var wrapper = CFNode.makeWrapper(ctx);
            wrapper.append(trueBranch);
            trueBranch = wrapper;
        }

        if (this.alternate) {
            var falseBranch = this.alternate.compile(sourceCtx, []);
        }

        // todo restore this
        // workaround for the case where alternate is an individual cond stmt rather than a stmtlist
        // could change the parser to eliminate this case
        // if (alternate && alternate instanceof CFNode == false) {
        //     alternate = new CFNode(alternate);
        // }

        return new BranchNode(predicate, trueBranch, falseBranch);
    }
}

module.exports = Conditional;