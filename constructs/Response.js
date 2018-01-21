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
const CFNode = require('../compiler/CFNode');
const TerminalNode = require('../compiler/TerminalNode');
const LoConstruct = require('./LoConstruct');
const Type = require('../compiler/Type');


class Response extends LoConstruct {

    /**
     * A response statement
     *
     * @param type
     * @param args
     */
    constructor(type, args) {

        super();
        this.type = type;
        this.args = args || [];
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'response',
            channel: this.type,
            args: this.args.map(arg => arg.getAst())
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'response',
            this.type,
            this.args.map(arg => arg.getTree())
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        if (sourceCtx.canRespond() == false) {
            sourceCtx.reportError(this, "can't respond from this context");
        }

        var type = Type.NULL;
        var args = this.args.map(arg => arg.compile(sourceCtx));
        var response;

        if (this.args.length == 1) {
            type = this.args[0].type;
        }

        if (this.type == 'reply') {
            sourceCtx.setSuccType(type);
            response = JS.exprStmt(JS.runtimeCall('succ', [JS.arrayLiteral(args)]));
        }
        else {
            sourceCtx.setFailType(type);
            response = JS.exprStmt(JS.runtimeCall('fail', [JS.arrayLiteral(args)]));
        }

        // only if we're in a non-async branch context do we need the return
        // if the following is an async connector, we don't need the return
        // we could optimize to only include the return if necessary

        return new CFNode(response).append(new TerminalNode(JS.return()));
    }
}

module.exports = Response;