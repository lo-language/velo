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
const BranchNode = require('../compiler/BranchNode');

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
 * Returns the Lo AST for this node.
 */
__.prototype.getTree = function () {

    var result = [
        'branch',
        this.predicate.getTree(),
        this.consequent.getTree()
    ];

    if (this.alternate) {
        result.push(this.alternate.getTree());
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





/**
 * Compiles this node to JS in the given context.
 *
 * @param sourceCtx
 * @param targetCtx
 */
__.prototype.compile2 = function (sourceCtx, targetCtx) {

    // hmmm...
    // if the predicate has a req expr in it, will our node be flagged as non-intact?
    // todo what should happen there?

    var predicate = this.predicate.compile2(sourceCtx, targetCtx);

    // we could create some kind of branch or block context here
    var ctx = [];
    var trueBranch = this.consequent.compile2(sourceCtx, ctx);

    if (ctx.length > 0) {
        var wrapper = CFNode.makeWrapper(ctx);
        wrapper.append(trueBranch);
        trueBranch = wrapper;
    }

    if (this.alternate) {
        var falseBranch = this.alternate.compile2(sourceCtx, []);
    }

    // todo restore this
    // workaround for the case where alternate is an individual cond stmt rather than a stmtlist
    // could change the parser to eliminate this case
    // if (alternate && alternate instanceof CFNode == false) {
    //     alternate = new CFNode(alternate);
    // }

    return new BranchNode(predicate, trueBranch, falseBranch);
};

module.exports = __;