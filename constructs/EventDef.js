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

/**
 * A constant definition
 */
var __ = function (params) {

    this.params = params;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'event',
        params: this.params
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return ['event-def', this.params];
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

};

module.exports = __;