/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 * Success is finding something you really like to do and caring enough about it
 * to do it well.
 =============================================================================*/

/**
 * Target-side compilation context.
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const JS = require('./JsPrimitives');

/**
 *
 * @param parent    the parent context, if any
 */
var __ = function (parent) {

    this.parent = parent;
    this.requestStack = [];
    this.reqCount = 0;
    this.brokenFlow = false;
    this.branches = [];

    this.symbols = {};
};


/**
 * Sets the root content of this context.
 *
 * @param js
 */
__.prototype.setContent = function (js) {

    this.js = js;
};


/**
 * Pushes a blocking request into this context.
 *
 * @param address   the JS expr for the address
 * @param args
 */
__.prototype.pushRequest = function (address, args) {

    var id = this.reqCount++;
    var name = 'res' + id;

    this.requestStack.push({address: address, args: args, name: name});

    // inform the parent context of the discontinuity
    // or should we just flag ourself as discontinuous?
    // then the tip can ask up the chain to see if there's a break?
    this.breakingFlow = true;

    return JS.subscript(JS.ID(name), JS.num('0'));
};


__.prototype.popRequests = function (stmtList) {

    if (this.requestStack.length == 0) {
        return stmtList;
    }

    var req = this.requestStack.pop();

    return this.popRequests(JS.stmtList(JS.exprStmt(
        JS.runtimeCall('sendAndBlock', [
            req.address, JS.arrayLiteral(req.args),
            JS.fnDef([req.name], stmtList),
            JS.NULL
        ]))));
};


__.prototype.intactControlFlow = function () {

    if (this.brokenFlow) {
        return false;
    }

    if (this.parent) {
        return this.parent.intactControlFlow();
    }

    return true;
};



__.prototype.branch = function () {

    // create a child context for the branch
    var branchCtx = new __(this);

    // keep a ref to it
    this.branches.push(branchCtx);

    return branchCtx;
};


/**
 *
 * @param tail
 */
__.prototype.joinBranches = function (tail) {

    // there's a correspondence between a context and a JS node that I'm not getting
    // should a context always be a stmtlist? or either a stmtlist or a request?
    // and should the context always have a ref to its stmts?
    // we need to be able to travel down through the req wrappers to add joins...

    if (this.branches.length > 0) {

        // see if any of the branches are broken
        var allIntact = this.branches.every(branch => {
            return branch.isIntact;
        });

        if (allIntact) {
            return tail;
        }

        // at least one of the branches is broken; we must wrap the tail in a continuation

        var contName = 'k' + '0';

        // attach the join call into all the branches
        this.branches.forEach(branch => {
            branch.js.attach(JS.stmtList(JS.exprStmt(JS.fnCall(JS.ID(contName), []))));
        });

        // we're done with the branches
        this.branches = [];

        return JS.stmtList(JS.fnDef([], tail, contName));
    }

    return tail;
};


module.exports = __;
