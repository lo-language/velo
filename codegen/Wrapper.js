/**
 * Created by spurcell on 8/21/16.
 */

"use strict";

const JS = require('./JsPrimitives');
const JsFunction = require('./JsFunction');
const Request = require('./Request');
const JsStmt = require('./JsStmt');

/**
 * Constructor
 *
 * todo should Wrapper just extend context??
 */
var __ = function () {

    this.placeHolders = 0;
    this.requests = null;
};

__.prototype.isEmpty = function () {

    return this.placeHolders == 0;
};

/**
 * Pushes a request onto the stack and returns a placeholder.
 *
 * todo should this take a Request instead?
 *
 * @param address
 * @param args
 * @param failHandler
 */
__.prototype.pushRequest = function (address, args, failHandler) {

    var placeholderName = 'P' + this.placeHolders++;

    // create a reply handler taking the placeholder as its param and with an empty body
    var replyHandler = new JsFunction([placeholderName], new JsStmt());

    var req = new Request(address, args, replyHandler, failHandler, true);

    if (this.requests) {
        this.requests.attach(req);
    }
    else {
        this.requests = req;
    }

    return JS.ID(placeholderName);
};

/**
 * Returns the given statement wrapped.
 *
 * @param stmt
 */
__.prototype.wrap = function (stmt) {

    if (this.requests) {
        return this.requests.attach(stmt);
    }

    return stmt;

};

module.exports = __;