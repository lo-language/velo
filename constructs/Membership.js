/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const LoConstruct = require('./LoConstruct');


class Membership extends LoConstruct {

    /**
     * A set membership test operator expression
     *
     * @param set
     * @param member
     */
    constructor(set, member) {

        super();
        this.set = set;
        this.member = member;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'testMembership',
            set: this.set.getAst(),
            member: this.member.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'membership',
            this.set.getTree(),
            this.member.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        return JS.utilCall(
            'in', [
                this.member.compile(sourceCtx, targetCtx),
                this.set.compile(sourceCtx, targetCtx)
            ]);
    }
}

module.exports = Membership;