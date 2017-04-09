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
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // see if the identifier is defined

    if (context.has(this.name)) {
        return JS.ID('$' + this.name);
    }

    // of course, we need to see inside a conditional to know if it's been defined...
    context.pushError(this.line, "reference to '" + this.name + "' before definition");
    return JS.ID('$' + this.name);
};

module.exports = __;