/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 9/24/17.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const Procedure = require('./Procedure');
const StmtList = require('./StmtList');
const Assignment = require('./Assignment');
const Identifier = require('./Identifier');
const LoConstruct = require('./LoConstruct');


class Yields extends LoConstruct {

    /**
     * The yields operator (=>)
     *
     * @param target  the name to assign to the
     */
    constructor(target) {

        super();
        this.target = target;

        // todo yikes this is an ugly hack!
        if (typeof target.setLvalue == 'function') {
            target.setLvalue();
        }
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'yields',
            target: this.target.getAst()
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'yields',
            this.target.getTree()
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     * @param targetCtx
     */
    compile(sourceCtx, targetCtx) {

        var target = this.target.compile(sourceCtx, targetCtx);

        // not DRY -- duplicates logic from Assignment...
        // if the LHS is a bare ID...

        var name = this.target.name;

        // validate we're not assigning to a constant
        if (sourceCtx.isConstant(name)) {
            sourceCtx.attachError(this.left, "can't assign to a constant (" + name + ")");
        }

        // declare if a new var
        if (sourceCtx.has(name) == false) {
            sourceCtx.declare(name);
        }

        return JS.fnDef(['res'], JS.stmtList(
            JS.assign(target, JS.subscript(JS.ID('res'), JS.num('0')), '=')));
    }
}

module.exports = Yields;