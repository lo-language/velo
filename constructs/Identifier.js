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
var __ = function (name, nameSpace) {

    this.name = name;
    this.nameSpace = nameSpace;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var result = {
        type: "id",
        name: this.name
    };

    if (this.nameSpace) {
        result.scope = this.nameSpace;
    }

    return result;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // todo know we're not rendering an lvalue because we're defended from that
    // in the assignment code generator

    // should we pass down in a context if we're in eval or assign mode?
    // context could also let us know we're in string interpolation
    // as well as conditionals

    if (this.nameSpace) {

        // having a qualifier implies a constant
        return JS.subscript(JS.subscript(JS.select(JS.ID('module'), 'deps'), JS.string(this.nameSpace)), JS.string('$' + this.name));
    }

    // commented out because resolve is now a misnomer (it just tests existence)
    // if (context.isConstant(this.name)) {
    //     return context.resolve(this.name);
    // }

    // see if the name is a local constant
    // try {
    //     return context.resolve(this.name);
    // }
    // catch (err) {
    //     // ignore
    // }

    // todo just return whatever the ID resolves to in this nameSpace?
    // make resolve able to return a Future or a $ name?

    if (context.isFuture(this.name)) {
        return new Future(this.name);
    }

    return JS.ID('$' + this.name);
};

module.exports = __;