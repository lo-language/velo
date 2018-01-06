/**=============================================================================
 *
 * Copyright (c) 2013 - 2018 Seth Purcell
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
 * A destructuring assignment.
 */
var __ = function (names) {

    this.names = names;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    return {
        type: 'destructure',
        fields: this.names
    };
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    return ['destructure'].concat(this.names);
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile = function (sourceCtx, targetCtx) {

};

module.exports = __;