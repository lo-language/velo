/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Source-side compilation context; handles compile-time symbol tracking.
 *
 * A context can be a module (root) context, a service context, or a sink context
 *
 * Created by: spurcell
 * 12/25/14
 */

"use strict";

const ReqExprNode = require('./ReqExprNode');
const LoContext = require('./LoContext');


class StmtContext extends LoContext {

    /**
     *
     * @param parent    the parent context, if any
     * @param isService
     */
    constructor(parent, isService) {

        super(parent);

        this.wrapper = null;
        this.reqId = 0;
    }


    /**
     */
    pushRequest(address, args) {

        var label = 'res' + this.reqId++;
        var reqNode = new ReqExprNode(address, args, label);

        // prepend the request onto the wrapper list
        this.wrapper = this.wrapper ? this.wrapper.append(reqNode) : reqNode;

        // gets a temp var and returns it
        return label;
    }


    /**
     * Non-idempotent :-(
     */
    wrap(node) {

        var result = this.wrapper;

        if (result) {
            result.append(node);
            return result;
        }

        return node;
    }


    /**
     * Declares a variable in this context.
     *
     * @param name
     */
    declare(name) {

        return this.parent.declare(name);
    }

    /**
     * Defines a constant in this context.
     *
     * @param name
     * @param value
     * @param isModule   bind at load-time, not compile-time
     */
    define(name, value, isModule) {

        return this.parent.define(name, value, isModule);
    }
}


module.exports = StmtContext;
