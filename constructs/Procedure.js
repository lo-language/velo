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
const JsStmt = require('../codegen/JsStmt');


/**
 * A procedure definition
 *
 * @param params
 * @param body
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
 * @param context
 */
__.prototype.compile = function (context) {

    // push a new scope onto the scope stack
    var local = context.createInner(this.isService);

    // load params into symbol table
    this.params.forEach(name => local.declare(name));

    // compile the statement(s) in the context of the local scope
    var body = this.body.compile(local);

    // bind values to our params
    // todo unpacking args like this might be a significant perf hit
    for (var i = this.params.length - 1; i >= 0; i--) {
        body = JS.stmtList(JS.exprStmt(JS.assign(JS.ID('$' + this.params[i]), JS.subscript(JS.ID('args'), JS.num(String(i))))), body);
    }

    // declare our local vars
    var localVars = local.getJsVars();

    if (localVars.length > 0) {
        body = JS.stmtList(JS.varDeclMulti(localVars), body);
    }

    if (this.isService) {

        // define the task object var task = new Task();
        body = JS.stmtList(JS.varDecl('task', JS.new('Task', [JS.ID('succ'), JS.ID('fail')])), body);

        // decide if we need to exit -- doesn't matter in handlers
        body.attach(JS.stmtList(JS.exprStmt(JS.runtimeCall('deactivate', []))));
    }

    return JS.fnDef(this.isService ? ['args', 'succ', 'fail'] : ['args'], body);
};




/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    // push a new context onto the scope stack and load params into its symbol table

    var localCtx = sourceCtx.createInner(this.isService);

    this.params.forEach(name => localCtx.declare(name));

    // define the task object var task = new Task();
    var root = this.isService ?
        new JsStmt(JS.varDecl('task', JS.new('Task', [JS.ID('succ'), JS.ID('fail')]))) :
        new JsStmt();

    var lastStmt = root;

    // compile the statement(s) in the context of the local scope
    var body = this.body.compile2(localCtx, targetCtx);

    // declare our local vars
    var localVars = localCtx.getJsVars();

    if (localVars.length > 0) {
        lastStmt = lastStmt.setNext(new JsStmt(JS.varDeclMulti(localVars)));
    }

    // bind values to our params
    // todo unpacking args like this might be a significant perf hit
    this.params.forEach((param, idx) => {
        lastStmt = lastStmt.setNext(
            new JsStmt(JS.exprStmt(JS.assign(JS.ID('$' + this.params[idx]), JS.subscript(JS.ID('args'), JS.num(String(idx)))))));
    });

    if (this.isService) {

        // add a statement to see if we need to exit -- doesn't matter in handlers
        body.append(new JsStmt(JS.exprStmt(JS.runtimeCall('deactivate', []))));
    }

    // connect the body
    lastStmt.setNext(body);

    return JS.fnDef(this.isService ? ['args', 'succ', 'fail'] : ['args'], root);
};

module.exports = __;