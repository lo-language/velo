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
const BranchContext = require('../codegen/BranchContext');


/**
 * A conditional statement.
 *
 * @param predicate
 * @param consequent
 * @param alternate
 */
var __ = function (predicate, consequent, alternate) {

    this.predicate = predicate;
    this.consequent = consequent;
    this.alternate = alternate;
};

/**
 * Returns the Lo AST for this node.
 */
__.prototype.getAst = function () {

    var result = {
        type: 'conditional',
        predicate: this.predicate.getAst(),
        consequent: this.consequent.getAst()
    };

    if (this.alternate) {
        result.alternate = this.alternate.getAst();
    }

    return result;
};

/**
 * Compiles this node to JS in the given context.
 *
 * @param context
 */
__.prototype.compile = function (context) {

    // if one branch is async we need to make a continuation and call it from both branches

    var predicate = this.predicate.compile(context);

    var bc = new BranchContext(context);
    var consequent = this.consequent.compile(bc);

    // we can use the same branch context for both branches
    if (this.alternate) {
        var alternate = this.alternate.compile(bc);
    }
    else if (bc.isDiscontinuous()) {

        // we've wrapped our tail in a continuation so
        // it needs to be called in the alternate branch as well

        alternate = bc.getConnector();
    }

    // todo - push into BC?
    if (bc.isDiscontinuous()) {
        bc.connect();
    }

    return JS.cond(predicate, consequent, alternate);
};

module.exports = __;