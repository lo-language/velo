/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * To be a man is to be responsible: to be ashamed of miseries you did not cause;
 * to be proud of your comrades' victories; to be aware, when setting one stone,
 * that you are building a world.
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const Proc = require('../compiler/Proc');
const CFNode = require('../compiler/CFNode');
const TerminalNode = require('../compiler/TerminalNode');
const Response = require('../constructs/Response');
const JsWriter = require('../codegen/JsWriter');

/**
 * A procedure definition
 *
 * @param params
 * @param {CFNode} body
 * @param isService
 */
var __ = function (params, body, isService) {

    this.params = params;
    this.body = body;
    this.isService = isService || false; // nice hack! thanks!
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'procedure',
        params: this.params,
        body: this.body ? this.body.getAst() : null,
        isService: this.isService
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'procedure',
        this.params,
        this.body ? this.body.getTree() : null,
        this.isService
    ];
};


/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 */
__.prototype.compile2 = function (sourceCtx) {

    // push a new context onto the scope stack
    var localCtx = sourceCtx.createInner(this.isService);

    // load params into its symbol table
    this.params.forEach(name => localCtx.declare(name));

    // define the task object: var task = new Task();
    var firstStmt = this.isService ?
        new CFNode(JS.varDecl('task', JS.new('Task', [JS.ID('succ'), JS.ID('fail')]))) :
        new CFNode();

    var lastStmt = firstStmt;

    // compile the statement(s) in the context of the local scope;
    // this will also populate our symbol table
    var body = this.body.compile2(localCtx);

    // declare our local vars
    var localVars = localCtx.getJsVars();

    if (localVars.length > 0) {
        lastStmt = lastStmt.setNext(new CFNode(JS.varDeclMulti(localVars)));
    }

    // bind values to our params
    // todo unpacking args like this might be a significant runtime perf hit
    this.params.forEach((param, idx) => {
        lastStmt = lastStmt.setNext(
            new CFNode(JS.exprStmt(JS.assign(JS.ID('$' + this.params[idx]), JS.subscript(JS.ID('args'), JS.num(String(idx)))))));
    });

    if (this.isService) {

        // implement auto-reply: if a service doesn't explicitly respond, it should reply <empty>
        body.append(new TerminalNode(JS.exprStmt(JS.runtimeCall('autoReply', []))));
    }

    // connect the body
    lastStmt.setNext(body);

    // todo this is pretty ugly
    // we're compensating for procedure doing double-duty as both a standalone service
    // and as a handler, which may need to be joined into main control flow. in the former
    // case we can render down to JS now, in the latter we must defer it to codegen time
    return this.isService ?
        JS.fnDef(['args', 'succ', 'fail'], new JsWriter().generateJs(firstStmt)) :
        new Proc(['args'], firstStmt);
};

module.exports = __;