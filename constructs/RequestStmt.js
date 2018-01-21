/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * He who knows does not speak; he who speaks does not know. ― Laozi
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const CFNode = require('../compiler/CFNode');
const BlockingReq = require('../compiler/BlockingReq');
const JsWriter = require('../codegen/JsWriter');
const LoConstruct = require('./LoConstruct');


class RequestStmt extends LoConstruct {

    /**
     * A "function call" (request) statement.
     * This is a special kind of node because appending a node to it may end up
     * creating a continuation or inside a callback to the call if it's blocking.
     *
     * @param address
     * @param args
     * @param succHandler
     * @param failHandler
     * @param blocking
     */
    constructor(address, args, succHandler, failHandler, blocking) {

        super();

        this.address = address;
        this.args = args;
        this.succHandler = succHandler;
        this.failHandler = failHandler;
        this.blocking = blocking;
    }

    /**
     * Returns the Lo AST for this node.
     */
    getAst() {

        return {
            type: 'request_stmt',
            address: this.address.getAst(),
            args: this.args.map(arg => arg.getAst()),
            subsequent: this.succHandler ? this.succHandler.getAst() : undefined,
            contingency: this.failHandler ? this.failHandler.getAst() : undefined,
            blocking: this.blocking
        };
    }

    /**
     * Returns the Lo AST for this node.
     */
    getTree() {

        return [
            'request',
            this.address.getTree(),
            this.args.map(arg => arg.getTree()),
            this.succHandler ? this.succHandler.getTree() : null,
            this.failHandler ? this.failHandler.getTree() : null,
            this.blocking
        ];
    }

    /**
     * Compiles this node to JS in the given context.
     *
     * @param sourceCtx
     */
    compile(sourceCtx) {

        var address = this.address.compile(sourceCtx);
        var args = this.args.map(arg => {
            return arg.compile(sourceCtx);
        });

        // these return proc objects

        var succHandler = this.succHandler ? this.succHandler.compile(sourceCtx) : null;
        var failHandler = this.failHandler ? this.failHandler.compile(sourceCtx) : null;

        return this.blocking ?
            new BlockingReq(address, args, succHandler, failHandler) :
            new CFNode(writer => {
                return JS.exprStmt(JS.runtimeCall('sendAsync', [
                    address, JS.arrayLiteral(args),
                    succHandler ? succHandler.getJs(new JsWriter()) : JS.NULL,
                    failHandler ? failHandler.getJs(new JsWriter()) : JS.NULL
                ]))
            });
    }
}


module.exports = RequestStmt;