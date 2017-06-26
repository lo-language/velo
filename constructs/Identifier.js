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
const Future = require('../codegen/Future');


/**
 * An identifer
 */
var __ = function (name, line) {

    this.name = name;
    this.line = line || '??';
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
 * @param context
 */
__.prototype.compile = function (context) {

    // see if the identifier is defined

    if (context.has(this.name)) {

        // if we're a constant, do the old switcheroo
        if (context.isModule(this.name)) {

            // console.log('compiling', this.name, context.resolve(this.name).renderJs());
            return context.resolve(this.name);
        }

        return JS.ID('$' + this.name);
    }

    // of course, we need to see inside a conditional to know if it's been defined...
    context.pushError(this.line, "unbound identifier '" + this.name + "' used as reference");
    return JS.ID('$' + this.name);
};

module.exports = __;