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
const CFNode = require('../compiler/CFNode');
const IRProc = require('../compiler/IRProc');
const Response = require('../constructs/Response');

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
    var root = this.isService ?
        new CFNode(JS.varDecl('task', JS.new('Task', [JS.ID('succ'), JS.ID('fail')]))) :
        new CFNode();

    var lastStmt = root;

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

        if (body.isIntact()) {
            body.append(new CFNode(new Response('reply').compile(localCtx, body)));
        }
    }

    // connect the body
    lastStmt.setNext(body);

    // we need to return an IR proc container, not straight JS, so we can amend handlers later
    return new IRProc(this.isService ? ['args', 'succ', 'fail'] : ['args'], body);
};

module.exports = __;