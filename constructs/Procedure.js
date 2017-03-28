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
    this.isService = isService;
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
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // push a new scope onto the scope stack
    var local = context.createInner(this.isService);

    // -- we're already discriminating between handler and service below!
    // maybe split these up?
    // if we have a channel we're a handler with args instead of a task
    // todo could drop this if services took an 'args' arg rather than putting them in the task

    var argList = this.isService ? JS.select(JS.ID('task'), 'args') : JS.ID('args');

    // load params into symbol table
    this.params.forEach(name => local.declare(name));

    // compile the statement(s) in the context of the local scope
    var body = this.body.compile(local);


    // bind values to our params
    for (var i = this.params.length - 1; i >= 0; i--) {
        body = JS.stmtList(JS.exprStmt(JS.assign(JS.ID('$' + this.params[i]), JS.subscript(argList, JS.num(String(i))))), body);
    }

    // declare our local vars
    var localVars = local.getJsVars();

    if (localVars.length > 0) {
        body = JS.stmtList(JS.varDeclMulti(localVars), body);
    }

    return JS.fnDef([(this.isService ? 'task' : 'args')], body);
};

module.exports = __;