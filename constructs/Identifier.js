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


/**
 * An identifier
 */
var __ = function (name, line, isLvalue) {

    this.name = name;
    this.line = line || '??';
    this.isLvalue = isLvalue || false;
};


__.prototype.setLvalue = function () {
    this.isLvalue = true;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: "id",
        name: this.name
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    // should this behave differently as lvalue or rvalue?

    return ["id", this.name];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

    // see if the identifier is defined

    if (sourceCtx.has(this.name)) {

        // if we're a constant, do the old switcheroo
        if (sourceCtx.isModule(this.name)) {

            // console.log('compiling', this.name, context.resolve(this.name).renderJs());
            return sourceCtx.resolve(this.name);
        }

        return JS.ID('$' + this.name);
    }

    // of course, we need to see inside a conditional to know if it's been defined...
    if (this.isLvalue == false) {
        sourceCtx.reportError(this, "identifier \"" + this.name + "\" used but not bound in this context");
    }

    return JS.ID('$' + this.name);
};

module.exports = __;