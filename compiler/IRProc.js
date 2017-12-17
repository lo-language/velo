/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * An IR procedure -- just an IR node with params.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const CFNode = require('../compiler/CFNode');

class IRProc extends CFNode {

    /**
     * @param params
     * @param body
     */
    constructor (params, body) {

        super();

        this.params = params;
        this.body = body;
    }

    /**
     * Appends the given node to the end of this procedure.
     *
     * @param node
     */
    append(node) {

        return this.body.append(node);
    }

    /**
     * Connects this path to the specified function, which could be a continuation or a loop.
     *
     * @param name
     */
    connectTo(name) {

        var call = new __(JS.exprStmt(JS.fnCall(JS.ID(name), [])));

        // todo mark terminated
        if (this.next) {
            return this.next.append(call);
        }

        this.setNext(call);
    }

    /**
     * Should the IR graph provide the JS interface, or something else?
     */
    renderTree() {

        if (this.statement == null) {
            return this.next ? this.next.renderTree() : ['stmtList'];
        }

        var headTree = this.statement.renderTree();
        var tailTree = this.next ? this.next.renderTree() : null;

        return tailTree ? ['stmtList', headTree, tailTree] : ['stmtList', headTree];
    }

    /**
     *
     */
    renderJs() {

        if (this.statement == null) {
            return this.next ? this.next.renderJs() : '';
        }

        var headJs = this.statement.renderJs();
        var tailJs = this.next ? this.next.renderJs() : null;

        return headJs + '\n' + (tailJs || '');
    }
}


module.exports = IRProc;
