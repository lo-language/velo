/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

"use strict";

const JS = require('../codegen/JsPrimitives');
const JsStmt = require('../codegen/JsStmt');
const JsFunction = require('../codegen/JsFunction');


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

    // after compilation we can get our declared vars
    var localVars = local.getJsVars();

    // declare our local vars
    var preamble = null;

    localVars.forEach(varName => {

        var decl = new JsStmt.varDecl(varName);

        if (preamble) {
            preamble.attach(decl);
        }
        else {
            preamble = decl;
        }
    });

    // bind values to our params
    this.params.forEach((paramName, index) => {

        var assignment = new JsStmt(JS.exprStmt(JS.assign(JS.ID('$' + paramName), JS.subscript(argList, JS.num(String(index))))));

        if (preamble) {
            preamble.attach(assignment);
        }
        else {
            preamble = assignment;
        }
    });

    if (preamble) {
        body = preamble.attach(body);
    }

    // implements an exa service as a JS function that takes a task
    // if a service, squash the construct?
    return new JsFunction([(this.isService ? 'task' : 'args')], body);
};

module.exports = __;