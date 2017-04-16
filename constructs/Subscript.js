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
const Number = require('./Number');

// todo break this up into bool, number, string

/**
 * A subscript expression
 *
 * @param array
 * @param index
 */
var __ = function (array, index) {

    this.array = array;
    this.index = index;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'subscript',
        list: this.array.getAst(),
        index: this.index.getAst()
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    var array = this.array.compile(context);
    var index = this.index.compile(context);

    // support negative subscripts if the subscript is a literal
    // to do this more generally we'd have to catch it at runtime, probably with splice
    if (this.index instanceof Number && parseInt(this.index.getValue()) < 0) {
        index = JS.add(JS.select(array, 'length'), index);
    }

    // todo - what if the list expression is a request or somesuch? can't resolve it twice
    // wrap it in a helper function?

    return JS.subscript(array, index);
};

module.exports = __;