/**=============================================================================
 *
 * Copyright (c) 2013 - 2017 Seth Purcell
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See LICENSE.txt in the project root for license information.
 *
 =============================================================================*/

/**
 * Created by spurcell on 6/25/16.
 */

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const JsStmt = require('./JsStmt');

/**
 * Generates the code for making requests.
 *
 * A Request is a special kind of statement that attaching things to puts them inside its callbacks rather than after it.
 *
 * todo support properly async requests
 *
 * @param address       JS part
 * @param args          array of JS parts
 * @param replyHandler  JsFunction
 * @param failHandler   JsFunction
 * @param async
 */
var __ = function (address, args, replyHandler, failHandler, async) {

    this.address = address;
    this.args = args;
    this.async = async || false;

    // if we have one handler, we need both

    if (replyHandler || failHandler) {

        this.replyHandler = replyHandler || new JsFunction('res', new JsStmt());
        this.failHandler = failHandler || new JsFunction('res', new JsStmt());
    }

    this.cont = null;
};

__.prototype = Object.create(JsStmt.prototype);
__.prototype.constructor = __;

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @returns {*}
 */
__.prototype.getReplyHandler = function () {
    return this.replyHandler;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @param handler
 */
__.prototype.setReplyHandler = function (handler) {

    this.replyHandler = handler;
    this.failHandler = this.failHandler || new JsFunction('res', stmt);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 *
 * @private
 */
__.prototype._getAst = function () {

    // if we have a continuation

    var stmt = new JsStmt();

    if (this.cont) {
        stmt.attach(new JsStmt(JS.exprStmt(JS.assign(JS.ID('conty'), JS.fnDef([], new JsStmt())))));
    }

    var call = JS.runtimeCall('sendMessage', [
        this.address,
        JS.arrayLiteral(this.args)].concat(this.replyHandler ? this.replyHandler : [JS.NULL]).concat(this.failHandler ? this.failHandler : []));

    if (this.async) {
        return call;
    }

    return new JsStmt(JS.exprStmt(call));
};

////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Overrides base class to attach statements to its continuation's body.
 *
 * @param stmt
 * @returns this    fluent interface
 */
__.prototype.attach = function (stmt) {

    if (this.async == false) {
        return JsStmt.prototype.attach.call(this, stmt);
    }

    // if we have a continuation, extend it, otherwise create one

    if (this.cont == null) {

        this.cont = new JsFunction('res', stmt);

        if (this.replyHandler) {
            this.replyHandler.append(JS.fnCall(JS.ID('conty'), []));
        }

        if (this.failHandler) {
            this.failHandler.append(JS.fnCall(JS.ID('conty'), []));
        }
    }
    else {
        this.cont.append(stmt);
    }

    return this;
};

module.exports = __;