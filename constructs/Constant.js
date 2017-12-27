/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by seth on 11/12/16.
 */

"use strict";

const JS = require('../codegen/JsPrimitives');
const CFNode = require('../compiler/CFNode');
const ModuleRef = require('./ModuleRef');

/**
 * A constant definition
 */
var __ = function (name, value) {

    this.name = name;
    this.value = value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'constant',
        name: this.name,
        value: this.value.getAst()
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return [
        'def',
        this.name,
        this.value.getTree()
    ];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    // we need to define the symbol in the context before compiling the value
    // in case it's recursive

    var value;

    if (this.value instanceof ModuleRef) {

        value = this.value.compile(sourceCtx, targetCtx);

        sourceCtx.define(this.name, value, true);
        return JS.NOOP;
    }

    // register with the symbol table
    sourceCtx.define(this.name, value);

    value = this.value.compile(sourceCtx, targetCtx);

    sourceCtx._setValue(this.name, value);

    // we can't do this for some reason even though constDecl is a stmt
    return new CFNode(JS.constDecl('$' + this.name, value));
};

module.exports = __;