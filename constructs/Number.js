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
 * A literal number
 */
var __ = function (value) {

    this.value = value;
};

/**
 * Accessor
 *
 * @returns {*}
 */
__.prototype.getValue = function () {

    return this.value;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    // ??? might not want to return an actual bool here - number literals are kept as strings

    return {
        type: 'number',
        val: this.value
    };
};

/**
 * Compiles this node to JS in the given context.
 *
 * todo break these out into their own classes?
 *
 * @param context
 */
__.prototype.compile = function (context) {

    return JS.num(this.value);
};

module.exports = __;